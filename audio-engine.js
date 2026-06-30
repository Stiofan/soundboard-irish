// ── Ulster Irish TTS ──────────────────────────────────────────────────────────
// Ulster voice for synthesis.abair.ie. Pattern: ga_{dialect}_{speaker}_{model}
// ACTION REQUIRED: verify the exact Ulster voice ID at https://synthesis.abair.ie
// The Connacht voice is ga_CO_snc_piper — swap dialect/speaker for an Ulster voice.
const ABAIR_VOICE = 'ga_UL_anb_piper';
const ABAIR_ENDPOINT = 'https://synthesis.abair.ie/api/synthesise';

// ── IndexedDB — cache for abair.ie audio blobs ────────────────────────────────
const _DB_NAME = 'irish-soundboard-audio-v1';
const _DB_STORE = 'clips';
let _db = null;

async function _openDB() {
  if (_db) return _db;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(_DB_NAME, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(_DB_STORE, { keyPath: 'key' });
    req.onsuccess = e => { _db = e.target.result; resolve(_db); };
    req.onerror = () => reject(req.error);
  });
}

async function _getCached(key) {
  try {
    const db = await _openDB();
    return new Promise(resolve => {
      const req = db.transaction(_DB_STORE, 'readonly').objectStore(_DB_STORE).get(key);
      req.onsuccess = () => resolve(req.result ? req.result.blob : null);
      req.onerror = () => resolve(null);
    });
  } catch { return null; }
}

function _setCached(key, blob) {
  _openDB().then(db => {
    try { db.transaction(_DB_STORE, 'readwrite').objectStore(_DB_STORE).put({ key, blob }); }
    catch (e) { console.warn('Audio cache write failed:', e); }
  }).catch(() => {});
}

// ── Audio playback helpers ────────────────────────────────────────────────────
let _currentAudio = null;

function _blobToAudio(blob, isSlow) {
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio._objectURL = url;
  if (isSlow) audio.playbackRate = 0.75;
  return audio;
}

function _playAudio(audio) {
  _currentAudio = audio;
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      if (audio._objectURL) { URL.revokeObjectURL(audio._objectURL); audio._objectURL = null; }
      if (_currentAudio === audio) _currentAudio = null;
    };
    audio.addEventListener('ended', () => { cleanup(); resolve(); }, { once: true });
    audio.addEventListener('error', () => { cleanup(); reject(new Error('Playback error')); }, { once: true });
    audio.play().catch(err => { cleanup(); reject(err); });
  });
}

// ── abair.ie fetch ────────────────────────────────────────────────────────────
async function _fetchAbair(text) {
  const params = new URLSearchParams({ input: text, voice: ABAIR_VOICE, normalise: 'true' });
  const res = await fetch(`${ABAIR_ENDPOINT}?${params}`);
  if (!res.ok) throw new Error(`abair.ie returned ${res.status}`);

  const ct = res.headers.get('content-type') || '';
  if (ct.startsWith('audio/') || ct.includes('octet-stream')) return res.blob();

  // JSON response variants
  const data = await res.json();
  if (data.audioContent) {
    const bytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
    return new Blob([bytes], { type: 'audio/mpeg' });
  }
  if (data.url) return (await fetch(data.url)).blob();
  throw new Error('Unrecognised abair.ie response format');
}

// ── Public API ────────────────────────────────────────────────────────────────

function stopCurrentAudio() {
  if (_currentAudio) {
    _currentAudio.pause();
    if (_currentAudio._objectURL) { URL.revokeObjectURL(_currentAudio._objectURL); _currentAudio._objectURL = null; }
    _currentAudio = null;
  }
}

/**
 * Play a phrase. Returns a Promise that resolves when audio finishes.
 * Throws an error with `error.offline = true` if device is offline with no cache.
 *
 * Playback chain:
 *  1. Bundled /audio/{phrase.id}.mp3 (served by service worker when offline)
 *  2. IndexedDB cache (from a previous abair.ie fetch)
 *  3. abair.ie live synthesis (cached in IndexedDB for next time)
 */
async function playPhrase(phrase, isSlow = false) {
  stopCurrentAudio();

  // 1. Bundled file (built-in phrases; service worker caches these for offline)
  if (!phrase.custom) {
    try {
      const res = await fetch(`audio/${phrase.id}.wav`);
      if (res.ok) {
        const blob = await res.blob();
        return _playAudio(_blobToAudio(blob, isSlow));
      }
    } catch { /* file absent or network error — fall through */ }
  }

  // 2. IndexedDB cache (abair.ie results cached on first fetch)
  const cached = await _getCached(phrase.ga);
  if (cached) return _playAudio(_blobToAudio(cached, isSlow));

  // 3. abair.ie live synthesis
  if (!navigator.onLine) {
    throw Object.assign(new Error('Offline — no cached audio'), { offline: true });
  }
  const blob = await _fetchAbair(phrase.ga);
  _setCached(phrase.ga, blob);
  return _playAudio(_blobToAudio(blob, isSlow));
}

/**
 * Fetch and play arbitrary text from abair.ie (used for the "Preview" button).
 * Does not cache the result.
 */
async function previewText(text) {
  stopCurrentAudio();
  if (!navigator.onLine) {
    throw Object.assign(new Error('Offline'), { offline: true });
  }
  const blob = await _fetchAbair(text);
  _setCached(text, blob); // cache now so the saved phrase plays offline immediately
  return _playAudio(_blobToAudio(blob, false));
}
