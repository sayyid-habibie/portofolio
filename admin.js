// ===== ADMIN PANEL =====
const adminToggle  = document.getElementById('admin-toggle');
const adminPanel   = document.getElementById('admin-panel');
const adminOverlay = document.getElementById('admin-overlay');
const closeAdmin   = document.getElementById('close-admin');
const loginModal   = document.getElementById('login-modal');
const loginForm    = document.getElementById('login-form');
const loginError   = document.getElementById('login-error');
const logoutBtn    = document.getElementById('admin-logout');

// Secret shortcut
let toggleVisible = false;
function showAdminToggle() {
    toggleVisible = !toggleVisible;
    adminToggle.classList.toggle('visible', toggleVisible);
    if (!toggleVisible) closePanel();
}
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') showAdminToggle();
});
let tapCount = 0, tapTimer = null;
const logoEl = document.querySelector('.logo');
if (logoEl) {
    logoEl.addEventListener('click', () => {
        tapCount++;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => { tapCount = 0; }, 2000);
        if (tapCount >= 5) { tapCount = 0; clearTimeout(tapTimer); showAdminToggle(); }
    });
}

// Auth
const _c = btoa('Muhammad Sayyid Habibie') + '|' + btoa('April1604005');
function isLoggedIn() { return sessionStorage.getItem('adm_auth') === btoa(_c); }
function doLogin(n, p) { return (btoa(n) + '|' + btoa(p)) === _c; }
let data = null;

// Toggle click
adminToggle.addEventListener('click', () => {
    if (isLoggedIn()) { openPanel(); }
    else {
        loginModal.classList.remove('hidden');
        adminOverlay.classList.remove('hidden');
        document.getElementById('login-name').focus();
    }
});

// Login submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = document.getElementById('login-name').value.trim();
    const p = document.getElementById('login-pass').value;
    if (doLogin(n, p)) {
        sessionStorage.setItem('adm_auth', btoa(_c));
        loginModal.classList.add('hidden');
        loginError.classList.add('hidden');
        loginError.textContent = '';
        openPanel();
    } else {
        loginError.textContent = 'Nama atau password salah.';
        loginError.classList.remove('hidden');
        document.getElementById('login-pass').value = '';
    }
});

logoutBtn.addEventListener('click', () => { sessionStorage.removeItem('adm_auth'); closePanel(); showToast('Berhasil logout.'); });

function openPanel() {
    if (!data) data = loadFromStorage();
    const keys = ['home','footer','about','skills','education','projects','services','testimonials'];
    if (keys.some(k => !data[k])) { localStorage.removeItem('portfolioData'); data = loadFromStorage(); }
    adminPanel.classList.remove('hidden');
    adminOverlay.classList.remove('hidden');
    renderAll();
}
function closePanel() {
    adminPanel.classList.add('hidden');
    loginModal.classList.add('hidden');
    adminOverlay.classList.add('hidden');
}
function closeLoginModal() {
    loginModal.classList.add('hidden');
    adminOverlay.classList.add('hidden');
    loginError.classList.add('hidden');
    loginError.textContent = '';
    document.getElementById('login-name').value = '';
    document.getElementById('login-pass').value = '';
}
closeAdmin.addEventListener('click', closePanel);
document.getElementById('close-login').addEventListener('click', closeLoginModal);
adminOverlay.addEventListener('click', () => {
    if (!adminPanel.classList.contains('hidden')) closePanel(); else closeLoginModal();
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});
