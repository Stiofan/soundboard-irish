// ── State ─────────────────────────────────────────────────────────────────────
var _showIrish = true;
var _slowAudio = false;
var _searchQuery = '';
var _customPhrases = [];
var _phraseMap = {};
var _deferredInstall = null;
var _currentCard = null;
var _currentBtn = null;
var _statusTimeout = null;

// ── Category config ───────────────────────────────────────────────────────────
var CATEGORY_ORDER = [
  'Ár gCuid Frásaí',
  'Beannachtaí',
  'Sa Rang',
  'Comhrá',
  'An Aimsir',
  'Na Laethanta & Na Míonna',
  'Uimhreacha',
  'Dathanna',
  'Bia & Sos',
  'Mothúcháin & Frásaí',
];

var CATEGORY_LABELS = {
  'Beannachtaí':               'Beannachtaí — Greetings & Courtesy',
  'Sa Rang':                   'Sa Rang — Classroom',
  'Comhrá':                    'Comhrá — Small Talk',
  'An Aimsir':                 'An Aimsir — Weather',
  'Na Laethanta & Na Míonna':  'Na Laethanta & Na Míonna — Days & Months',
  'Uimhreacha':                'Uimhreacha — Numbers',
  'Dathanna':                  'Dathanna — Colours',
  'Bia & Sos':                 'Bia & Sos — Food & Break',
  'Mothúcháin & Frásaí':       'Mothúcháin & Frásaí — Feelings',
  'Ár gCuid Frásaí':           'Ár gCuid Frásaí — Our Phrases',
};

// ── Data helpers ──────────────────────────────────────────────────────────────
function loadCustomPhrases() {
  try { _customPhrases = JSON.parse(localStorage.getItem('customPhrases') || '[]'); }
  catch { _customPhrases = []; }
}

function saveCustomPhrases() {
  localStorage.setItem('customPhrases', JSON.stringify(_customPhrases));
}

function allPhrases() {
  var builtins = PHRASES.map(function(p, i) {
    return Object.assign({}, p, {
      id: p.id || ('p' + String(i + 1).padStart(3, '0')),
      custom: false,
      cat: p.cat === 'Bia & Ros' ? 'Bia & Sos' : p.cat,
    });
  });
  return builtins.concat(_customPhrases);
}

function rebuildPhraseMap() {
  _phraseMap = {};
  allPhrases().forEach(function(p) { _phraseMap[p.id] = p; });
}

// ── Rendering ─────────────────────────────────────────────────────────────────
function createCard(phrase) {
  var card = document.createElement('div');
  card.className = 'phrase-card' + (phrase.custom ? ' custom' : '');
  card.dataset.phraseId = phrase.id;
  card.dataset.en = phrase.en.toLowerCase();
  card.dataset.ga = phrase.ga.toLowerCase();
  card.dataset.pr = (phrase.pr || '').toLowerCase();

  var english = document.createElement('div');
  english.className = 'phrase-english';
  english.textContent = phrase.en;

  var pronunciation = document.createElement('div');
  pronunciation.className = 'phrase-pronunciation';
  if (phrase.pr) {
    pronunciation.textContent = phrase.pr;
  } else {
    pronunciation.hidden = true;
  }

  var irish = document.createElement('div');
  irish.className = 'phrase-irish';
  irish.textContent = phrase.ga;

  var controls = document.createElement('div');
  controls.className = 'phrase-controls';

  var playBtn = document.createElement('button');
  playBtn.className = 'play-btn';
  playBtn.textContent = '▶ Play';
  playBtn.setAttribute('aria-label', 'Play: ' + phrase.en + ' — ' + phrase.ga);
  playBtn.addEventListener('click', function() { handlePlay(phrase, card, playBtn); });
  controls.appendChild(playBtn);

  if (phrase.custom) {
    var delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '🗑';
    delBtn.setAttribute('aria-label', 'Delete: ' + phrase.en);
    delBtn.addEventListener('click', function() { deletePhrase(phrase.id); });
    controls.appendChild(delBtn);
  }

  card.appendChild(english);
  card.appendChild(pronunciation);
  card.appendChild(irish);
  card.appendChild(controls);
  return card;
}

