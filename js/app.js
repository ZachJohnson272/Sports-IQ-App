
const modes = ['photoName', 'namePos', 'statsPlayer', 'multiChoice', 'lineup'];
let modeData = {};
modes.forEach(m => { modeData[m] = ROSTER.map((p, i) => ({ idx: i, correct: 0, attempts: 0 })); });
let lineupAttempts = 0, lineupCorrect = 0;

let currentMode = null;
let deck = [], deckIndex = 0;
let isFlipped = false, cardAnswered = false, isFlipping = false;
let mcSelected = null;
let fcStreak = 0, fcBestStreak = 0, fcCorrectCount = 0;

// ===================== HELPERS =====================
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function getMastery(pd) { return pd.attempts === 0 ? null : Math.round((pd.correct / pd.attempts) * 100); }
function isLearned(pd)  { return pd.attempts >= 2 && getMastery(pd) >= 80; }
function getModeMastery(mode) {
  const data = modeData[mode];
  const total = data.reduce((s,p) => s+p.attempts, 0);
  const correct = data.reduce((s,p) => s+p.correct, 0);
  return total === 0 ? 0 : Math.round((correct/total)*100);
}
function getModeLearnedCount(mode) { return modeData[mode].filter(isLearned).length; }
function buildDeck(mode) {
  const pool = [];
  modeData[mode].forEach((pd, idx) => {
    const m = getMastery(pd);
    let weight = m === null ? 2 : m < 50 ? 4 : m < 80 ? 3 : 1;
    for (let i = 0; i < weight; i++) pool.push(idx);
  });
  shuffle(pool);
  return pool.slice(0, 18);
}
function getRandomOthers(excludeIdx, count) {
  const others = ROSTER.map((_, i) => i).filter(i => i !== excludeIdx);
  shuffle(others);
  return others.slice(0, count);
}

// ===================== NAVIGATION =====================
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');
  if (id === 'modeSelect') updateModeStats();
  // Sync bottom nav highlight
  const reverseMap = { home:'home', learnPage:'learn', leaderboardPage:'leaderboard', progressPage:'progress', profilePage:'profile' };
  if (reverseMap[id]) {
    document.querySelectorAll('.bn-tab').forEach(t => t.classList.remove('active'));
    const btn = document.getElementById('bn-' + reverseMap[id]);
    if (btn) btn.classList.add('active');
  }
}
function goJazzTeam() { updateHomeStats(); showPage('jazzTeam'); }
function showComingSoon() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// ===================== HOME STATS =====================
function updateHomeStats() {
  let totalCorrect = 0, totalAttempts = 0;
  modes.filter(m => m !== 'lineup').forEach(m => {
    modeData[m].forEach(p => { totalCorrect += p.correct; totalAttempts += p.attempts; });
  });
  const pct = totalAttempts === 0 ? 0 : Math.round((totalCorrect/totalAttempts)*100);
  document.getElementById('homeMasteryPct').textContent = pct + '%';
  document.getElementById('homeMasteryBar').style.width = pct + '%';
  const learnedSet = new Set();
  modes.filter(m => m !== 'lineup').forEach(m => {
    modeData[m].forEach((pd,i) => { if (isLearned(pd)) learnedSet.add(i); });
  });
  document.getElementById('homeLearnedCount').textContent = learnedSet.size;
  document.getElementById('homeTotalAttempts').textContent = totalAttempts;
}

function updateModeStats() {
  modes.filter(m => m !== 'lineup').forEach(m => {
    const el = document.getElementById('modeStats_' + m);
    if (el) el.textContent = getModeLearnedCount(m) + '/10';
  });
  const lineupEl = document.getElementById('modeStats_lineup');
  if (lineupEl) lineupEl.textContent = lineupAttempts > 0 ? lineupCorrect + '/' + lineupAttempts : '—';
}

// ===================== SMART EXIT =====================
// Called by the ✕ Exit button in #flashcards for ALL modes.
// Cleans up mode-specific state, then navigates back correctly.
function fcExit() {
  const isRandMode = document.getElementById('answerBtns').dataset.randMode === '1';

  if (isRandMode) {
    // Random mode: clean up overrides, then return to correct parent
    lpRandomReset();
  }
  // Use context-aware return navigation for all modes
  goBackToSessionModes();
}
function startMode(mode) {
  // ── New deck-builder modes ──────────────────────────────────
  if (MODE_BUILDERS[mode]) {
    _sessionMode = mode;
    const builder = MODE_BUILDERS[mode];
    startFlashSession(builder(), { shuffle: true });
    return;
  }
  // ── Legacy roster-index modes ───────────────────────────────
  currentMode = mode;
  _fcReversed = false;
  isFlipping = false;
  fcStreak = 0; fcBestStreak = 0; fcCorrectCount = 0;
  const reverseBtn = document.getElementById('fcReverseBtn');
  if (reverseBtn) { reverseBtn.classList.remove('active'); reverseBtn.style.display = 'none'; }
  if (mode === 'lineup') { startLineup(); return; }
  deck = buildDeck(mode);
  deckIndex = 0;
  document.getElementById('cardScene').style.display = '';
  document.getElementById('answerBtns').style.display = mode === 'multiChoice' ? 'none' : '';
  document.getElementById('mcOptions').style.display = mode === 'multiChoice' ? '' : 'none';
  document.getElementById('lineupMode').style.display = 'none';
  const _rc = document.getElementById('roundComplete');
  _rc.classList.remove('show'); _rc.style.display = '';
  document.getElementById('fcTotal').textContent = deck.length;
  const modeTitles = {
    namePos: 'Player → Position & Jersey',
    statsPlayer: 'Player Stats',
    multiChoice: 'Multiple Choice',
    lineup: 'Starting Lineup',
  };
  const titleEl = document.getElementById('fcModeTitle');
  if (titleEl) titleEl.textContent = modeTitles[mode] || '';
  _fcUpdateStreakBadge();
  loadCard();
  showPage('flashcards');
}
function restartCurrentMode() {
  if (document.getElementById('answerBtns').dataset.randMode === '1') { lpRandomRestart(); return; }
  if (_sessionMode && MODE_BUILDERS[_sessionMode]) { restartSessionMode(); return; }
  startMode(currentMode);
}

// ===================== LOAD CARD (legacy roster-index engine) =====================
function loadCard() {
  _sessionMode = null; // ensure answerCard routes to legacy path
  delete document.getElementById('answerBtns').dataset.randMode; // not in random mode
  if (deckIndex >= deck.length) { endRound(); return; }
  const playerIdx = deck[deckIndex];
  const pd = ROSTER[playerIdx];
  const modePd = modeData[currentMode][playerIdx];
  isFlipped = false; cardAnswered = false; isFlipping = false; mcSelected = null;
  const c3d = document.getElementById('card3d');
  // Disable transition briefly so the reset to front is instant, not animated
  c3d.style.transition = 'none';
  c3d.classList.remove('flipped');
  // Force reflow, then re-enable transition for next flip
  void c3d.offsetWidth;
  c3d.style.transition = '';
  const photoEl = document.getElementById('playerPhoto');
  const overlayEl = document.getElementById('photoOverlay');
  const frontTextEl = document.getElementById('cardFrontText');
  photoEl.style.display = 'none'; overlayEl.style.display = 'none'; frontTextEl.style.display = 'none';
  const backPhotoEl = document.getElementById('backPhoto');
  backPhotoEl.src = pd.image_url || '';
  backPhotoEl.onerror = () => { backPhotoEl.style.display = 'none'; };
  backPhotoEl.onload  = () => { backPhotoEl.style.display = ''; };
  document.getElementById('backName').textContent = pd.name;
  document.getElementById('backPos').textContent = getPosLabel(pd);
  const m = getMastery(modePd);
  // cardStreak hidden
  if (currentMode === 'photoName') {
    frontTextEl.style.display = '';
    frontTextEl.innerHTML = `<div class="front-label">Who plays for the Jazz?</div><div class="front-main">${pd.name}</div>`;
    document.getElementById('backStats').innerHTML = `
      <div class="back-stat"><span class="sv">${pd.height}</span><span class="sk">Height</span></div>
      <div class="back-stat"><span class="sv">#${pd.jersey}</span><span class="sk">Jersey</span></div>`;
  } else if (currentMode === 'namePos') {
    frontTextEl.style.display = '';
    if (_fcReversed) {
      frontTextEl.innerHTML = `
        <div class="front-label">Which Jazz player has these stats?</div>
        <div class="front-stat-row">
          <div class="front-stat-chip"><span class="fsv">${getPosLabel(pd)}</span><span class="fsk">Position</span></div>
          <div class="front-stat-chip"><span class="fsv">#${pd.jersey}</span><span class="fsk">Jersey</span></div>
          <div class="front-stat-chip"><span class="fsv">${pd.height}</span><span class="fsk">Height</span></div>
        </div>`;
      document.getElementById('backStats').innerHTML = '';
    } else {
      frontTextEl.innerHTML = `<div class="front-label">Who plays for the Jazz?</div><div class="front-main">${pd.name}</div>`;
      document.getElementById('backStats').innerHTML = `
        <div class="back-stat"><span class="sv">${getPosLabel(pd)}</span><span class="sk">Position</span></div>
        <div class="back-stat"><span class="sv">#${pd.jersey}</span><span class="sk">Jersey</span></div>
        <div class="back-stat"><span class="sv">${pd.height}</span><span class="sk">Height</span></div>`;
    }
  } else if (currentMode === 'statsPlayer') {
    frontTextEl.style.display = '';
    if (_fcReversed) {
      frontTextEl.innerHTML = `<div class="front-label">What are this player's stats?</div><div class="front-main">${pd.name}</div>`;
      document.getElementById('backStats').innerHTML = `
        <div class="back-stat"><span class="sv">${pd.height}</span><span class="sk">Height</span></div>
        <div class="back-stat"><span class="sv">#${pd.jersey}</span><span class="sk">Jersey</span></div>
        <div class="back-stat"><span class="sv">${pd.college}</span><span class="sk">College</span></div>
        <div class="back-stat"><span class="sv">${getPosLabel(pd)}</span><span class="sk">Position</span></div>`;
    } else {
      frontTextEl.innerHTML = `
        <div class="front-label">Who is this Jazz player?</div>
        <div class="front-stat-row">
          <div class="front-stat-chip"><span class="fsv">${pd.height}</span><span class="fsk">Height</span></div>
          <div class="front-stat-chip"><span class="fsv">#${pd.jersey}</span><span class="fsk">Jersey</span></div>
          <div class="front-stat-chip"><span class="fsv">${pd.college}</span><span class="fsk">College</span></div>
          <div class="front-stat-chip"><span class="fsv">${getPosLabel(pd)}</span><span class="fsk">Position</span></div>
        </div>`;
      document.getElementById('backStats').innerHTML = '';
    }
  } else if (currentMode === 'multiChoice') {
    frontTextEl.style.display = '';
    frontTextEl.innerHTML = `
      <div class="front-label">Which Jazz player matches these clues?</div>
      <div class="front-stat-row">
        <div class="front-stat-chip"><span class="fsv">${pd.height}</span><span class="fsk">Height</span></div>
        <div class="front-stat-chip"><span class="fsv">#${pd.jersey}</span><span class="fsk">Jersey</span></div>
        <div class="front-stat-chip"><span class="fsv">${pd.college}</span><span class="fsk">College</span></div>
        <div class="front-stat-chip"><span class="fsv">${getPosLabel(pd)}</span><span class="fsk">Position</span></div>
      </div>`;
    document.getElementById('backStats').innerHTML = '';
    buildMCOptions(playerIdx);
  }
  document.getElementById('fcCurrent').textContent = deckIndex + 1;
  document.getElementById('fcProgressBar').style.width = ((deckIndex/deck.length)*100) + '%';
  const scene = document.getElementById('cardScene');
  scene.classList.remove('entering'); void scene.offsetWidth; scene.classList.add('entering');
  if (currentMode !== 'multiChoice') {
    document.getElementById('answerBtns').classList.add('answer-btns-hidden');
    document.getElementById('answerBtns').classList.add('answer-btns-locked');
  }
}

function _fcUpdateStreakBadge() {
  const badge = document.getElementById('fcStreakBadge');
  const num   = document.getElementById('fcStreakNum');
  if (!badge || !num) return;
  num.textContent = fcStreak;
  badge.classList.toggle('streak-fire', fcStreak >= 3);
}

