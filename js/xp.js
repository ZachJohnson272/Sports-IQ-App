// ===================== SUPABASE XP SYSTEM =====================
//
// HOW IT WORKS:
//   - Total XP is stored in Supabase (persists across devices/sessions)
//   - Daily XP tracking (goal, streak) stays in localStorage (fast, no lag)
//   - On page load we fetch total_xp from Supabase and sync it locally
//   - When XP is awarded we update Supabase AND localStorage together
//
// SUPABASE TABLE NEEDED:
//   Table name : user_xp
//   Columns    :
//     id         uuid  (primary key, default: gen_random_uuid())
//     user_id    uuid  (references auth.users.id, unique)
//     total_xp   int8  (default: 0)
//     updated_at timestamptz (default: now())
//
// ROW LEVEL SECURITY (RLS) — enable RLS on the table, then add these policies:
//   SELECT : auth.uid() = user_id
//   INSERT : auth.uid() = user_id
//   UPDATE : auth.uid() = user_id
//
// ============================================================

const XP_GOAL  = 50;
const XP_BONUS = 10;

// In-memory cache of total XP loaded from Supabase.
// We use this so the UI never has to wait for a network call.
let _cachedTotalXp = 0;

// ── Daily XP key (localStorage only — resets each day) ──────
function xpDayKey() {
  const d = new Date();
  return 'xp_day_' + d.getFullYear() + '_' + (d.getMonth()+1) + '_' + d.getDate();
}

// ── Load / save today's daily XP object from localStorage ───
function xpLoad() {
  try { return JSON.parse(localStorage.getItem(xpDayKey()) || 'null') || {xp:0,done:false,bonusGiven:false}; }
  catch { return {xp:0,done:false,bonusGiven:false}; }
}
function xpSave(data) {
  localStorage.setItem(xpDayKey(), JSON.stringify(data));
}

// ── Streak — Supabase-backed ─────────────────────────────────
// _cachedStreak holds the current_streak from Supabase in memory.
// localStorage is only used as a fallback if Supabase is unreachable.
let _cachedStreak = 0;

function xpGetStreak() { return _cachedStreak; }

// Load streak from Supabase on app start
async function sbStreakLoad() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return;

    const userId = session.user.id;
    console.log('[Streak] Loading for user:', userId);

    const { data, error } = await _sb
      .from('user_profiles')
      .select('current_streak, best_streak, last_quiz_completed_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('[Streak] Load error:', error.message);
      _cachedStreak = parseInt(localStorage.getItem('siq_streak_fallback') || '0');
      return;
    }

    if (!data) {
      console.log('[Streak] No profile row found — streak stays 0');
      _cachedStreak = 0;
      return;
    }

    console.log('[Streak] Loaded — current_streak:', data.current_streak,
      '| best_streak:', data.best_streak,
      '| last_quiz_completed_at:', data.last_quiz_completed_at);

    _cachedStreak = data.current_streak || 0;
    localStorage.setItem('siq_streak_fallback', _cachedStreak);

  } catch (err) {
    console.warn('[Streak] sbStreakLoad exception:', err);
    _cachedStreak = parseInt(localStorage.getItem('siq_streak_fallback') || '0');
  }

  // Re-render UI with loaded streak
  refreshHome();
  if (document.getElementById('profStreak')) profRender();
}

// Called only when the user successfully completes the Daily Player Guess
async function sbStreakSave() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return;

    const userId = session.user.id;
    const nowISO = new Date().toISOString();
    const todayDate = nowISO.slice(0, 10); // "YYYY-MM-DD"

    console.log('[Streak] Saving for user:', userId);

    // Fetch current row
    const { data, error } = await _sb
      .from('user_profiles')
      .select('current_streak, best_streak, last_quiz_completed_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.warn('[Streak] Fetch before save error:', error.message);
      return;
    }

    const prev = data || { current_streak: 0, best_streak: 0, last_quiz_completed_at: null };
    console.log('[Streak] Previous values — current_streak:', prev.current_streak,
      '| best_streak:', prev.best_streak,
      '| last_quiz_completed_at:', prev.last_quiz_completed_at);

    const lastDate = prev.last_quiz_completed_at
      ? prev.last_quiz_completed_at.slice(0, 10)
      : null;

    // Guard: already completed today — don't update again
    if (lastDate === todayDate) {
      console.log('[Streak] Already completed today — no change');
      return;
    }

    // Calculate yesterday's date string
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yesterdayDate = yest.toISOString().slice(0, 10);

    let newStreak;
    if (!lastDate) {
      // First ever completion
      newStreak = 1;
      console.log('[Streak] First completion — streak → 1');
    } else if (lastDate === yesterdayDate) {
      // Completed yesterday — extend streak
      newStreak = (prev.current_streak || 0) + 1;
      console.log('[Streak] Consecutive day — streak →', newStreak);
    } else {
      // Gap of more than 1 day — reset
      newStreak = 1;
      console.log('[Streak] Gap detected (last:', lastDate, ', yesterday:', yesterdayDate, ') — streak reset → 1');
    }

    const newBest = Math.max(prev.best_streak || 0, newStreak);

    console.log('[Streak] Writing — current_streak:', newStreak, '| best_streak:', newBest);

    const { error: upsertErr } = await _sb
      .from('user_profiles')
      .update({
        current_streak:          newStreak,
        best_streak:             newBest,
        last_quiz_completed_at:  nowISO,
      })
      .eq('user_id', userId);

    if (upsertErr) {
      console.warn('[Streak] Save error:', upsertErr.message);
      return;
    }

    console.log('[Streak] Save successful ✅');

    // Update in-memory cache and localStorage fallback
    _cachedStreak = newStreak;
    localStorage.setItem('siq_streak_fallback', _cachedStreak);

    // Refresh UI
    refreshHome();
    if (document.getElementById('profStreak')) profRender();

  } catch (err) {
    console.warn('[Streak] sbStreakSave exception:', err);
  }
}

