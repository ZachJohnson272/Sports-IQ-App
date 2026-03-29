// ===================== SUPABASE AUTH GUARD =====================
// This section protects the app — users must be logged in to see it.

const _sb = supabase.createClient(
  'https://cyzxoadiuhkftxpvzsxq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5enhvYWRpdWhrZnR4cHZ6c3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MzYxNjMsImV4cCI6MjA4ODUxMjE2M30.ctQTb1YkBwyVzspLKKtrEK-qjxeYrf6mmAM7R2rHXWg'
);

// --- STEP 1: Check session when the page first loads ---
// If there's no active session, send the user to login.html immediately.
(async () => {
  const { data } = await _sb.auth.getSession();
  if (!data.session) {
    window.location.href = 'login.html';
  }
})();

// --- STEP 2: Listen for auth state changes in real time ---
// This catches: manual logouts, session expiry, token revocation.
// Whenever the user loses their session for ANY reason, redirect to login.
_sb.auth.onAuthStateChange((event, session) => {
  // SIGNED_OUT = user clicked logout
  // TOKEN_REFRESHED failure / USER_DELETED = session expired or revoked
  if (event === 'SIGNED_OUT' || !session) {
    window.location.href = 'login.html';
  }
});

// --- Logout function (called by the Log Out button in the Account tab) ---
async function logout() {
  await _sb.auth.signOut();
  // onAuthStateChange above will handle the redirect automatically
}

// ===============================================================

// ===================== USERNAME LOADER =====================
// Loads the user's real username from Supabase on every page load.
// Falls back to localStorage cache so the UI is instant.

async function sbUsernameLoad() {
  try {
    const { data: { session } } = await _sb.auth.getSession();
    if (!session) return;

    const { data, error } = await _sb
      .from('user_profiles')
      .select('username')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (!error && data && data.username) {
      // Update cache
      localStorage.setItem('siq_username', data.username);
    }
  } catch (err) {
    console.warn('[Username] Could not load from Supabase:', err);
  }

  // Refresh all username display spots with whatever is now in cache
  applyUsername();
}

// Apply the cached username to every element that shows it
function applyUsername() {
  const username = localStorage.getItem('siq_username') || '';
  const el = id => document.getElementById(id);

  const displayName = username || 'SportsFan';
  const welcome     = username ? 'Welcome back, ' + username + '!' : 'Welcome back!';

  if (el('homeUsername'))        el('homeUsername').textContent        = displayName;
  if (el('homeAvatarInitials'))  el('homeAvatarInitials').textContent  = displayName.charAt(0).toUpperCase();
  if (el('homeWelcome'))         el('homeWelcome').textContent         = welcome;
  if (el('profName'))            el('profName').textContent            = displayName;
}