function flipCard() {
  if (cardAnswered || isFlipping) return;
  if (currentMode === 'multiChoice' && !_sessionMode) return;
  if (isFlipped) return;
  isFlipping = true;
  isFlipped  = true;
  const card3d = document.getElementById('card3d');
  card3d.classList.add('flipped');
  // Unlock after CSS transition completes (matches 0.45s ease)
  setTimeout(() => {
    isFlipping = false;
    const btns = document.getElementById('answerBtns');
    btns.classList.remove('answer-btns-hidden', 'answer-btns-locked');
  }, 460);
}

function answerCard(correct) {
  // Route to random mode engine when active
  if (document.getElementById('answerBtns').dataset.randMode === '1') { lpRandAnswer(correct); return; }
  // Route to session engine for deck-builder modes
  if (_sessionMode && MODE_BUILDERS[_sessionMode]) { answerSessionCard(correct); return; }
  if (cardAnswered || !isFlipped || isFlipping) return;
  cardAnswered = true;

  // Update per-player mastery data
  const playerIdx = deck[deckIndex];
  modeData[currentMode][playerIdx].attempts++;
  if (correct) { modeData[currentMode][playerIdx].correct++; xpAward(3); }

  // Streak tracking
  if (correct) {
    fcCorrectCount++;
    fcStreak++;
    if (fcStreak > fcBestStreak) fcBestStreak = fcStreak;
  } else {
    fcStreak = 0;
  }
  _fcUpdateStreakBadge();

  // Feedback flash
  const flash = document.getElementById('feedbackFlash');
  flash.className = 'feedback-flash ' + (correct ? 'show-got' : 'show-miss');
  setTimeout(() => { flash.className = 'feedback-flash'; }, 380);

  // Step 1: unflip the card back to front face first
  isFlipping = true;
  const card3d = document.getElementById('card3d');
  card3d.classList.remove('flipped');

  // Step 2: after the unflip animation completes, advance and load new content
  // 0.45s CSS + small buffer = 500ms
  deckIndex++;
  setTimeout(() => {
    isFlipping = false;
    loadCard();
  }, 500);
}

// ===================== MULTIPLE CHOICE =====================
function buildMCOptions(correctIdx) {
  const others = getRandomOthers(correctIdx, 3);
  const options = shuffle([correctIdx, ...others]);
  const grid = document.getElementById('mcGrid');
  grid.innerHTML = '';
  options.forEach(idx => {
    const btn = document.createElement('button');
    btn.className = 'mc-btn';
    btn.textContent = ROSTER[idx].name;
    btn.onclick = () => selectMC(btn, idx, correctIdx);
    grid.appendChild(btn);
  });
  document.getElementById('mcSubmit').style.display = 'none';
}