// ── SUPABASE: Load total XP for the logged-in user ───────────
// Called once on page load. Populates _cachedTotalXp.
async function sbXpLoad() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return; // not logged in — auth guard will redirect

    const userId = session.user.id;

    const { data, error } = await _sb
      .from('user_xp')
      .select('total_xp')
      .eq('user_id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      // Row doesn't exist yet — create it with 0 XP
      await _sb.from('user_xp').insert({ user_id: userId, total_xp: 0 });
      _cachedTotalXp = 0;
    } else if (error) {
      console.warn('[XP] Could not load XP from Supabase:', error.message);
      // Fall back to the localStorage total so the app still works offline
      _cachedTotalXp = _xpGetTotalFromLocalStorage();
    } else {
      _cachedTotalXp = data.total_xp || 0;
    }
  } catch (err) {
    console.warn('[XP] sbXpLoad error:', err);
    _cachedTotalXp = _xpGetTotalFromLocalStorage();
  }

  // Refresh all UI with the loaded value
  refreshHome();
  xpRender();
}

// ── SUPABASE: Save total XP back to the database ─────────────
// We use upsert so it works whether the row exists or not.
async function sbXpSave(newTotal) {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return;

    await _sb.from('user_xp').upsert(
      { user_id: session.user.id, total_xp: newTotal, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
  } catch (err) {
    console.warn('[XP] sbXpSave error:', err);
    // XP is still tracked locally — it will sync next time
  }
}

// ── Returns total XP (uses in-memory cache — instant, no lag) ─
function xpGetTotal() {
  return _cachedTotalXp;
}

// ── Fallback: calculate total from localStorage (offline mode) ─
function _xpGetTotalFromLocalStorage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('xp_day_')) {
      try { total += (JSON.parse(localStorage.getItem(key)) || {}).xp || 0; } catch {}
    }
  }
  return total;
}

// ── Award XP: update both localStorage (daily) and Supabase (total) ─
function xpAward(amount) {
  // 1. Update today's daily XP in localStorage
  const data = xpLoad();
  if (data.done && data.bonusGiven && amount <= 0) return;
  data.xp = (data.xp || 0) + amount;
  if (!data.done && data.xp >= XP_GOAL) {
    data.done = true;
    if (!data.bonusGiven) {
      data.bonusGiven = true;
      data.xp += XP_BONUS;
      // streak is driven by sbStreakSave() on daily quiz completion only
    }
  }
  xpSave(data);

  // 2. Update the in-memory cache
  _cachedTotalXp += amount;

  // 3. Persist to Supabase in the background (non-blocking)
  sbXpSave(_cachedTotalXp);

  // 4. Refresh UI and show the floating pop
  xpRender();
  xpPop('+' + amount + ' XP');
}

function xpRender() {
  refreshHome();
  const data = xpLoad();
  const xp   = data.xp || 0;
  const pct  = Math.min((xp / XP_GOAL) * 100, 100);

  const fill     = document.getElementById('xpBarFill');
  const count    = document.getElementById('xpCount');
  const complete = document.getElementById('xpComplete');
  const badge    = document.getElementById('dailyBadge');

  if (!fill) return;

  fill.style.width = pct + '%';
  if (data.done) fill.classList.add('done'); else fill.classList.remove('done');
  if (count) count.textContent = xp;
  if (complete) {
    if (data.done) complete.classList.add('show'); else complete.classList.remove('show');
  }
  if (badge) {
    if (data.done) {
      badge.textContent = '✅ Complete!';
      badge.classList.add('done');
    } else {
      badge.textContent = 'In Progress';
      badge.classList.remove('done');
    }
  }
}

function xpPop(text) {
  const el = document.createElement('div');
  el.className = 'xp-pop';
  el.textContent = text;
  el.style.left = (window.innerWidth / 2 - 35) + 'px';
  el.style.top = '110px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}


