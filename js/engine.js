let _sessionDeck   = [];   // array of {front, back, hint} card objects
let _sessionIdx    = 0;
let _sessionMode   = null; // modeKey string from MODE_BUILDERS
let _sessionScores = [];   // parallel array: {attempts, correct} per card

// ===================== startFlashSession =====================
// Entry point for any MODE_BUILDERS mode.
// Builds the deck, resets session state, wires the existing flashcard UI.
function startFlashSession(cards, opts) {
  opts = opts || {};
  const doShuffle = opts.shuffle !== false;

  _sessionDeck   = doShuffle ? shuffleArr([...cards]) : [...cards];
  _sessionIdx    = 0;
  _sessionScores = _sessionDeck.map(() => ({ attempts: 0, correct: 0 }));

  // Reset shared session vars
  isFlipped = false; cardAnswered = false; isFlipping = false; mcSelected = null;
  fcStreak = 0; fcBestStreak = 0; fcCorrectCount = 0;
  _fcReversed = false;
  const reverseBtn = document.getElementById('fcReverseBtn');
  if (reverseBtn) reverseBtn.classList.remove('active');
  // Show flip button only for modes that support it
  const FLIP_ALLOWED_MODES = new Set(['player_jersey', 'player_college', 'player_draft_info']);
  if (reverseBtn) reverseBtn.style.display = FLIP_ALLOWED_MODES.has(_sessionMode) ? '' : 'none';

  // Wire UI elements
  document.getElementById('cardScene').style.display    = '';
  document.getElementById('answerBtns').style.display   = '';
  delete document.getElementById('answerBtns').dataset.randMode; // not in random mode
  document.getElementById('mcOptions').style.display    = 'none';
  document.getElementById('lineupMode').style.display   = 'none';
  const _rcEl = document.getElementById('roundComplete'); _rcEl.classList.remove('show'); _rcEl.style.display = '';
  document.getElementById('fcTotal').textContent        = _sessionDeck.length;
  document.getElementById('fcModeTitle').textContent    = SESSION_MODE_TITLES[_sessionMode] || '';

  _fcUpdateStreakBadge();
  loadSessionCard();
  showPage('flashcards');
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ===================== loadSessionCard =====================
// Renders a {front, back} card object into the existing card UI.
function loadSessionCard() {
  if (_sessionIdx >= _sessionDeck.length) { endSessionRound(); return; }

  const card   = _sessionDeck[_sessionIdx];
  const scoreP = _sessionScores[_sessionIdx];

  isFlipped = false; cardAnswered = false; isFlipping = false; mcSelected = null;

  // Reset card to front face instantly
  const c3d = document.getElementById('card3d');
  c3d.style.transition = 'none';
  c3d.classList.remove('flipped');
  void c3d.offsetWidth;
  c3d.style.transition = '';

  // Front face: show the prompt text
  const photoEl    = document.getElementById('playerPhoto');
  const overlayEl  = document.getElementById('photoOverlay');
  const frontTextEl = document.getElementById('cardFrontText');
  photoEl.style.display   = 'none';
  overlayEl.style.display = 'none';
  frontTextEl.style.display = '';

  // Show hint or generic label
  let hint;
  if (_fcReversed) {
    const reverseHints = {
      player_jersey:     'Which player wears this jersey number?',
      player_college:    'Which player went to this college?',
      player_draft_info: 'Which player has this draft info?',
    };
    hint = reverseHints[_sessionMode] || 'Which player is this?';
  } else {
    hint = card.hint || 'What is the answer?';
  }
  const displayFront = _fcReversed ? card.back  : card.front;
  const displayBack  = _fcReversed ? card.front : card.back;

  if (hint === '__LINEUP__') {
    frontTextEl.innerHTML = `
      <div class="front-label front-label--lineup">IDEAL STARTING 5 — FULLY HEALTHY</div>
      <div class="front-main front-main--team">${displayFront}</div>`;
  } else {
    frontTextEl.innerHTML = `
      <div class="front-label">${hint}</div>
      <div class="front-main">${displayFront}</div>`;
  }

  // Back face
  const backPhotoEl = document.getElementById('backPhoto');
  backPhotoEl.src = '';
  backPhotoEl.style.display = 'none';
  const backNameEl = document.getElementById('backName');
  const cardBackEl = document.querySelector('.card-back');
  if (displayBack && displayBack.startsWith('<')) {
    backNameEl.innerHTML = displayBack;
    const isRosterList = displayBack.includes('back-roster-row');
    const isConfBlock  = displayBack.includes('back-conf-block');
    const isDraftList  = displayBack.includes('draft-pick-list');
    const isTop10List  = displayBack.includes('top10-list');
    if (isDraftList) {
      backNameEl.className = 'back-name';
      backNameEl.style.width = '100%';
      if (cardBackEl) { cardBackEl.classList.remove('card-back--list','card-back--centered-list','card-back--top10'); cardBackEl.classList.add('card-back--draft'); }
    } else if (isTop10List) {
      backNameEl.className = 'back-name';
      backNameEl.style.width = '100%';
      if (cardBackEl) { cardBackEl.classList.remove('card-back--list','card-back--centered-list','card-back--draft'); cardBackEl.classList.add('card-back--top10'); }
    } else if (isRosterList) {
      backNameEl.className = 'back-name back-name--list';
      backNameEl.style.width = '';
      if (cardBackEl) { cardBackEl.classList.remove('card-back--list','card-back--centered-list','card-back--draft','card-back--top10'); cardBackEl.classList.add('card-back--list'); }
    } else {
      // coaching staff, conf/division, etc. — centered, no roster sizing
      backNameEl.className = isConfBlock ? 'back-name' : 'back-name back-name--list';
      backNameEl.style.width = '';
      if (cardBackEl) { cardBackEl.classList.remove('card-back--list','card-back--centered-list','card-back--draft','card-back--top10'); cardBackEl.classList.add('card-back--centered-list'); }
    }
  } else {
    backNameEl.className = 'back-name';
    backNameEl.style.width = '';
    backNameEl.textContent = displayBack;
    if (cardBackEl) cardBackEl.classList.remove('card-back--list', 'card-back--centered-list', 'card-back--draft', 'card-back--top10');
  }
  document.getElementById('backPos').textContent  = '';
  document.getElementById('backStats').innerHTML  = '';

  // Streak label
  const m = scoreP.attempts === 0 ? null : Math.round((scoreP.correct / scoreP.attempts) * 100);
  // cardStreak hidden

  // Progress
  document.getElementById('fcCurrent').textContent = _sessionIdx + 1;
  document.getElementById('fcProgressBar').style.width = ((_sessionIdx / _sessionDeck.length) * 100) + '%';

  // Lock answer buttons until flip
  const btns = document.getElementById('answerBtns');
  btns.classList.add('answer-btns-hidden', 'answer-btns-locked');

  // Entering animation
  const scene = document.getElementById('cardScene');
  scene.classList.remove('entering');
  void scene.offsetWidth;
  scene.classList.add('entering');
}

// ===================== answerSessionCard =====================
// Called by the existing ✅/❌ buttons when in a session mode.
function answerSessionCard(correct) {
  if (cardAnswered || !isFlipped || isFlipping) return;
  cardAnswered = true;

  const scoreP = _sessionScores[_sessionIdx];
  scoreP.attempts++;
  if (correct) { scoreP.correct++; xpAward(3); }

  if (correct) {
    fcCorrectCount++;
    fcStreak++;
    if (fcStreak > fcBestStreak) fcBestStreak = fcStreak;
  } else {
    fcStreak = 0;
  }
  _fcUpdateStreakBadge();

  const flash = document.getElementById('feedbackFlash');
  flash.className = 'feedback-flash ' + (correct ? 'show-got' : 'show-miss');
  setTimeout(() => { flash.className = 'feedback-flash'; }, 380);

  isFlipping = true;
  document.getElementById('card3d').classList.remove('flipped');
  _sessionIdx++;
  setTimeout(() => { isFlipping = false; loadSessionCard(); }, 500);
}

// ===================== endSessionRound =====================
function endSessionRound() {
  document.getElementById('cardScene').style.display  = 'none';
  document.getElementById('answerBtns').style.display = 'none';
  document.getElementById('mcOptions').style.display  = 'none';

  const total    = _sessionScores.reduce((s, p) => s + p.attempts, 0);
  const correct  = _sessionScores.reduce((s, p) => s + p.correct, 0);
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);

  const incorrect = total - correct;
  document.getElementById('rcCorrect').textContent    = correct;
  document.getElementById('rcIncorrect').textContent  = incorrect;
  document.getElementById('rcAccuracy').textContent   = accuracy + '%';
  document.getElementById('rcBestStreak').textContent = fcBestStreak;



  const rc = document.getElementById('roundComplete');
  rc.classList.add('show');
}

// ===================== restartSessionMode =====================
function restartSessionMode() {
  if (!_sessionMode) return;
  const builder = MODE_BUILDERS[_sessionMode];
  if (!builder) return;
  startFlashSession(builder(), { shuffle: true });
}

// ============================================================
// ================== END DECK BUILDER SYSTEM =================
// ============================================================