function selectMC(btn, selectedIdx, correctIdx) {
  if (cardAnswered) return;
  mcSelected = { selectedIdx, correctIdx };
  document.querySelectorAll('.mc-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('mcSubmit').style.display = '';
}

function submitMC() {
  if (!mcSelected || cardAnswered) return;
  cardAnswered = true;
  const { selectedIdx, correctIdx } = mcSelected;
  const correct = selectedIdx === correctIdx;
  const playerIdx = deck[deckIndex];
  modeData[currentMode][playerIdx].attempts++;
  if (correct) { modeData[currentMode][playerIdx].correct++; xpAward(3); }

  // Streak tracking
  if (correct) {
    fcCorrectCount++;
    fcStreak++;
    if (fcStreak > fcBestStreak) fcBestStreak = fcStreak;
  } else {
    fcStreak = 0;
  }
  _fcUpdateStreakBadge();

  document.querySelectorAll('.mc-btn').forEach(btn => {
    if (btn.textContent === ROSTER[correctIdx].name) btn.classList.add('correct');
    else if (btn.classList.contains('selected')) btn.classList.add('wrong');
  });
  setTimeout(() => { document.getElementById('card3d').classList.add('flipped'); document.getElementById('mcSubmit').style.display = 'none'; }, 600);
  const flash = document.getElementById('feedbackFlash');
  flash.className = 'feedback-flash ' + (correct ? 'show-got' : 'show-miss');
  setTimeout(() => { flash.className = 'feedback-flash'; }, 380);
  setTimeout(() => { deckIndex++; loadCard(); document.getElementById('mcGrid').innerHTML = ''; }, 1800);
}

// ===================== LINEUP MODE =====================
const LINEUP_POSITIONS = [
  { label:'PG', full:'Point Guard',    posCode:'G' },
  { label:'SG', full:'Shooting Guard', posCode:'G' },
  { label:'SF', full:'Small Forward',  posCode:'F' },
  { label:'PF', full:'Power Forward',  posCode:'F' },
  { label:'C',  full:'Center',         posCode:'C' }
];

function startLineup() {
  document.getElementById('cardScene').style.display = 'none';
  document.getElementById('answerBtns').style.display = 'none';
  const _rc = document.getElementById('roundComplete');
  _rc.classList.remove('show'); _rc.style.display = '';
  document.getElementById('lineupMode').style.display = '';
  document.getElementById('lineupResult').style.display = 'none';
  document.getElementById('fcCurrent').textContent = '—';
  document.getElementById('fcTotal').textContent = '—';


  const allNames = ROSTER.map(p => p.name).sort();
  const grid = document.getElementById('lineupGrid');
  grid.innerHTML = '';
  LINEUP_POSITIONS.forEach(pos => {
    const row = document.createElement('div');
    row.className = 'lineup-row';
    row.innerHTML = `
      <div class="lineup-pos">${pos.label}</div>
      <div style="flex:1;display:flex;flex-direction:column;gap:2px;">
        <div style="font-size:11px;color:var(--muted);letter-spacing:1px;">${pos.full}</div>
        <select class="lineup-select" id="lineup_${pos.label}">
          <option value="">— Select player —</option>
          ${allNames.map(n => `<option value="${n}">${n}</option>`).join('')}
        </select>
      </div>`;
    grid.appendChild(row);
  });
  document.getElementById('lineupSubmit').style.display = '';
  showPage('flashcards');
}

function submitLineup() {
  const resultDiv = document.getElementById('lineupResult');
  resultDiv.style.display = '';
  let html = '', correct = 0;
  LINEUP_POSITIONS.forEach(pos => {
    const selected = document.getElementById('lineup_' + pos.label).value;
    const expected = JAZZ_STARTING_LINEUP[pos.label];
    const isRight = selected === expected;
    if (isRight) correct++;
    html += `<div class="lineup-result-row">
      <span class="${isRight?'check':'cross'}">${isRight?'✅':'❌'}</span>
      <span style="color:var(--muted);width:32px;">${pos.label}</span>
      <span>${selected || '(none)'}</span>
      ${!isRight ? `<span style="color:var(--muted);font-size:12px;">→ ${expected}</span>` : ''}
    </div>`;
  });
  lineupAttempts++;
  if (correct === 5) lineupCorrect++;
  html += `<div style="margin-top:12px;font-family:'Bebas Neue',sans-serif;font-size:22px;color:${correct===5?'#3dcc7a':'var(--jazz-sky)'};">${correct}/5 Correct</div>`;
  html += `<button class="btn-ghost" style="margin-top:12px;" onclick="startLineup()">Try Again</button>`;
  resultDiv.innerHTML = html;
  document.getElementById('lineupSubmit').style.display = 'none';
  
}

function endRound() {
  document.getElementById('cardScene').style.display = 'none';
  document.getElementById('answerBtns').style.display = 'none';
  document.getElementById('mcOptions').style.display = 'none';

  const total    = deck.length;
  const accuracy = total > 0 ? Math.round((fcCorrectCount / total) * 100) : 0;
  const m        = getModeMastery(currentMode);

  document.getElementById('rcCorrect').textContent    = fcCorrectCount + ' / ' + total;
  document.getElementById('rcIncorrect').textContent  = (total - fcCorrectCount) + ' / ' + total;
  document.getElementById('rcAccuracy').textContent   = accuracy + '%';
  document.getElementById('rcBestStreak').textContent = fcBestStreak;


  document.getElementById('roundComplete').classList.add('show');
  if (m === 100) xpAward(15);
}

// ===================== DAILY PLAYER =====================
const DP_PLAYERS = {
  nba: [
    { name:"LeBron James",       team:"Lakers",    position:"Forward", jersey:"#23", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" },
    { name:"Stephen Curry",      team:"Warriors",  position:"Guard",   jersey:"#30", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" },
    { name:"Kevin Durant",       team:"Suns",      position:"Forward", jersey:"#35", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png" },
    { name:"Nikola Jokić",       team:"Nuggets",   position:"Center",  jersey:"#15", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png" },
    { name:"Jayson Tatum",       team:"Celtics",   position:"Forward", jersey:"#0",  img:"https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png" },
    { name:"Luka Dončić",        team:"Mavericks", position:"Guard",   jersey:"#77", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png" },
    { name:"Shai Gilgeous-Alexander", team:"Thunder", position:"Guard", jersey:"#2", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/1628983.png" },
    { name:"Giannis Antetokounmpo", team:"Bucks",  position:"Forward", jersey:"#34", img:"https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png" },
    { name:"Anthony Davis",      team:"Lakers",    position:"Center",  jersey:"#3",  img:"https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png" },
    { name:"Damian Lillard",     team:"Bucks",     position:"Guard",   jersey:"#0",  img:"https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png" },
  ],
  nfl: [
    { name:"Patrick Mahomes",  team:"Chiefs",   position:"QB", jersey:"#15", img:"https://static.www.nfl.com/image/private/t_headshot_desktop/league/mvs4jnabtyqeaijdh3v9" },
    { name:"Josh Allen",       team:"Bills",    position:"QB", jersey:"#17", img:"https://static.www.nfl.com/image/private/t_headshot_desktop/league/iqkdlxafkqpzxnkqkzxu" },
    { name:"Justin Jefferson", team:"Vikings",  position:"WR", jersey:"#18", img:"https://static.www.nfl.com/image/private/t_headshot_desktop/league/dgjxaqbqqpqrtyytfvxk" },
    { name:"Jalen Hurts",      team:"Eagles",   position:"QB", jersey:"#1",  img:"https://static.www.nfl.com/image/private/t_headshot_desktop/league/jltmjpyczmyjmfjm5y1r" },
    { name:"CeeDee Lamb",      team:"Cowboys",  position:"WR", jersey:"#88", img:"https://static.www.nfl.com/image/private/t_headshot_desktop/league/xivtjvhkevqxuvwtxb8u" },
  ],
  mlb: [
    { name:"Shohei Ohtani",    team:"Dodgers",  position:"DH/P", jersey:"#17", img:"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/660271/headshot/67/current" },
    { name:"Mookie Betts",     team:"Dodgers",  position:"SS",   jersey:"#50", img:"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/605141/headshot/67/current" },
    { name:"Aaron Judge",      team:"Yankees",  position:"RF",   jersey:"#99", img:"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/592450/headshot/67/current" },
    { name:"Freddie Freeman",  team:"Dodgers",  position:"1B",   jersey:"#5",  img:"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/518692/headshot/67/current" },
    { name:"Ronald Acuña Jr.", team:"Braves",   position:"RF",   jersey:"#13", img:"https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/660670/headshot/67/current" },
  ],
  nhl: [
    { name:"Connor McDavid",   team:"Oilers",      position:"C",  jersey:"#97", img:"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8478402.jpg" },
    { name:"Nathan MacKinnon", team:"Avalanche",   position:"C",  jersey:"#29", img:"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8477492.jpg" },
    { name:"David Pastrnak",   team:"Bruins",      position:"RW", jersey:"#88", img:"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8477956.jpg" },
    { name:"Auston Matthews",  team:"Maple Leafs", position:"C",  jersey:"#34", img:"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8479318.jpg" },
    { name:"Leon Draisaitl",  team:"Oilers",      position:"C",  jersey:"#29", img:"https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8477934.jpg" },
  ],
};

const DP_META = {
  nba: { icon:'🏀', label:'NBA' },
  nfl: { icon:'🏈', label:'NFL' },
  mlb: { icon:'⚾', label:'MLB' },
  nhl: { icon:'🏒', label:'NHL' },
};

let dpSport = null, dpPlayer = null, dpGuessCount = 0;
const DP_MAX = 3;

function dpTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function dpGetDailyPlayer(sport) {
  const pool = DP_PLAYERS[sport];
  const d = new Date();
  const seed = parseInt(`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`) + sport.charCodeAt(0);
  return pool[seed % pool.length];
}

function dpLoadState(sport) {
  try { return JSON.parse(localStorage.getItem('siq_daily_' + sport) || 'null'); }
  catch { return null; }
}

function dpSaveState(sport, state) {
  localStorage.setItem('siq_daily_' + sport, JSON.stringify(state));
}

function dpOpen(sport) {
  dpSport = sport;
  dpPlayer = dpGetDailyPlayer(sport);
  dpGuessCount = 0;

  const meta = DP_META[sport];
  const stored = dpLoadState(sport);
  const today = dpTodayKey();
  const now = new Date();

  document.getElementById('dp-sport-icon').textContent = meta.icon;
  document.getElementById('dp-title').textContent = meta.label + ' Daily Player';
  document.getElementById('dp-subtitle').textContent =
    now.toLocaleString('default',{month:'short'}) + ' ' + now.getDate() + ' · Guess today\'s mystery player';

  document.getElementById('dp-stat-streak').textContent = stored?.streak || 0;
  document.getElementById('dp-stat-best').textContent   = stored?.bestStreak || 0;
  document.getElementById('dp-stat-pts').textContent    = stored?.totalPoints || 0;

  const photo = document.getElementById('dp-photo');
  photo.src = dpPlayer.img;
  photo.style.filter = 'blur(18px) grayscale(1) brightness(.35)';
  document.getElementById('dp-photo-wrap').className = '';
  document.getElementById('dp-hints').innerHTML = '';
  document.getElementById('dp-feedback').textContent = '';
  document.getElementById('dp-feedback').className = '';
  document.getElementById('dp-played-msg').style.display = 'none';
  ['dp-dot-0','dp-dot-1','dp-dot-2'].forEach(id => { document.getElementById(id).className = 'dp-dot'; });

  const input = document.getElementById('dp-guess');
  const submit = document.getElementById('dp-submit');
  input.value = ''; input.disabled = false; submit.disabled = false;
  document.getElementById('dp-input-row').style.display = '';
  document.getElementById('dp-dots').style.display = '';
  document.getElementById('dp-hints').style.display = '';

  if (stored?.lastPlayed === today) { dpShowPlayed(stored); }

  document.getElementById('dp-overlay').classList.add('open');
  setTimeout(() => input.focus(), 100);
}

function dpClose() {
  document.getElementById('dp-overlay').classList.remove('open');
  dpUpdateBadges();
}

function dpSubmit() {
  const input = document.getElementById('dp-guess');
  const feedback = document.getElementById('dp-feedback');
  const guess = input.value.trim();
  if (!guess) return;

  const correct = dpNorm(guess) === dpNorm(dpPlayer.name);

  if (correct) {
    document.getElementById('dp-dot-' + dpGuessCount).className = 'dp-dot correct';
    dpRevealPhoto(true);
    const pts = Math.max(100 - dpGuessCount * 25, 25);
    feedback.className = 'correct';
    feedback.innerHTML = '✅ That\'s right! <span class="dp-pts-pop">+' + pts + ' pts</span>';
    document.getElementById('dp-guess').disabled = true;
    document.getElementById('dp-submit').disabled = true;
    dpSaveResult(true, pts);
    xpAward(20);
    const s = dpLoadState(dpSport);
    document.getElementById('dp-stat-streak').textContent = s.streak;
    document.getElementById('dp-stat-best').textContent   = s.bestStreak;
    document.getElementById('dp-stat-pts').textContent    = s.totalPoints;
  } else {
    document.getElementById('dp-dot-' + dpGuessCount).className = 'dp-dot used';
    dpGuessCount++;
    dpRevealHint(dpGuessCount);
    dpReduceBlur(dpGuessCount);
    if (dpGuessCount >= DP_MAX) {
      dpRevealPhoto(false);
      feedback.className = 'wrong';
      feedback.textContent = '❌ It was ' + dpPlayer.name;
      document.getElementById('dp-guess').disabled = true;
      document.getElementById('dp-submit').disabled = true;
      dpSaveResult(false, 0);
      document.getElementById('dp-stat-streak').textContent = dpLoadState(dpSport)?.streak || 0;
    } else {
      feedback.className = 'wrong';
      const left = DP_MAX - dpGuessCount;
      feedback.textContent = '❌ Not quite — ' + left + ' guess' + (left===1?'':'es') + ' left';
      input.value = '';
      input.focus();
    }
  }
}

function dpNorm(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim();
}

function dpRevealHint(wrongCount) {
  const hints = [
    { label:'Position', value: dpPlayer.position },
    { label:'Team',     value: dpPlayer.team },
    { label:'Jersey',   value: dpPlayer.jersey },
  ];
  const h = hints[wrongCount - 1];
  if (!h) return;
  const chip = document.createElement('div');
  chip.className = 'dp-hint-chip';
  chip.textContent = h.label + ': ' + h.value;
  document.getElementById('dp-hints').appendChild(chip);
}

function dpReduceBlur(n) {
  const levels = [
    'blur(18px) grayscale(1) brightness(.35)',
    'blur(10px) grayscale(1) brightness(.55)',
    'blur(4px) grayscale(.4) brightness(.8)',
    'blur(0px) grayscale(0) brightness(1)',
  ];
  document.getElementById('dp-photo').style.filter = levels[Math.min(n, 3)];
}

function dpRevealPhoto(correct) {
  document.getElementById('dp-photo').style.filter = 'none';
  document.getElementById('dp-photo-wrap').className = correct ? 'correct' : 'wrong';
}

function dpSaveResult(won, pts) {
  const stored = dpLoadState(dpSport) || { streak:0, bestStreak:0, totalPoints:0 };
  stored.lastPlayed = dpTodayKey();
  stored.lastResult = { won, pts, playerName: dpPlayer.name, playerImg: dpPlayer.img };
  if (won) {
    stored.streak++;
    if (stored.streak > stored.bestStreak) stored.bestStreak = stored.streak;
    stored.totalPoints = (stored.totalPoints || 0) + pts;
    // Trigger Supabase streak update on daily quiz win
    sbStreakSave();
  } else {
    stored.streak = 0;
  }
  dpSaveState(dpSport, stored);
}

function dpShowPlayed(stored) {
  document.getElementById('dp-guess').disabled = true;
  document.getElementById('dp-submit').disabled = true;
  document.getElementById('dp-input-row').style.display = 'none';
  document.getElementById('dp-dots').style.display = 'none';
  document.getElementById('dp-hints').style.display = 'none';
  document.getElementById('dp-feedback').textContent = '';

  const r = stored.lastResult;
  const played = document.getElementById('dp-played-msg');
  played.style.display = 'block';
  played.innerHTML = `
    <div class="pi">${r.won ? '🏆' : '😔'}</div>
    <div class="pt">${r.won ? 'You got it!' : 'Better luck tomorrow!'}</div>
    <div class="ps">Come back tomorrow for a new challenge.</div>
    <div class="pa">Today's player: <strong>${r.playerName}</strong>${r.won ? ' · <span style="color:#f5c842">+' + r.pts + ' pts</span>' : ''}</div>`;

  const photo = document.getElementById('dp-photo');
  photo.src = r.playerImg || dpPlayer.img;
  photo.style.filter = 'none';
  document.getElementById('dp-photo-wrap').className = r.won ? 'correct' : 'wrong';
}

function dpUpdateBadges() {
  ['nba','nfl','mlb','nhl'].forEach(sport => {
    const btn = document.getElementById('dp-btn-' + sport);
    if (!btn) return;
    const old = btn.querySelector('.dp-streak-badge');
    if (old) old.remove();
    const streak = dpLoadState(sport)?.streak || 0;
    if (streak > 0) {
      const badge = document.createElement('span');
      badge.className = 'dp-streak-badge';
      badge.textContent = streak + '🔥';
      btn.appendChild(badge);
    }
  });
}

document.getElementById('dp-guess').addEventListener('keydown', e => { if (e.key === 'Enter') dpSubmit(); });
document.getElementById('dp-overlay').addEventListener('click', e => { if (e.target === document.getElementById('dp-overlay')) dpClose(); });


// ===================== BOTTOM NAV + NEW PAGES =====================

// Level system
const LEVELS = [
  { min:0,    max:49,   name:'Rookie',      title:'Just Getting Started' },
  { min:50,   max:149,  name:'Bench Player',title:'Working Your Way Up' },
  { min:150,  max:299,  name:'Starter',     title:'Making the Starting Five' },
  { min:300,  max:599,  name:'Sixth Man',   title:'Instant Impact Off the Bench' },
  { min:600,  max:999,  name:'All-Star',    title:'Elite Performance' },
  { min:1000, max:1599, name:'MVP',         title:'Most Valuable Player' },
  { min:1600, max:2499, name:'Hall of Famer',title:'Legendary Status' },
  { min:2500, max:null, name:'GOAT',        title:'Greatest of All Time' },
];

function xpGetLevel(totalXp) {
  let level = LEVELS[0];
  let levelNum = 1;
  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXp >= LEVELS[i].min) { level = LEVELS[i]; levelNum = i + 1; }
  }
  const nextLevel = LEVELS[levelNum] || null;
  const pct = nextLevel
    ? Math.min(((totalXp - level.min) / (nextLevel.min - level.min)) * 100, 100)
    : 100;
  return { levelNum, level, nextLevel, pct };
}



// --- Bottom nav switch ---
const BN_TAB_MAP = {
  home: 'home',
  learn: 'learnPage',
  leaderboard: 'leaderboardPage',
  progress: 'progressPage',
  profile: 'profilePage'
};

function bnSwitch(tab) {
  // Update tab states
  document.querySelectorAll('.bn-tab').forEach(t => t.classList.remove('active'));
  const btn = document.getElementById('bn-' + tab);
  if (btn) btn.classList.add('active');

  // Show correct page
  const pageId = BN_TAB_MAP[tab];
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');

  // Refresh page data
  if (tab === 'home') { updateHomeStats(); xpRender(); refreshHome(); renderHomeLb(); }
  if (tab === 'learn') { _lpPath = null; lpGoPanel(1); lpUpdateJazzMastery(); }
  if (tab === 'leaderboard') { lbRender('global'); }
  if (tab === 'progress') { progRender(); }
  if (tab === 'profile') { profRender(); }
}

function bnGoFlashcards() {
  // Legacy: go to learn tab and open to step 1
  bnSwitch('learn');
}

// ===================== LEARN PAGE — REDESIGN =====================
let _lpPath    = null;   // 'league' | 'team'
let _lpTeam    = null;   // team slug e.g. 'jazz'

// ── Session return-target system ────────────────────────────
// Stores where the user came from before entering a flashcard session.
// Used by both "Back to Modes" (completion screen) and Exit button.
let _sessionReturnTarget = null;

function setSessionReturnTarget(target) {
  // target: { path, panel, leagueCat, teamCat }
  // path: 'league' | 'team' | 'random'
  // panel: panel id to restore (e.g. 'lp-panel-3-league', 'lp-panel-4-team')
  // leagueCat: active league section ('players'|'random') or null
  // teamCat: active team section ('players'|'history') or null
  _sessionReturnTarget = target;
}

function goBackToSessionModes() {
  if (!_sessionReturnTarget) {
    bnSwitch('learn');
    return;
  }
  const t = _sessionReturnTarget;
  // Switch to learn page — this calls lpGoPanel(1) which hides the bar.
  // We restore the bar and correct panel in the setTimeout below.
  bnSwitch('learn');
  setTimeout(() => {
    // Always restore the toggle bar — bnSwitch('learn') hides it via lpGoPanel(1)
    const bar = document.getElementById('lp-toggle-bar');
    if (bar) bar.style.display = 'flex';

    if (t.path === 'random') {
      if (t.fromPath === 'team') {
        // Return to Team Mastery category grid
        _lpPath = 'team';
        document.getElementById('lp-toggle-league') && document.getElementById('lp-toggle-league').classList.remove('active');
        document.getElementById('lp-toggle-team') && document.getElementById('lp-toggle-team').classList.add('active');
        lpShowPanel('lp-panel-4-team');
        lpCloseCat('team');
      } else {
        // Return to League Knowledge flat panel
        _lpPath = 'league';
        document.getElementById('lp-toggle-league') && document.getElementById('lp-toggle-league').classList.add('active');
        document.getElementById('lp-toggle-team') && document.getElementById('lp-toggle-team').classList.remove('active');
        lpShowPanel('lp-panel-3-league');
      }
    } else if (t.path === 'league') {
      _lpPath = 'league';
      document.getElementById('lp-toggle-league') && document.getElementById('lp-toggle-league').classList.add('active');
      document.getElementById('lp-toggle-team') && document.getElementById('lp-toggle-team').classList.remove('active');
      lpShowPanel('lp-panel-3-league');
    } else if (t.path === 'team') {
      _lpPath = 'team';
      document.getElementById('lp-toggle-league') && document.getElementById('lp-toggle-league').classList.remove('active');
      document.getElementById('lp-toggle-team') && document.getElementById('lp-toggle-team').classList.add('active');
      lpShowPanel('lp-panel-4-team');
      if (t.teamCat) {
        lpSelectTeamCat(t.teamCat);
        // Restore the exact tier the user was on (lpSelectTeamCat resets to index 0)
        if (t.tierTabId) {
          const tab = document.getElementById(t.tierTabId);
          if (tab) {
            const tierKey = t.tierTabId.replace(/^lp-[lt]tab-/, '');
            const sectionId = 'lp-tsec-' + t.teamCat;
            lpSelectCatTier(sectionId, tierKey);
          }
        }
      }
    }
  }, 30);
}
let _lpContent = null;   // 'flashcards' | 'quizzes' | 'games'

// Show/hide a named panel — supports both id strings and suffixed panel ids
function lpShowPanel(panelId) {
  const allPanels = document.querySelectorAll('#learnPage .lp-panel');
  allPanels.forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(panelId);
  if (el) {
    el.classList.remove('hidden');
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = ''; });
  }
}

function lpGoPanel(n, subtype) {
  const bar = document.getElementById('lp-toggle-bar');
  if (n === 1) {
    if (bar) bar.style.display = 'none';
    lpShowPanel('lp-panel-1');
    return;
  }
  if (n === 2) {
    if (bar) bar.style.display = 'flex';
    lpShowPanel('lp-panel-2');
    return;
  }
  if (n === '2b') {
    if (bar) bar.style.display = 'flex';
    lpShowPanel('lp-panel-2b');
    return;
  }
  if (n === 3) {
    if (bar) bar.style.display = 'flex';
    // subtype overrides _lpPath for hub navigation
    const path = subtype || _lpPath;
    if (path === 'league') {
      // Reset cat grid
      const g = document.getElementById('lp-league-cat-grid');
      if (g) g.style.display = '';
      ['players','random'].forEach(s => {
        const sec = document.getElementById('lp-lsec-' + s);
        if (sec) sec.classList.add('hidden');
      });
      lpShowPanel('lp-panel-3-league');
    }
    else lpShowPanel('lp-panel-3-team');
    return;
  }
  if (n === 4) {
    if (bar) bar.style.display = 'flex';
    // Reset team cat grid
    const g = document.getElementById('lp-team-cat-grid');
    if (g) g.style.display = '';
    // Always restore team overview sections when returning to overview panel
    const teamHeaderWrap = document.querySelector('.lp-team-header-wrap');
    if (teamHeaderWrap) teamHeaderWrap.style.display = '';
    ['roster','coaches','info','players','history','random'].forEach(s => {
      const sec = document.getElementById('lp-tsec-' + s);
      if (sec) sec.classList.add('hidden');
    });
    lpShowPanel('lp-panel-4-team');
    return;
  }
}

function lpEnterPath(path) {
  _lpPath = path;
  // Update toggle bar
  const bar = document.getElementById('lp-toggle-bar');
  if (bar) bar.style.display = 'flex';
  document.getElementById('lp-toggle-league').classList.toggle('active', path === 'league');
  document.getElementById('lp-toggle-team').classList.toggle('active', path === 'team');
  if (path === 'team') {
    // Team Mastery: pick team first
    lpGoPanel(3, 'team');
    lpUpdateJazzMastery();
  } else {
    // League Knowledge: pick content type first
    const t = document.getElementById('lp-panel-2-title');
    if (t) t.textContent = 'League Knowledge — Study Type';
    lpGoPanel(2);
  }
}

function lpSwitchPath(path) {
  if (_lpPath === path) return;
  _lpPath = path;
  document.getElementById('lp-toggle-league').classList.toggle('active', path === 'league');
  document.getElementById('lp-toggle-team').classList.toggle('active', path === 'team');
  if (path === 'team') {
    // Switch to Team Mastery: go to team picker first
    lpGoPanel(3, 'team');
    lpUpdateJazzMastery();
  } else {
    // Switch to League Knowledge: go to content picker
    const t = document.getElementById('lp-panel-2-title');
    if (t) t.textContent = 'League Knowledge — Study Type';
    // Reset cat state
    const g = document.getElementById('lp-league-cat-grid');
    if (g) g.style.display = '';
    ['roster','coaches','players','history','random'].forEach(s => {
      const sec = document.getElementById('lp-lsec-' + s);
      if (sec) sec.classList.add('hidden');
    });
    lpGoPanel(2);
  }
}

function lpSelectContent(contentType) {
  _lpContent = contentType;
  if (contentType === 'flashcards') {
    if (_lpPath === 'league') {
      lpGoPanel(3, 'league');
    } else {
      // Team Mastery: team already chosen, go straight to difficulty panel
      lpGoPanel(4);
      lpUpdateJazzMastery();
    }
  }
  // Quizzes and Games are coming soon — no action
}

function lpSelectTeamNew(teamId, teamName, leagueId) {
  _lpTeam = teamId;
  window._lpTeamName   = teamName;
  window._lpLeagueId   = leagueId;
  // Set active team data
  if (teamId === 'mavs') {
    _activeTeam   = MAVS_TEAM;
    _activeRoster = MAVS_ROSTER;
    _activeLineup = MAVS_STARTING_LINEUP;
  } else if (teamId === 'nuggets') {
    _activeTeam   = NUGGETS_TEAM;
    _activeRoster = NUGGETS_ROSTER;
    _activeLineup = NUGGETS_STARTING_LINEUP;
  } else if (teamId === 'rockets') {
    _activeTeam   = ROCKETS_TEAM;
    _activeRoster = ROCKETS_ROSTER;
    _activeLineup = ROCKETS_STARTING_LINEUP;
  } else if (teamId === 'gsw') {
    _activeTeam   = GSW_TEAM;
    _activeRoster = GSW_ROSTER;
    _activeLineup = GSW_STARTING_LINEUP;
  } else if (teamId === 'clippers') {
    _activeTeam   = CLIPPERS_TEAM;
    _activeRoster = CLIPPERS_ROSTER;
    _activeLineup = CLIPPERS_STARTING_LINEUP;
  } else if (teamId === 'lakers') {
    _activeTeam   = LAKERS_TEAM;
    _activeRoster = LAKERS_ROSTER;
    _activeLineup = LAKERS_STARTING_LINEUP;
  } else if (teamId === 'grizzlies') {
    _activeTeam   = GRIZZLIES_TEAM;
    _activeRoster = GRIZZLIES_ROSTER;
    _activeLineup = GRIZZLIES_STARTING_LINEUP;
  } else if (teamId === 'twolves') {
    _activeTeam   = TWOLVES_TEAM;
    _activeRoster = TWOLVES_ROSTER;
    _activeLineup = TWOLVES_STARTING_LINEUP;
  } else if (teamId === 'pelicans') {
    _activeTeam   = PELICANS_TEAM;
    _activeRoster = PELICANS_ROSTER;
    _activeLineup = PELICANS_STARTING_LINEUP;
  } else if (teamId === 'okc') {
    _activeTeam   = OKC_TEAM;
    _activeRoster = OKC_ROSTER;
    _activeLineup = OKC_STARTING_LINEUP;
  } else if (teamId === 'suns') {
    _activeTeam   = SUNS_TEAM;
    _activeRoster = SUNS_ROSTER;
    _activeLineup = SUNS_STARTING_LINEUP;
  } else if (teamId === 'blazers') {
    _activeTeam   = BLAZERS_TEAM;
    _activeRoster = BLAZERS_ROSTER;
    _activeLineup = BLAZERS_STARTING_LINEUP;
  } else if (teamId === 'kings') {
    _activeTeam   = KINGS_TEAM;
    _activeRoster = KINGS_ROSTER;
    _activeLineup = KINGS_STARTING_LINEUP;
  } else if (teamId === 'spurs') {
    _activeTeam   = SPURS_TEAM;
    _activeRoster = SPURS_ROSTER;
    _activeLineup = SPURS_STARTING_LINEUP;
  } else if (teamId === 'hawks') {
    _activeTeam   = HAWKS_TEAM;
    _activeRoster = HAWKS_ROSTER;
    _activeLineup = HAWKS_STARTING_LINEUP;
  } else if (teamId === 'celtics') {
    _activeTeam   = CELTICS_TEAM;
    _activeRoster = CELTICS_ROSTER;
    _activeLineup = CELTICS_STARTING_LINEUP;
  } else if (teamId === 'nets') {
    _activeTeam   = NETS_TEAM;
    _activeRoster = NETS_ROSTER;
    _activeLineup = NETS_STARTING_LINEUP;
  } else if (teamId === 'hornets') {
    _activeTeam   = HORNETS_TEAM;
    _activeRoster = HORNETS_ROSTER;
    _activeLineup = HORNETS_STARTING_LINEUP;
  } else if (teamId === 'bulls') {
    _activeTeam   = BULLS_TEAM;
    _activeRoster = BULLS_ROSTER;
    _activeLineup = BULLS_STARTING_LINEUP;
  } else if (teamId === 'cavs') {
    _activeTeam   = CAVS_TEAM;
    _activeRoster = CAVS_ROSTER;
    _activeLineup = CAVS_STARTING_LINEUP;
  } else if (teamId === 'pistons') {
    _activeTeam   = PISTONS_TEAM;
    _activeRoster = PISTONS_ROSTER;
    _activeLineup = PISTONS_STARTING_LINEUP;
  } else if (teamId === 'pacers') {
    _activeTeam   = PACERS_TEAM;
    _activeRoster = PACERS_ROSTER;
    _activeLineup = PACERS_STARTING_LINEUP;
  } else if (teamId === 'heat') {
    _activeTeam   = HEAT_TEAM;
    _activeRoster = HEAT_ROSTER;
    _activeLineup = HEAT_STARTING_LINEUP;
  } else if (teamId === 'bucks') {
    _activeTeam   = BUCKS_TEAM;
    _activeRoster = BUCKS_ROSTER;
    _activeLineup = BUCKS_STARTING_LINEUP;
  } else if (teamId === 'knicks') {
    _activeTeam   = KNICKS_TEAM;
    _activeRoster = KNICKS_ROSTER;
    _activeLineup = KNICKS_STARTING_LINEUP;
  } else if (teamId === 'magic') {
    _activeTeam   = MAGIC_TEAM;
    _activeRoster = MAGIC_ROSTER;
    _activeLineup = MAGIC_STARTING_LINEUP;
  } else if (teamId === 'sixers') {
    _activeTeam   = SIXERS_TEAM;
    _activeRoster = SIXERS_ROSTER;
    _activeLineup = SIXERS_STARTING_LINEUP;
  } else if (teamId === 'raptors') {
    _activeTeam   = RAPTORS_TEAM;
    _activeRoster = RAPTORS_ROSTER;
    _activeLineup = RAPTORS_STARTING_LINEUP;
  } else if (teamId === 'wizards') {
    _activeTeam   = WIZARDS_TEAM;
    _activeRoster = WIZARDS_ROSTER;
    _activeLineup = WIZARDS_STARTING_LINEUP;
  } else {
    _activeTeam   = TEST_TEAM;
    _activeRoster = TEST_ROSTER;
    _activeLineup = JAZZ_STARTING_LINEUP;
  }
  // Update panel 4 header
  const tipName = document.getElementById('lp-tip-name');
  if (tipName) tipName.textContent = teamName;
  // Update snapshot row
  const snapArena  = document.getElementById('lp-snap-arena');
  const snapCoach  = document.getElementById('lp-snap-coach');
  const snapConf   = document.getElementById('lp-snap-conf');
  const snapTitles = document.getElementById('lp-snap-titles');
  const snapBest   = document.getElementById('lp-snap-best');
  const snapPlayers = document.getElementById('lp-snap-players');
  if (snapArena)   snapArena.textContent   = _activeTeam.arena;
  if (snapCoach)   snapCoach.textContent   = _activeTeam.coach;
  if (snapConf)    snapConf.textContent    = _activeTeam.conference;
  if (snapTitles)  snapTitles.textContent  = _activeTeam.championships;
  if (snapBest)    snapBest.textContent    = Object.values(_activeLineup)[2] || '';
  if (snapPlayers) snapPlayers.textContent = _activeRoster.length || Array.from(_activeRoster).length;
  // Legacy compat
  const nameEl = document.getElementById('lp-ts-name');
  const iconEl = document.getElementById('lp-ts-icon');
  if (nameEl) nameEl.textContent = teamName;
  if (iconEl) iconEl.textContent = '🏀';
  const t4 = document.getElementById('lp-panel-4-title');
  if (t4) t4.textContent = teamName + ' — Flashcards';
  lpUpdateJazzMastery();
  const t2 = document.getElementById('lp-panel-2-title');
  if (t2) t2.textContent = teamName + ' — Study Type';
  lpGoPanel(2);
}

function lpLaunchMode(path, mode) {
  if (mode === 'dpOpen') {
    dpOpen('nba');
    return;
  }
  // Capture which panel launched this session so we can return correctly
  if (path === 'league') {
    let leagueCat = null;
    ['roster','coaches','players','history','random'].forEach(function(s) {
      const sec = document.getElementById('lp-lsec-' + s);
      if (sec && !sec.classList.contains('hidden')) leagueCat = s;
    });
    // Also capture the active tier tab id so we can restore it on exit
    let tierTabId = null;
    if (leagueCat) {
      const sec = document.getElementById('lp-lsec-' + leagueCat);
      if (sec) {
        const activeTab = sec.querySelector('.lp-tier-tab.active');
        if (activeTab) tierTabId = activeTab.id;
      }
    }
    setSessionReturnTarget({ path: 'league', leagueCat: leagueCat, tierTabId: tierTabId });
  } else if (path === 'team') {
    let teamCat = null;
    ['roster','coaches','info','players','history','random'].forEach(function(s) {
      const sec = document.getElementById('lp-tsec-' + s);
      if (sec && !sec.classList.contains('hidden')) teamCat = s;
    });
    // Also capture the active tier tab id so we can restore it on exit
    let tierTabId = null;
    if (teamCat) {
      const sec = document.getElementById('lp-tsec-' + teamCat);
      if (sec) {
        const activeTab = sec.querySelector('.lp-tier-tab.active');
        if (activeTab) tierTabId = activeTab.id;
      }
    }
    setSessionReturnTarget({ path: 'team', teamCat: teamCat, tierTabId: tierTabId });
  }
  // Map to existing startMode keys
  startMode(mode);
}

function lpSelectTier(scope, tier) {
  // scope: 'league' | 'team'
  const prefix = scope === 'league' ? 'lp-ltab-' : 'lp-ttab-';
  const panelPrefix = scope === 'league' ? 'lp-lpanel-' : 'lp-tpanel-';
  const tiers = ['rookie','starter','allstar','hof'];
  tiers.forEach(t => {
    const tab = document.getElementById(prefix + t);
    const panel = document.getElementById(panelPrefix + t);
    const isActive = t === tier;
    if (tab) tab.classList.toggle('active', isActive);
    if (panel) panel.classList.toggle('hidden', !isActive);
  });
}

function lpToggleAcc(id) {
  const acc = document.getElementById('lp-acc-' + id);
  if (!acc) return;
  const body = acc.querySelector('.lp-acc-body');
  const chevron = acc.querySelector('.lp-acc-chevron');
  if (!body) return;
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
  acc.classList.toggle('lp-acc-open', !isOpen);
}

// ── Category-first navigation ──

// Jazz roster for the dropdown
const JAZZ_ROSTER_DISPLAY = [
  { name:'Keyonte George',    num:'3',  pos:'PG'  },
  { name:'Ace Bailey',        num:'19', pos:'G/F'  },
  { name:'Lauri Markkanen',   num:'23', pos:'SF'  },
  { name:'Jaren Jackson Jr.', num:'20', pos:'F/C' },
  { name:'Walker Kessler',    num:'24', pos:'C'   },
  { name:'Isaiah Collier',    num:'8',  pos:'PG'  },
  { name:'Brice Sensabaugh',  num:'28', pos:'SF'  },
  { name:'Svi Mykhailiuk',    num:'10', pos:'G/F' },
  { name:'Kyle Filipowski',   num:'22', pos:'F/C' },
  { name:'Jusuf Nurkic',      num:'30', pos:'C'   },
];

function lpToggleConf(conf) {
  const teamsEl = document.getElementById('lp-conf-' + conf + '-teams');
  const chevEl  = document.getElementById('lp-conf-' + conf + '-chev');
  const cardEl  = document.getElementById('lp-conf-' + conf);
  if (!teamsEl) return;
  const isOpen = !teamsEl.classList.contains('hidden');
  teamsEl.classList.toggle('hidden', isOpen);
  cardEl.classList.toggle('open', !isOpen);
}

// ── Random Session ──────────────────────────────────────────
// ============================================================
// =================== RANDOM MODE GENERATOR ==================
// ============================================================

// -- State --
let _randDeck     = [];
let _randIdx      = 0;
let _randCorrect  = 0;
let _randFlipped  = false;
let _randGenType  = 'mixed';   // which generator produced this session

// ── Card pool ──────────────────────────────────────────────
// Returns the full flat pool of all playable random cards.
// Each card: { prompt, answerLabel, answer, tag, type, entity }
function _buildRandPool() {
  // Produces exactly 69 cards matching all 5 Team Mastery categories:
  //   Roster (3) + Coaches (3) + Player Info (30) + Player Career (30) + Franchise Records (3)
  const pool = [];
  const activeRoster = (typeof _activeRoster !== 'undefined') ? Array.from(_activeRoster) : Array.from(ROSTER);
  const activeTeam   = (typeof _activeTeam   !== 'undefined') ? _activeTeam   : TEST_TEAM;
  const activeLineup = (typeof _activeLineup  !== 'undefined') ? _activeLineup  : JAZZ_STARTING_LINEUP;

  // ── PLAYER INFO (30 cards: Position × 10, Height × 10, Jersey × 10) ──────
  activeRoster.filter(p => p && p.name).forEach(p => {
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'Position', answer:getPosLabel(p), tag:'PLAYER', cat:'info' });
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'Height',   answer:p.height,       tag:'PLAYER', cat:'info' });
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'Jersey #', answer:'#'+p.jersey,   tag:'PLAYER', cat:'info' });
  });

  // ── PLAYER CAREER (30 cards: Past Teams × 10, College × 10, Draft Info × 10) ──
  activeRoster.filter(p => p && p.name).forEach(p => {
    const hasPast = Array.isArray(p.past_teams) && p.past_teams.length > 0;
    const pastAns = hasPast ? p.past_teams.map(t => t.team).join(', ') : 'None';
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'Past Teams', answer:pastAns,    tag:'PLAYER', cat:'players' });
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'College',    answer:p.college,  tag:'PLAYER', cat:'players' });
    const draftAns = (p.draft_pick === 'Undrafted' || p.draft_team === 'Undrafted' || !p.draft_year)
      ? 'Undrafted'
      : p.draft_year + ' · ' + p.draft_pick + ' · ' + getDraftTeamNickname(p.draft_team);
    pool.push({ type:'player', entity:p.name, prompt:p.name, answerLabel:'Draft Info', answer:draftAns, tag:'PLAYER', cat:'players' });
  });

  // ── ROSTER (3 cards: Best Player, Starting 5, Team Rotation) ─────────────
  const lineupVals = Object.values(activeLineup);
  const bestPlayer = (typeof TEAM_BEST_PLAYER !== 'undefined' && TEAM_BEST_PLAYER[activeTeam.name])
    ? TEAM_BEST_PLAYER[activeTeam.name]
    : lineupVals[0] || 'N/A';

  // Starting 5 — formatted as top10-list style answer
  const posOrder = ['PG','SG','SF','PF','C'];
  const starting5Rows = posOrder.map(slot => {
    const name = activeLineup[slot] || '—';
    return '<div class="top10-row"><span class="top10-pos">' + slot + '</span><span class="top10-player">' + name + '</span></div>';
  }).join('');
  const starting5Ans = '<div class="top10-list"><div class="top10-section-label">Starting 5</div>' + starting5Rows + '</div>';

  // Team Rotation — starters + bench
  const TEAM_ROTATIONS = {
    'Utah Jazz':            typeof JAZZ_ROTATION    !== 'undefined' ? JAZZ_ROTATION    : null,
    'Dallas Mavericks':     typeof MAVS_ROTATION    !== 'undefined' ? MAVS_ROTATION    : null,
    'Denver Nuggets':       typeof NUGGETS_ROTATION !== 'undefined' ? NUGGETS_ROTATION : null,
    'Golden State Warriors':typeof GSW_ROTATION     !== 'undefined' ? GSW_ROTATION     : null,
  };
  const rotationData = TEAM_ROTATIONS[activeTeam.name] || null;
  let rotationAns;
  if (rotationData) {
    const makeRows = (players) => players.map(p =>
      '<div class="top10-row"><span class="top10-pos">' + p.pos + '</span><span class="top10-player">' + p.name + '</span></div>'
    ).join('');
    rotationAns = '<div class="top10-list">' +
      '<div class="top10-section-label">Starters</div>' + makeRows(rotationData.starters) +
      '<div class="top10-section-label">Bench</div>'   + makeRows(rotationData.bench) +
      '</div>';
  } else {
    rotationAns = starting5Ans; // fallback for teams without rotation data
  }

  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'Best Player',  answer:bestPlayer,    tag:'TEAM', cat:'roster', hint:'roster' });
  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'Starting 5',   answer:starting5Ans,  tag:'TEAM', cat:'roster', hint:'__LINEUP__' });
  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'Team Rotation', answer:rotationAns,  tag:'TEAM', cat:'roster', hint:'__LINEUP__' });

  // ── COACHES (3 cards: Head Coach, Coach Since, Coaching Staff) ────────────
  let staffAns = activeTeam.coach;
  if (typeof TEAM_COACHING_STAFF !== 'undefined' && TEAM_COACHING_STAFF[activeTeam.name]) {
    const staff = TEAM_COACHING_STAFF[activeTeam.name];
    const headLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;">Head Coach</span>';
    const headRow   = '<div class="back-career-entry"><span class="back-career-team" style="font-size:20px;font-weight:600;">' + staff.head + '</span></div>';
    const assistLbl = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:8px;margin-bottom:2px;">Assistants</span>';
    const assistRows = staff.assistants.map(a =>
      '<div class="back-career-entry"><span class="back-career-team" style="font-size:18px;font-weight:500;">' + a + '</span></div>'
    ).join('');
    staffAns = '<div class="back-career-block" style="gap:6px;">' + headLabel + headRow + assistLbl + assistRows + '</div>';
  }
  const coachPrev = activeTeam.coachPrevTeam;
  let coachPrevAns;
  if (!coachPrev || coachPrev === 'None' || (coachPrev.team && coachPrev.team === 'None')) {
    coachPrevAns = 'First NBA HC job';
  } else if (typeof coachPrev === 'object' && coachPrev.team) {
    coachPrevAns = coachPrev.team + ' (' + coachPrev.role + ')';
  } else {
    coachPrevAns = String(coachPrev);
  }

  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.coach || activeTeam.name, answerLabel:'Head Coach',      answer:activeTeam.coach,             tag:'TEAM', cat:'coaches' });
  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.coach || activeTeam.name, answerLabel:'Coach Since',      answer:activeTeam.coachSince || 'N/A', tag:'TEAM', cat:'coaches' });
  pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name,                     answerLabel:'Coaching Staff',   answer:staffAns,                     tag:'TEAM', cat:'coaches' });

  // ── FRANCHISE RECORDS (3 cards) ───────────────────────────────────────────
  if (typeof TEAM_ALL_TIME_REBOUNDS_LEADER !== 'undefined' && TEAM_ALL_TIME_REBOUNDS_LEADER[activeTeam.name]) {
    const r = TEAM_ALL_TIME_REBOUNDS_LEADER[activeTeam.name];
    pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'All-Time Rebounds Leader', answer:r.name + ' (' + r.stat + ')', tag:'TEAM', cat:'history' });
  }
  if (typeof TEAM_ALL_TIME_ASSISTS !== 'undefined' && TEAM_ALL_TIME_ASSISTS[activeTeam.name]) {
    const r = TEAM_ALL_TIME_ASSISTS[activeTeam.name];
    pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'All-Time Assists Leader', answer:r.name + ' (' + r.stat + ')', tag:'TEAM', cat:'history' });
  }
  if (typeof TEAM_ALL_TIME_SCORER !== 'undefined' && TEAM_ALL_TIME_SCORER[activeTeam.name]) {
    const r = TEAM_ALL_TIME_SCORER[activeTeam.name];
    pool.push({ type:'team', entity:activeTeam.name, prompt:activeTeam.name, answerLabel:'All-Time Scorer', answer:r.name + ' (' + r.stat + ')', tag:'TEAM', cat:'history' });
  }

  return pool;
}