function renderAll() {
  rebuildPhraseMap();
  var container = document.getElementById('categoriesContainer');
  container.innerHTML = '';

  var grouped = {};
  allPhrases().forEach(function(p) {
    if (!grouped[p.cat]) grouped[p.cat] = [];
    grouped[p.cat].push(p);
  });

  CATEGORY_ORDER.forEach(function(cat) {
    var phrases = grouped[cat] || [];
    var isOurPhrases = cat === 'Ár gCuid Frásaí';

    // Always render "Ár gCuid Frásaí"; skip other empty categories
    if (!isOurPhrases && phrases.length === 0) return;

    var section = document.createElement('div');
    section.className = 'category';
    section.dataset.cat = cat;

    var header = document.createElement('div');
    header.className = 'category-header';

    var titleSpan = document.createElement('span');
    titleSpan.innerHTML = (CATEGORY_LABELS[cat] || cat) +
      (phrases.length > 0 ? ' <span class="category-count">(' + phrases.length + ')</span>' : '');
    header.appendChild(titleSpan);

    if (isOurPhrases) {
      var addBtn = document.createElement('button');
      addBtn.className = 'add-phrase-header-btn';
      addBtn.textContent = '+ Add phrase';
      addBtn.addEventListener('click', openModal);
      header.appendChild(addBtn);
    }

    var grid = document.createElement('div');
    grid.className = 'phrases';

    if (phrases.length === 0) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No phrases yet — tap "+ Add phrase" to get started!';
      grid.appendChild(empty);
    } else {
      phrases.forEach(function(p) { grid.appendChild(createCard(p)); });
    }

    section.appendChild(header);
    section.appendChild(grid);
    container.appendChild(section);
  });

  applySearch(_searchQuery);
}

function applySearch(query) {
  _searchQuery = query;
  var q = query.toLowerCase().trim();

  document.querySelectorAll('.phrase-card').forEach(function(card) {
    var show = !q ||
      card.dataset.en.includes(q) ||
      card.dataset.ga.includes(q) ||
      card.dataset.pr.includes(q);
    card.style.display = show ? '' : 'none';
  });

  document.querySelectorAll('.category').forEach(function(cat) {
    if (cat.dataset.cat === 'Ár gCuid Frásaí') return; // always visible — contains the Add button
    var hasVisible = Array.from(cat.querySelectorAll('.phrase-card'))
      .some(function(c) { return c.style.display !== 'none'; });
    cat.style.display = hasVisible ? '' : 'none';
  });
}

// ── Playback ──────────────────────────────────────────────────────────────────
function resetPlayingState(card, btn) {
  if (card) card.classList.remove('playing');
  if (btn) { btn.textContent = '▶ Play'; btn.disabled = false; }
}

async function handlePlay(phrase, card, btn) {
  // Clear previous playing card if different
  if (_currentCard && _currentCard !== card) {
    resetPlayingState(_currentCard, _currentBtn);
  }

  stopCurrentAudio();
  _currentCard = card;
  _currentBtn = btn;
  card.classList.add('playing');
  btn.textContent = '⏳';
  btn.disabled = true;

  try {
    await playPhrase(phrase, _slowAudio);
  } catch (e) {
    if (e && e.offline) {
      showStatus("Audio will be ready when you're back online.", 'warning');
    } else {
      showStatus('Could not play audio. Check your connection and try again.', 'warning');
      console.error('Playback error:', e);
    }
  } finally {
    resetPlayingState(card, btn);
    if (_currentCard === card) { _currentCard = null; _currentBtn = null; }
  }
}

// ── Status bar ────────────────────────────────────────────────────────────────
function showStatus(msg, type) {
  var el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status show ' + (type || 'info');
  clearTimeout(_statusTimeout);
  _statusTimeout = setTimeout(function() { el.classList.remove('show'); }, 4500);
}

// ── Toggles ───────────────────────────────────────────────────────────────────
function handleToggleIrish() {
  _showIrish = !_showIrish;
  document.body.classList.toggle('show-irish', _showIrish);
  var btn = document.getElementById('toggleIrish');
  btn.classList.toggle('toggle-active', _showIrish);
  btn.setAttribute('aria-pressed', String(_showIrish));
  btn.textContent = _showIrish ? 'Hide Irish' : 'Show Irish';
}

function handleToggleSlow() {
  _slowAudio = !_slowAudio;
  var btn = document.getElementById('toggleSlow');
  btn.classList.toggle('toggle-active', _slowAudio);
  btn.setAttribute('aria-pressed', String(_slowAudio));
  btn.textContent = _slowAudio ? 'Normal Speed' : 'Slow Audio';
}

// ── Add Phrase Modal ──────────────────────────────────────────────────────────
function openModal() {
  document.getElementById('newEnglish').value = '';
  document.getElementById('newIrish').value = '';
  document.getElementById('newPronunciation').value = '';
  document.getElementById('addPhraseModal').classList.add('show');
  document.getElementById('newEnglish').focus();
}

function closeModal() {
  document.getElementById('addPhraseModal').classList.remove('show');
}

