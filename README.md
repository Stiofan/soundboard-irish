# School Irish Soundboard v1.0.0-beta

An offline-capable Irish language phrasebook for primary school children in south County Down, Ulster Irish dialect.

**Live app:** https://stiofan.github.io/soundboard-irish/

## Features

- 102 school phrases across 9 categories (greetings, classroom, weather, days, numbers, colours, food, feelings)
- Ulster Irish audio via abair.ie (ga_UL_anb_piper voice)
- Pronunciation guide always visible on every card
- Search across English, Irish and pronunciation
- Show/hide Irish text toggle; slow audio toggle (0.75× speed)
- Add your own phrases with machine translation assist and audio preview
- Fully offline after first load (service worker + IndexedDB audio cache)
- Installable as a home screen app on iOS and Android

## Audio

Bundled WAV clips in `/audio/` were generated from [abair.ie](https://abair.ie) (TCD/ADAPT Centre) using the Ulster Irish voice `ga_UL_anb_piper`.

**Licensing:** Confirm with abair.ie/ADAPT that redistribution of generated audio is permitted before any commercial or wide public use.

To regenerate clips (e.g. after editing phrases):

```bash
python3 - <<'EOF'
import json, urllib.request, urllib.parse, base64, os, time

VOICE = 'ga_UL_anb_piper'
ENDPOINT = 'https://synthesis.abair.ie/api/synthesise'
HEADERS = {'Origin': 'https://abair.ie', 'Referer': 'https://abair.ie/', 'User-Agent': 'Mozilla/5.0'}

# Extract phrases: node -e "const {PHRASES}=require('./phrases-data.js'); console.log(JSON.stringify(PHRASES.map((p,i)=>({id:p.id,ga:p.ga}))))" > /tmp/phrases.json

with open('/tmp/phrases.json') as f:
    phrases = json.load(f)

for p in phrases:
    params = urllib.parse.urlencode({'input': p['ga'], 'voice': VOICE, 'normalise': 'true'})
    req = urllib.request.Request(f"{ENDPOINT}?{params}", headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        data = json.loads(r.read())
    with open(f"audio/{p['id']}.wav", 'wb') as f:
        f.write(base64.b64decode(data['audioContent']))
    print(f"ok {p['id']}")
    time.sleep(0.15)
EOF
```

## Content

Irish text and pronunciation hints should be reviewed by a fluent Ulster Irish speaker before treating as authoritative. The Irish content is in `phrases-data.js`.

## Structure

```
index.html          — app shell and styles
phrases-data.js     — all 102 built-in phrases
app.js              — rendering, search, toggles, modal
audio-engine.js     — playback: bundled → cache → abair.ie → offline
service-worker.js   — offline caching for shell and audio files
manifest.json       — PWA manifest
audio/              — bundled WAV clips (p001.wav … p102.wav)
icons/              — app icons
```