// ── Difficulty scoring ──────────────────────────────────────
// cardKey = `${entity}::${answerLabel}` — lightweight id for per-card tracking
function _cardKey(card) { return card.entity + '::' + card.answerLabel; }

function _getCardDifficulty(card) {
  const key  = _cardKey(card);
  const raw  = _randStats[key] || {};
  const att  = raw.attempts || 0;
  const cor  = raw.correct  || 0;
  const acc  = att > 0 ? cor / att : 0;
  const missWeight  = 1 - acc;
  const unseenBoost = att === 0 ? 0.35 : 0;
  return missWeight + unseenBoost;
}

// Per-card stats tracked across sessions (persisted in localStorage)
let _randStats = {};
function _loadRandStats() {
  try { _randStats = JSON.parse(localStorage.getItem('siq_rand_stats') || '{}'); } catch(e) { _randStats = {}; }
}
function _saveRandStats() {
  try { localStorage.setItem('siq_rand_stats', JSON.stringify(_randStats)); } catch(e) {}
}
function _recordRandResult(card, correct) {
  const k = _cardKey(card);
  if (!_randStats[k]) _randStats[k] = { attempts:0, correct:0 };
  _randStats[k].attempts++;
  if (correct) _randStats[k].correct++;
  _saveRandStats();
}
_loadRandStats();