async function handlePreview() {
  var text = document.getElementById('newIrish').value.trim();
  if (!text) { showStatus('Enter an Irish phrase first.', 'warning'); return; }
  var btn = document.getElementById('previewBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Loading…';
  try {
    await previewText(text);
  } catch (e) {
    showStatus(e && e.offline ? "Can't preview while offline." : 'Preview failed — check your connection.', 'warning');
  } finally {
    btn.disabled = false;
    btn.textContent = '🔊 Preview';
  }
}

async function translateToIrish() {
  var en = document.getElementById('newEnglish').value.trim();
  if (!en) { showStatus('Enter the English phrase first.', 'warning'); return; }
  var btn = document.getElementById('translateBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Translating…';
  try {
    var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(en) + '&langpair=en|ga';
    var res = await fetch(url);
    var data = await res.json();
    var translated = data && data.responseData && data.responseData.translatedText;
    if (translated && data.responseStatus === 200) {
      document.getElementById('newIrish').value = translated;
      showStatus('Translation fetched — please verify with a fluent speaker before saving.', 'info');
    } else {
      showStatus('No translation found. Try entering the Irish text manually.', 'warning');
    }
  } catch (e) {
    showStatus('Translation failed — check your connection.', 'warning');
  } finally {
    btn.disabled = false;
    btn.textContent = '🔄 Fetch Irish translation';
  }
}

function handleAddPhrase(e) {
  e.preventDefault();
  var en = document.getElementById('newEnglish').value.trim();
  var ga = document.getElementById('newIrish').value.trim();
  var pr = document.getElementById('newPronunciation').value.trim();
  if (!en || !ga) return;

  var phrase = {
    id: 'custom-' + Date.now(),
    en: en, ga: ga, pr: pr,
    cat: 'Ár gCuid Frásaí',
    custom: true,
  };
  _customPhrases.unshift(phrase);
  saveCustomPhrases();
  closeModal();
  renderAll();
  showStatus('"' + en + '" added!', 'success');
}

function deletePhrase(id) {
  _customPhrases = _customPhrases.filter(function(p) { return p.id !== id; });
  saveCustomPhrases();
  renderAll();
}

// ── Install / PWA ─────────────────────────────────────────────────────────────
function installApp() {
  if (!_deferredInstall) return;
  _deferredInstall.prompt();
  _deferredInstall.userChoice.then(function() {
    _deferredInstall = null;
    document.getElementById('installPrompt').classList.remove('show');
  });
}

function showIOSInstallInstructions() {
  var prompt = document.getElementById('installPrompt');
  prompt.innerHTML =
    '<p>To install: tap <strong>Share ⬆️</strong> in Safari, then <strong>Add to Home Screen</strong>.</p>' +
    '<button onclick="document.getElementById(\'installPrompt\').classList.remove(\'show\')" style="margin-top:0.5rem">Got it</button>';
  prompt.classList.add('show');
}

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  loadCustomPhrases();

  // Irish text starts visible
  document.body.classList.add('show-irish');
  var toggleIrishBtn = document.getElementById('toggleIrish');
  toggleIrishBtn.textContent = 'Hide Irish';
  toggleIrishBtn.setAttribute('aria-pressed', 'true');

  renderAll();

  // Search + clear button
  document.getElementById('searchInput').addEventListener('input', function(e) {
    applySearch(e.target.value);
    document.getElementById('searchClear').classList.toggle('visible', e.target.value.length > 0);
  });
  document.getElementById('searchClear').addEventListener('click', function() {
    var input = document.getElementById('searchInput');
    input.value = '';
    applySearch('');
    this.classList.remove('visible');
    input.focus();
  });

  // Toggles
  toggleIrishBtn.addEventListener('click', handleToggleIrish);
  document.getElementById('toggleSlow').addEventListener('click', handleToggleSlow);

  // Add phrase modal
  document.getElementById('translateBtn').addEventListener('click', translateToIrish);
  document.getElementById('cancelPhraseBtn').addEventListener('click', closeModal);
  document.getElementById('previewBtn').addEventListener('click', handlePreview);
  document.getElementById('addPhraseForm').addEventListener('submit', handleAddPhrase);
  document.getElementById('addPhraseModal').addEventListener('click', function(e) {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // Android/Chrome install prompt
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    _deferredInstall = e;
    document.getElementById('installPrompt').classList.add('show');
  });

  window.addEventListener('appinstalled', function() {
    _deferredInstall = null;
    document.getElementById('installPrompt').classList.remove('show');
  });

  // iOS Safari install instructions
  var isIOS = /iP(hone|ad|od)/.test(navigator.userAgent);
  var isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|Chrome/.test(navigator.userAgent);
  var isStandalone = window.navigator.standalone;
  if (isIOS && isSafari && !isStandalone) showIOSInstallInstructions();
}

document.addEventListener('DOMContentLoaded', init);