// ── Anti-repeat filter ──────────────────────────────────────
// Ensures no same entity back-to-back and limits same-category clusters.
function _antiRepeat(cards, entityWindow = 3, catWindow = 2) {
  const result   = [];
  const recentEntities = [];
  const recentCats     = [];

  const remaining = [...cards];
  while (remaining.length > 0) {
    // Find first card that doesn't repeat entity or cat
    const idx = remaining.findIndex(c =>
      !recentEntities.slice(-entityWindow).includes(c.entity) &&
      !recentCats.slice(-catWindow).includes(c.cat)
    );
    const pick = idx >= 0 ? remaining.splice(idx, 1)[0] : remaining.splice(0, 1)[0];
    result.push(pick);
    recentEntities.push(pick.entity);
    recentCats.push(pick.cat);
  }
  return result;
}

// ── Seeded RNG (for Daily Challenge) ───────────────────────
function _seededRng(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}
function _seededShuffle(arr, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function _getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// ── Shuffle helper ──────────────────────────────────────────
function _shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Generators ─────────────────────────────────────────────

// 1) Mixed Chaos — broad mix, lightly biased toward weak cards, anti-repeat
function generateMixedRun() {
  const pool = _buildRandPool();
  // Shuffle the full pool — all 69 cards, no cap
  const shuffled = _shuffle(pool);
  // Deduplicate by key (keep all unique cards)
  const seen = new Set();
  const deduped = [];
  for (const c of shuffled) {
    const k = _cardKey(c);
    if (!seen.has(k)) { seen.add(k); deduped.push(c); }
  }
  return _antiRepeat(deduped);
}

// 2) Weak Spot Trainer — sorts by difficulty desc, injects easier every 4th
function generateWeakSpotsRun() {
  const pool = _buildRandPool();
  const scored = pool.map(c => ({ card:c, diff: _getCardDifficulty(c) }));
  scored.sort((a, b) => b.diff - a.diff);

  // Take top 16 hardest (deduplicated)
  const seen = new Set();
  const hard = [];
  for (const { card } of scored) {
    const k = _cardKey(card);
    if (!seen.has(k)) { seen.add(k); hard.push(card); }
    if (hard.length >= 16) break;
  }

  // Every 4th card, inject an "easy" (high accuracy) card for pacing
  const easy = pool
    .map(c => ({ card:c, diff: _getCardDifficulty(c) }))
    .filter(x => !seen.has(_cardKey(x.card)))
    .sort((a,b) => a.diff - b.diff)
    .slice(0, 4)
    .map(x => x.card);

  const result = [];
  hard.forEach((c, i) => {
    result.push(c);
    if ((i + 1) % 4 === 0 && easy.length) result.push(easy.shift());
  });
  return _antiRepeat(result, 2, 2);
}

// 3) Daily Challenge — deterministic, same run all day, score saved
function generateDailyRun() {
  const seed = _getDailySeed();
  const rng  = _seededRng(seed);
  const pool = _buildRandPool();
  const shuffled = _seededShuffle(pool, rng);
  // Deduplicate, take 15
  const seen = new Set();
  const deck = [];
  for (const c of shuffled) {
    const k = _cardKey(c);
    if (!seen.has(k)) { seen.add(k); deck.push(c); }
    if (deck.length >= 15) break;
  }
  return deck; // intentional order — no final shuffle
}

// ── Generator registry ──────────────────────────────────────
const RANDOM_GENERATORS = {
  mixed:     { fn: generateMixedRun,    name: 'Random Mode',       emoji: '🎲', length: 69, color: 'chaos' },
  weakSpots: { fn: generateWeakSpotsRun, name: 'Weak Spot Trainer', emoji: '🎯', length: 16, color: 'weak'  },
  daily:     { fn: generateDailyRun,    name: 'Daily Challenge',   emoji: '📅', length: 15, color: 'daily' },
};

// ── Main entry point ────────────────────────────────────────
function startGeneratedMode(type, fromPath) {
  // Store return target with originating path so exit goes back to correct section
  const returnPath = fromPath || 'league';
  setSessionReturnTarget({ path: 'random', fromPath: returnPath });
  const gen = RANDOM_GENERATORS[type];
  if (!gen) { console.error('Unknown generator:', type); return; }

  _randGenType = type;
  const deck   = gen.fn();
  _randDeck    = deck;
  _randIdx     = 0;
  _randCorrect = 0;
  _randFlipped = false;

  // ── Use the standard #flashcards page shell ──────────────
  // Reset shared session state vars so flipCard / answerCard guards behave
  isFlipped = false; cardAnswered = false; isFlipping = false; mcSelected = null;
  fcStreak = 0; fcBestStreak = 0; fcCorrectCount = 0;
  _fcReversed = false;
  const reverseBtn = document.getElementById('fcReverseBtn');
  if (reverseBtn) reverseBtn.style.display = 'none'; // hide reverse — not applicable for random

  // Set mode title in fc header
  const gen2 = RANDOM_GENERATORS[type];
  document.getElementById('fcModeTitle').textContent = gen2.emoji + ' ' + gen2.name;

  // Hide mc/lineup modes, show card + standard answer buttons
  document.getElementById('cardScene').style.display   = '';
  const _rc = document.getElementById('roundComplete');
  _rc.classList.remove('show'); _rc.style.display = '';
  document.getElementById('lineupMode').style.display  = 'none';
  document.getElementById('roundComplete').classList.remove('show');

  // Wire answer buttons to lpRandAnswer instead of answerCard
  const answerBtns = document.getElementById('answerBtns');
  answerBtns.style.display = '';
  // Replace onclick inline — use dataset flag instead
  document.getElementById('answerBtns').dataset.randMode = '1';

  // Update progress count
  document.getElementById('fcTotal').textContent   = _randDeck.length;
  document.getElementById('fcCurrent').textContent = '1';
  document.getElementById('fcProgressBar').style.width = '0%';

  // Update streak badge hidden (random doesn't track streak the same way)
  const badge = document.getElementById('fcStreakBadge');
  if (badge) badge.style.display = 'none';

  // Navigate to the flashcards page
  showPage('flashcards');

  // Render first card
  _lpRandRenderCard();
}

// ── lpStartRandom (legacy alias — maps to mixed) ────────────
function lpStartRandom() { startGeneratedMode('mixed','team'); }

function _lpRandTotal() { return _randDeck.length; }

// ── Render a random card into the standard flashcard elements ─
function _lpRandRenderCard() {
  if (_randIdx >= _lpRandTotal()) { _lpRandShowComplete(); return; }

  const card = _randDeck[_randIdx];
  const total = _lpRandTotal();

  // ── Progress (fc-header elements) ──────────────────────────
  document.getElementById('fcCurrent').textContent  = _randIdx + 1;
  document.getElementById('fcTotal').textContent    = total;
  const pct = (_randIdx / total) * 100;
  document.getElementById('fcProgressBar').style.width = pct + '%';

  // ── Reset card to front face (same pattern as loadCard) ────
  isFlipped = false; cardAnswered = false; isFlipping = false;
  const c3d = document.getElementById('card3d');
  c3d.style.transition = 'none';
  c3d.classList.remove('flipped');
  void c3d.offsetWidth;
  c3d.style.transition = '';

  // ── Front face: one big integrated question ─────────────────
  const photoEl    = document.getElementById('playerPhoto');
  const overlayEl  = document.getElementById('photoOverlay');
  const frontTextEl = document.getElementById('cardFrontText');
  photoEl.style.display    = 'none';
  overlayEl.style.display  = 'none';
  frontTextEl.style.display = '';

  // Build a natural question that bakes the entity name in
  const name = card.entity;
  const label = card.answerLabel;
  let question;
  if (card.type === 'player') {
    const playerQ = {
      'Team':        `Which team does <em>${name}</em> play for?`,
      'Position':    `What position does <em>${name}</em> play?`,
      'Jersey #':    `What is <em>${name}'s</em> jersey number?`,
      'Height':      `How tall is <em>${name}</em>?`,
      'College':     `Where did <em>${name}</em> go to college?`,
      'Past Teams':  `What teams did <em>${name}</em> play for before the ${(typeof _activeTeam !== 'undefined' ? _activeTeam.name.split(' ').pop() : 'team')}?`,
      'Draft Info':  `What were <em>${name}'s</em> draft year, pick, and team?`,
    };
    question = playerQ[label] || `What is <em>${name}'s</em> ${label}?`;
  } else {
    const teamQ = {
      'Conference':               `What conference are the <em>${name}</em> in?`,
      'Division':                 `What division are the <em>${name}</em> in?`,
      'Arena':                    `What arena do the <em>${name}</em> play in?`,
      'Head Coach':               `Who is the head coach of the <em>${name}</em>?`,
      'City':                     `What city do the <em>${name}</em> play in?`,
      'Mascot':                   `What is the <em>${name}</em> mascot?`,
      'Best Player':              `Who is the best player on the <em>${name}</em>?`,
      'Coach Since':              `What year did the <em>${name}</em> head coach take over?`,
      'All-Time Rebounds Leader': `Who is the <em>${name}</em> all-time rebounds leader?`,
      'All-Time Assists Leader':  `Who is the <em>${name}</em> all-time assists leader?`,
      'All-Time Scorer':          `Who is the <em>${name}</em> all-time leading scorer?`,
      'Starting 5':               `What is the <em>${name}</em> starting lineup?`,
      'Team Rotation':            `What is the <em>${name}</em> 10-player rotation?`,
      'Coaching Staff':           `Who are the <em>${name}</em> coaching staff?`,
    };
    question = teamQ[label] || `What is the <em>${name}</em> ${label}?`;
  }

  frontTextEl.innerHTML = `<div class="rand-front-question">${question}</div>`;

  // ── Back face: just the answer, big and clean ───────────────
  const backPhotoEl = document.getElementById('backPhoto');
  backPhotoEl.src = '';
  backPhotoEl.style.display = 'none';
  const backNameEl  = document.getElementById('backName');
  const cardBackEl  = document.querySelector('.card-back');
  document.getElementById('backPos').textContent  = '';
  document.getElementById('backStats').innerHTML  = '';

  // Lineup/rotation cards use top10 centered layout; everything else uses rand-center
  if (cardBackEl) {
    cardBackEl.classList.remove('card-back--list','card-back--centered-list','card-back--draft','card-back--top10','card-back--rand-center');
    if (card.hint === '__LINEUP__') {
      cardBackEl.classList.add('card-back--top10');
      backNameEl.className   = 'back-name';
      backNameEl.style.width = '100%';
      backNameEl.innerHTML   = card.answer;
    } else {
      cardBackEl.classList.add('card-back--rand-center');
      backNameEl.className   = 'back-name';
      backNameEl.style.width = '';
      // Use career-block HTML for coaching staff / complex HTML answers
      const isHTML = typeof card.answer === 'string' && card.answer.startsWith('<');
      backNameEl.innerHTML = isHTML ? card.answer : `<div class="rand-back-answer">${card.answer}</div>`;
    }
  }

  // ── Answer buttons: locked until flip ──────────────────────
  const btns = document.getElementById('answerBtns');
  btns.classList.add('answer-btns-hidden', 'answer-btns-locked');

  // ── Entering animation ──────────────────────────────────────
  const scene = document.getElementById('cardScene');
  scene.classList.remove('entering');
  void scene.offsetWidth;
  scene.classList.add('entering');
}

// ── flipCard already handles the flip — it just needs to know ─
// we're in random mode (answerBtns.dataset.randMode = '1') so   ─
// it unlocks the right buttons. No change needed to flipCard.   ─

function lpRandAnswer(correct) {
  // Guard: only accept if card has been flipped and not already answered
  if (!isFlipped || cardAnswered || isFlipping) return;
  cardAnswered = true;

  _recordRandResult(_randDeck[_randIdx], correct);
  if (correct) { _randCorrect++; xpAward(2); }

  // Accuracy feedback flash
  const flash = document.getElementById('feedbackFlash');
  if (flash) {
    flash.className = 'feedback-flash ' + (correct ? 'show-got' : 'show-miss');
    setTimeout(() => { flash.className = 'feedback-flash'; }, 380);
  }

  // Unflip, then advance
  isFlipping = true;
  document.getElementById('card3d').classList.remove('flipped');
  _randIdx++;
  setTimeout(() => { isFlipping = false; _lpRandRenderCard(); }, 500);
}

function lpRandSkip() {
  if (cardAnswered || isFlipping) return;
  cardAnswered = true;
  isFlipping = true;
  document.getElementById('card3d').classList.remove('flipped');
  _randIdx++;
  setTimeout(() => { isFlipping = false; _lpRandRenderCard(); }, 500);
}

// ── Daily persistence ───────────────────────────────────────
function _todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function _getDailyBest() {
  try { return JSON.parse(localStorage.getItem('siq_daily_best') || 'null'); } catch(e) { return null; }
}
function _saveDailyBest(score, total) {
  try {
    localStorage.setItem('siq_daily_best', JSON.stringify({ date: _todayKey(), score, total, pct: Math.round(score/total*100) }));
  } catch(e) {}
}

function _lpRandShowComplete() {
  const total = _lpRandTotal();
  const pct   = total > 0 ? Math.round(_randCorrect / total * 100) : 0;

  // Hide card area, show round-complete inside #flashcards
  document.getElementById('cardScene').style.display  = 'none';
  document.getElementById('answerBtns').style.display = 'none';

  // Fill standard round-complete elements
  const trophy = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : '💪';
  const gen    = RANDOM_GENERATORS[_randGenType] || {};
  const title  = pct >= 90 ? 'Incredible!' : pct >= 70 ? (gen.name + ' Complete!') : 'Keep Training!';

  document.getElementById('rcTrophy').textContent        = trophy;
  document.getElementById('rcTitle').textContent         = title;
  document.getElementById('rcCorrect').textContent       = `${_randCorrect} / ${total}`;
  document.getElementById('rcIncorrect').textContent     = `${total - _randCorrect} / ${total}`;
  document.getElementById('rcAccuracy').textContent      = pct + '%';
  document.getElementById('rcBestStreak').textContent    = '—'; // random doesn't track streak

  // Daily: save + show prior best
  const dailyRow = document.getElementById('rcDailyRow');
  if (_randGenType === 'daily') {
    const prev = _getDailyBest();
    _saveDailyBest(_randCorrect, total);
    dailyRow.style.display = '';
    dailyRow.textContent = prev && prev.date === _todayKey()
      ? `Previous best today: ${prev.score}/${prev.total} (${prev.pct}%)`
      : "📅 Today's score saved!";
    _updateDailyHub();
  } else {
    dailyRow.style.display = 'none';
  }

  // Back button goes to random hub
  const backBtn = document.getElementById('rcBackBtn');
  if (backBtn) {
    backBtn.textContent = '← Back to Random';
    backBtn.onclick = goBackToSessionModes;
  }

  document.getElementById('roundComplete').classList.add('show');
}

function lpRandomRestart() {
  startGeneratedMode(_randGenType);
}

function lpRandomReset() {
  // Clean up random-mode-specific overrides on shared #flashcards elements
  delete document.getElementById('answerBtns').dataset.randMode;
  // Restore elements hidden by startGeneratedMode
  const reverseBtn = document.getElementById('fcReverseBtn');
  if (reverseBtn) reverseBtn.style.display = '';
  const badge = document.getElementById('fcStreakBadge');
  if (badge) badge.style.display = '';
  // Restore cardScene and answerBtns to default visible state
  const _rc = document.getElementById('roundComplete');
  _rc.classList.remove('show'); _rc.style.display = '';
  document.getElementById('answerBtns').style.display = '';
  // Remove round-complete so next standard mode starts clean
  document.getElementById('roundComplete').classList.remove('show');
  // Reset round-complete back button to standard behavior
  const backBtn = document.getElementById('rcBackBtn');
  if (backBtn) { backBtn.textContent = '← Back to Modes'; backBtn.onclick = goBackToSessionModes; }
  // Hide daily row
  const dailyRow = document.getElementById('rcDailyRow');
  if (dailyRow) dailyRow.style.display = 'none';
  // Clear mode title
  const modeTitle = document.getElementById('fcModeTitle');
  if (modeTitle) modeTitle.textContent = '';
  // Reset rcBestStreak display (random uses '—', restore to numeric)
  const rcStreak = document.getElementById('rcBestStreak');
  if (rcStreak) rcStreak.textContent = '0';
  _updateDailyHub();
}

// ── Update hub card UI based on daily state ─────────────────
function _updateDailyHub() {
  const card  = document.getElementById('rgen-daily-card');
  const badge = document.getElementById('rgen-daily-badge');
  const meta  = document.getElementById('rgen-daily-meta');
  const play  = document.getElementById('rgen-daily-play');
  if (!card) return;

  const best = _getDailyBest();
  const doneToday = best && best.date === _todayKey();

  if (doneToday) {
    card.classList.add('daily-done');
    if (badge) badge.textContent = '✓ DONE';
    if (meta)  meta.textContent  = `Best today: ${best.score}/${best.total} · ${best.pct}%`;
    if (play)  play.textContent  = '▶ Retry';
  } else {
    card.classList.remove('daily-done');
    if (badge) badge.textContent = 'DAILY';
    if (meta)  meta.textContent  = '15 cards · Resets at midnight';
    if (play)  play.textContent  = '▶ Play';
  }
}

// ── Legacy compat shims ─────────────────────────────────────
function lpRandPickLen() { /* no-op — length is now per-generator */ }

// ============================================================
// ================ END RANDOM MODE GENERATOR =================
// ============================================================

function lpSelectLeagueCat(cat) {
  // Flat layout — categories removed; this is a no-op kept for compatibility
}

function lpCloseCat(scope) {
  if (scope === 'league') {
    // Flat layout — nothing to close; kept for compatibility
  } else {
    // Remove cat-open flag so the outer panel back button is restored
    const teamPanel = document.getElementById('lp-panel-4-team');
    if (teamPanel) teamPanel.classList.remove('lp-panel--cat-open');
    const grid = document.getElementById('lp-team-cat-grid');
    if (grid) grid.style.display = '';
    // Restore team overview sections
    const teamHeaderWrap = document.querySelector('.lp-team-header-wrap');
    if (teamHeaderWrap) teamHeaderWrap.style.display = '';
    ['roster','coaches','info','players','history','random'].forEach(s => {
      const sec = document.getElementById('lp-tsec-' + s);
      if (sec) sec.classList.add('hidden');
    });
  }
}

function lpSelectTeamCat(cat) {
  // Mark the panel as having a cat section open (hides outer back btn)
  const teamPanel = document.getElementById('lp-panel-4-team');
  if (teamPanel) teamPanel.classList.add('lp-panel--cat-open');

  const grid = document.getElementById('lp-team-cat-grid');
  const sections = ['roster','coaches','info','players','history','random'];
  if (grid) grid.style.display = 'none';
  // Hide team overview sections — this is now a focused mode page
  const infoPanel = document.getElementById('lp-team-info-panel');
  const teamHeaderWrap = document.querySelector('.lp-team-header-wrap');
  if (infoPanel) infoPanel.closest('.lp-team-header-wrap') ? infoPanel.closest('.lp-team-header-wrap').style.display = 'none' : (infoPanel.style.display = 'none');
  if (teamHeaderWrap) teamHeaderWrap.style.display = 'none';
  sections.forEach(s => {
    const sec = document.getElementById('lp-tsec-' + s);
    if (sec) sec.classList.toggle('hidden', s !== cat);
  });
  // All tiers visible simultaneously — update dynamic card counts
  if (cat === 'info' || cat === 'players') {
    const n = Array.from(_activeRoster).filter(p => p && p.name).length;
    ['lp-info-count-pos','lp-info-count-height','lp-info-count-jersey',
     'lp-career-count-past','lp-career-count-college','lp-career-count-draft'].forEach(id => {
       const el = document.getElementById(id); if (el) el.textContent = n + ' cards';
    });
  }
}

// Generic: select a tier tab within a cat section (identified by sectionId)
// tierKey is the id suffix after 'lp-ltab-' or 'lp-ttab-'
function lpSelectCatTier(sectionId, tierKey) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const tabs = section.querySelectorAll('.lp-tier-tab');
  const panels = section.querySelectorAll('.lp-tier-panel');
  // Find which tab was clicked
  const clickedTab = document.getElementById('lp-ltab-' + tierKey) || document.getElementById('lp-ttab-' + tierKey);
  const tabArray = Array.from(tabs);
  const idx = tabArray.indexOf(clickedTab);
  tabs.forEach((t,i) => t.classList.toggle('active', i === idx));
  panels.forEach((p,i) => p.classList.toggle('hidden', i !== idx));
}

function lpUpdateJazzMastery() {
  try {
    const learnedSet = new Set();
    modes.filter(m => m !== 'lineup').forEach(m => {
      modeData[m].forEach((pd, i) => { if (isLearned(pd)) learnedSet.add(i); });
    });
    const learned = learnedSet.size;
    const pct = Math.round((learned / 18) * 100);
    const fillEl    = document.getElementById('lp-mastery-jazz-fill');
    const pctEl     = document.getElementById('lp-mastery-jazz-pct');
    const tsPct     = document.getElementById('lp-ts-pct');
    const progLabel = document.getElementById('lp-nba-progress');
    if (fillEl)    fillEl.style.width   = pct + '%';
    if (pctEl)     pctEl.textContent    = pct + '%';
    if (tsPct)     tsPct.textContent    = pct + '%';
    if (progLabel) progLabel.textContent = learned + ' / 10 Players Learned';
  } catch(e) {}
}


// --- Dashboard refresh ---
function bnUpdateDash() { refreshHome(); }

// ── Flashcard Reverse Toggle ──
let _fcReversed = false;

function fcToggleReverse() {
  _fcReversed = !_fcReversed;
  const btn = document.getElementById('fcReverseBtn');
  if (btn) btn.classList.toggle('active', _fcReversed);
  // Reset flip state so the new front face shows correctly
  isFlipped = false;
  cardAnswered = false;
  const c3d = document.getElementById('card3d');
  if (c3d) {
    c3d.style.transition = 'none';
    c3d.classList.remove('flipped');
    void c3d.offsetWidth;
    c3d.style.transition = '';
  }
  // Lock answer buttons again since we're back on the front
  const btns = document.getElementById('answerBtns');
  if (btns) btns.classList.add('answer-btns-hidden', 'answer-btns-locked');
  // Route to correct loader: session engine for deck-builder modes, legacy for old modes
  if (_sessionMode && typeof loadSessionCard === 'function') {
    loadSessionCard();
  } else if (typeof loadCard === 'function') {
    loadCard();
  }
}



// --- Leaderboard ---
const LB_GLOBAL = [
  { name:'HoopHead99',  xp:4820, icon:'🏀' },
  { name:'GridironKing',xp:3940, icon:'🏈' },
  { name:'BaseballIQ',  xp:3200, icon:'⚾' },
  { name:'PuckMaster',  xp:2750, icon:'🏒' },
  { name:'CourtVision', xp:2310, icon:'👁️' },
  { name:'YOU',         xp:0,    icon:'⭐', isMe:true },
  { name:'SportsBrain', xp:0,    icon:'🧠', belowMe:true },
  { name:'FantasyKing', xp:0,    icon:'👑', belowMe:true },
];

function lbSwitch(type, btn) {
  document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  lbRender(type);
}

function lbRender(type) {
  const el = document.getElementById('lbContent');
  if (!el) return;
  if (type === 'friends') {
    el.innerHTML = `<div class="lb-coming"><div class="lb-coming-icon">👥</div><div class="lb-coming-title">Friends Leaderboard</div><div>Coming soon — challenge your friends!</div></div>`;
    return;
  }
  const totalXp = xpGetTotal();
  let rows = JSON.parse(JSON.stringify(LB_GLOBAL));
  // inject real XP for "YOU"
  rows = rows.map(r => {
    if (r.isMe) r.xp = totalXp;
    if (r.belowMe) r.xp = Math.max(0, totalXp - Math.floor(Math.random()*80+20));
    return r;
  });
  if (type === 'weekly') {
    rows = rows.map(r => ({ ...r, xp: Math.floor(r.xp * 0.15) }));
  }
  rows.sort((a,b) => b.xp - a.xp);
  const rankClasses = ['gold','silver','bronze'];
  const rankEmojis = ['🥇','🥈','🥉'];
  el.innerHTML = rows.map((r,i) => {
    const rClass = rankClasses[i] || '';
    const rankDisplay = i < 3 ? rankEmojis[i] : (i+1);
    return `<div class="lb-row ${r.isMe?'me':''}">
      <div class="lb-rank ${rClass}">${rankDisplay}</div>
      <div class="lb-avatar" style="background:rgba(107,63,160,0.2)">${r.icon}</div>
      <div class="lb-info">
        <div class="lb-name">${r.isMe ? 'You' : r.name}</div>
        <div class="lb-xp-label">${type==='weekly'?'This week':'All time'}</div>
      </div>
      <div class="lb-xp-val">${r.xp.toLocaleString()} XP</div>
    </div>`;
  }).join('');
}

// --- Progress Page ---
function toggleProgSports() {
  const body  = document.getElementById('progSportsBody');
  const arrow = document.getElementById('progSportsArrow');
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  if (arrow) arrow.classList.toggle('open', !isOpen);
}

function progRender() {
  const totalXp = xpGetTotal();
  const { levelNum, level, nextLevel, pct } = xpGetLevel(totalXp);
  const el = id => document.getElementById(id);

  // ── Current Level card ──
  if (el('progLcNum'))  el('progLcNum').textContent  = levelNum;
  if (el('progLcName')) el('progLcName').textContent = level.name.toUpperCase();
  if (el('progLcTitle')) el('progLcTitle').textContent = level.title;
  if (el('progLcBarFill')) el('progLcBarFill').style.width = pct + '%';
  if (nextLevel) {
    const xpIntoLevel = totalXp - level.min;
    const xpNeeded    = nextLevel.min - level.min;
    if (el('progLcXpCur')) el('progLcXpCur').textContent = xpIntoLevel;
    if (el('progLcXpMax')) el('progLcXpMax').textContent = xpNeeded;
    if (el('progLcXpLabel')) el('progLcXpLabel').textContent = 'Progress to next level';
  } else {
    if (el('progLcXpLabel')) el('progLcXpLabel').textContent = 'MAX LEVEL REACHED';
    if (el('progLcXpCur')) el('progLcXpCur').textContent = totalXp;
    if (el('progLcXpMax')) el('progLcXpMax').textContent = '2500+';
  }

  // ── Next Milestone card ──
  const ms = el('progMilestoneCard');
  if (nextLevel) {
    const xpLeft = nextLevel.min - totalXp;
    if (el('progMsName')) el('progMsName').textContent = nextLevel.name.toUpperCase();
    if (el('progMsSub'))  el('progMsSub').textContent  = `Level ${levelNum + 1} · ${nextLevel.title}`;
    if (el('progMsXp'))   el('progMsXp').textContent   = xpLeft;
    if (ms) ms.style.display = '';
  } else {
    if (ms) ms.style.display = 'none';
  }

  // ── Level list rows ──
  for (let i = 1; i <= 8; i++) {
    const row   = el('prl-' + i);
    const badge = el('prls-' + i);
    if (!row || !badge) continue;
    row.classList.remove('is-current', 'is-next', 'is-done');
    badge.classList.remove('current', 'next', 'done', 'locked');
    if (i < levelNum) {
      row.classList.add('is-done');
      badge.classList.add('done');
      badge.textContent = '✅ Done';
    } else if (i === levelNum) {
      row.classList.add('is-current');
      badge.classList.add('current');
      badge.textContent = '📍 Current';
    } else if (i === levelNum + 1) {
      row.classList.add('is-next');
      badge.classList.add('next');
      badge.textContent = '⬆️ Next';
    } else {
      badge.classList.add('locked');
      badge.textContent = '🔒';
    }
  }

  // ── Sports section ──
  updateSportsDropdown();
}

// kept for compatibility — updateSportsDropdown now also updates new chip UI


// --- Profile ---
function profRender() {
  const totalXp = xpGetTotal();
  const { levelNum, level } = xpGetLevel(totalXp);
  const streak = xpGetStreak();

  const el = id => document.getElementById(id);
  if (el('profName'))       el('profName').textContent       = localStorage.getItem('siq_username') || 'SportsFan';
  if (el('profTitle'))      el('profTitle').textContent      = level.name + ' Player';
  if (el('profXpTotal'))    el('profXpTotal').textContent    = 'TOTAL XP • ' + totalXp.toLocaleString();
  if (el('profLevel'))      el('profLevel').textContent      = levelNum;
  if (el('profStreak'))     el('profStreak').textContent     = streak;
}

// Update dash level card when home loads
function bnUpdateHomeLevel() { refreshHome(); }

function getWorldRank() {
  // Simulate a world rank based on XP relative to mock leaderboard
  const totalXp = xpGetTotal();
  const mockScores = [4820, 3940, 3200, 2750, 2310];
  let rank = 1;
  for (const score of mockScores) {
    if (score > totalXp) rank++;
  }
  return rank;
}

function renderHomeXpChart() {
  const chart = document.getElementById('homeXpChart');
  if (!chart) return;
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = 'xp_day_' + d.getFullYear() + '_' + (d.getMonth()+1) + '_' + d.getDate();
    let xp = 0;
    try { xp = (JSON.parse(localStorage.getItem(key))||{}).xp||0; } catch {}
    const labels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    days.push({ xp, label: labels[d.getDay()] });
  }
  const maxXp = Math.max(...days.map(d => d.xp), 1);
  chart.innerHTML = days.map(d => `
    <div class="prog-xp-bar-wrap">
      <div class="prog-xp-bar" style="height:${Math.max(4, Math.round((d.xp/maxXp)*68))}px"></div>
      <div class="prog-xp-day">${d.label}</div>
    </div>`).join('');
}

function renderHomeLb() {
  const el = document.getElementById('homeLbRows');
  if (!el) return;
  const totalXp = xpGetTotal();
  const myUsername = localStorage.getItem('siq_username') || 'You';

  // Build top-3 list from LB_GLOBAL, injecting real XP for the user row
  let rows = JSON.parse(JSON.stringify(LB_GLOBAL)).map(r => {
    if (r.isMe) r.xp = totalXp;
    return r;
  });
  rows.sort((a, b) => b.xp - a.xp);
  const top3 = rows.slice(0, 3);

  const rankEmojis = ['🥇','🥈','🥉'];
  el.innerHTML = top3.map((r, i) => `
    <div class="home-lb-row ${r.isMe ? 'home-lb-you' : ''}">
      <div class="home-lb-rank">${rankEmojis[i]}</div>
      <div class="home-lb-icon">${r.icon}</div>
      <div class="home-lb-name">${r.isMe ? myUsername : r.name}</div>
      <div class="home-lb-xp">${r.xp.toLocaleString()} XP</div>
    </div>`).join('');
}

function refreshHome() {
  const totalXp = xpGetTotal();
  const { levelNum, level, nextLevel, pct } = xpGetLevel(totalXp);
  const streak = xpGetStreak();
  const dayData = xpLoad();
  const dailyXp = dayData.xp || 0;
  const el = id => document.getElementById(id);

  // Level box
  if (el('hlbNum'))  el('hlbNum').textContent  = levelNum;
  if (el('hlbName')) el('hlbName').textContent = level.name.toUpperCase();
  if (el('hlbSub')) {
    if (nextLevel) {
      const xpIntoLevel = totalXp - level.min;
      const xpNeeded    = nextLevel.min - level.min;
      el('hlbSub').textContent = `${xpIntoLevel} / ${xpNeeded} XP to ${nextLevel.name}`;
    } else {
      el('hlbSub').textContent = 'Greatest of All Time · MAX LEVEL';
    }
  }
  if (el('hlbFill')) el('hlbFill').style.width = pct + '%';

  // Stat boxes
  if (el('hsbStreak'))  el('hsbStreak').textContent  = streak;
  if (el('hsbXpTotal')) el('hsbXpTotal').textContent = totalXp.toLocaleString();
  if (el('hsbDailyXp')) el('hsbDailyXp').textContent = dailyXp + '/50';

  // Streak pill in welcome row
  if (el('homeStreakPillNum')) el('homeStreakPillNum').textContent = streak;

  // Single motivational line under CTA
  const nudge = el('homeStreakNudge');
  if (nudge) {
    if (streak > 1) {
      nudge.innerHTML = `🔥 You're on a <span>${streak}-day streak</span> &nbsp;·&nbsp; <span>+10 XP</span>`;
    } else {
      nudge.innerHTML = `🔥 Keep your streak alive &nbsp;·&nbsp; <span>+10 XP</span>`;
    }
  }

  // XP chart (progress page — safe no-op if element missing)
  renderHomeXpChart();

  // Username + avatar
  applyUsername();
}

function xpResetConfirm() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    const keysToRemove = [];
    for (let i=0; i<localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('xp_') || k.startsWith('siq_'))) keysToRemove.push(k);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    xpRender();
    profRender();
    progRender();
  }
}


// ===================== COMPLETED SPORTS DROPDOWN =====================
function toggleSportsDropdown() {
  const body  = document.getElementById('sportsDropdownBody');
  const arrow = document.getElementById('sportsDropdownArrow');
  const btn   = document.getElementById('sportsDropdownBtn');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  arrow.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  if (!isOpen) updateSportsDropdown();
}

function updateSportsDropdown() {
  // NBA: calculate mastery across all modes
  const learnedSet = new Set();
  modes.filter(m => m !== 'lineup').forEach(m => {
    modeData[m].forEach((pd, i) => { if (isLearned(pd)) learnedSet.add(i); });
  });
  const learnedCount = learnedSet.size;
  const totalPlayers = 10;
  const allDone   = learnedCount >= totalPlayers;
  const anyStarted = learnedCount > 0;

  // Update detail row sub/status
  const subEl    = document.getElementById('sdNBASub');
  const statusEl = document.getElementById('sdNBAStatus');
  if (subEl)    subEl.textContent = `Utah Jazz · ${learnedCount}/${totalPlayers} players learned`;
  if (statusEl) {
    if (allDone) {
      statusEl.className = 'sport-row-status complete';
      statusEl.textContent = '✅ Complete';
    } else if (anyStarted) {
      statusEl.className = 'sport-row-status in-progress';
      statusEl.textContent = `⏳ ${Math.round((learnedCount/totalPlayers)*100)}%`;
    } else {
      statusEl.className = 'sport-row-status not-started';
      statusEl.textContent = '○ Not Started';
    }
  }

  // Update NBA chip
  const nbaChip = document.getElementById('psc-nba');
  if (nbaChip) {
    nbaChip.className = 'prog-sport-chip ' + (allDone ? 'chip-done' : anyStarted ? 'chip-active' : 'chip-locked');
  }

  // Sports count badge
  const completedCount = allDone ? 1 : 0;
  const countEl = document.getElementById('progSportsCount');
  if (countEl) countEl.textContent = `${completedCount} / 8 Complete`;

  // Legacy element (safe no-op if removed)
  const legacyCount = document.getElementById('sportsCompleteCount');
  if (legacyCount) legacyCount.textContent = allDone ? '· 1/8 Complete' : '· 0/8 Complete';
}

// ===================== INIT =====================
updateHomeStats();
dpUpdateBadges();
xpRender();         // renders instantly with cached values
bnUpdateHomeLevel();
renderHomeLb();     // populate leaderboard preview on home
// init learn page on load
lpGoPanel(1);
sbXpLoad();         // loads real XP from Supabase and re-renders
sbUsernameLoad();   // loads real username from Supabase and re-renders
sbStreakLoad();     // loads real streak from Supabase and re-renders
