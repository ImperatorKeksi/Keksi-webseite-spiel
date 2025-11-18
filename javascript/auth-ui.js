/*
    +--------------------------------------------------+
    �  ?? AUTH UI - Login/Register Modal              �
    �  Benutzeroberfl�che f�r Authentifizierung       �
    �                                                  �
    �  Entwickler: Nico Kaschube                      �
    �  Berufsbildungswerk im Oberlinhaus Potsdam | 2025                  �
    +--------------------------------------------------+
*/

// ==================== AUTH UI MANAGER ====================

class AuthUI {
    constructor() {
        this.loginModal = null;
        this.currentTab = 'login';
        this.init();
    }
    
    init() {
        // Wait for DOM and authManager
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.loginModal = document.getElementById('loginModal');
        this.bindEvents();
        console.log('?? Auth UI initialized');
    }
    
    bindEvents() {
        // Open/Close Login Modal
        const loginBtn = document.getElementById('loginBtn');
        const loginBtnNav = document.getElementById('loginBtnNav');
        const closeLoginBtn = document.getElementById('closeLoginBtn');
        const cancelLoginBtn = document.getElementById('cancelLoginBtn');
        
        // Explizite Binder
        if (loginBtn) loginBtn.addEventListener('click', () => this.openLoginModal());
        if (loginBtnNav) loginBtnNav.addEventListener('click', () => this.openLoginModal());
        // Generischer Binder: alle IDs, die mit loginBtn anfangen (z.B. loginBtnGame, loginBtnAR, ...)
        document.querySelectorAll('[id^="loginBtn"]').forEach(el => {
            // Nicht den Submit-Button im Modal erwischen (heißt submitLoginBtn)
            if (el.id === 'submitLoginBtn') return;
            // Doppelte Listener vermeiden
            if (el._loginBound) return;
            el._loginBound = true;
            el.addEventListener('click', () => this.openLoginModal());
        });
        if (closeLoginBtn) closeLoginBtn.addEventListener('click', () => this.closeLoginModal());
        if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', () => this.closeLoginModal());
        
        // Logout Button
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutBtnNav = document.getElementById('logoutBtnNav');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.handleLogout());
        if (logoutBtnNav) logoutBtnNav.addEventListener('click', () => this.handleLogout());
        // Generischer Binder: alle IDs, die mit logoutBtn anfangen (z.B. logoutBtnGame, logoutBtnAR, ...)
        document.querySelectorAll('[id^="logoutBtn"]').forEach(el => {
            if (el._logoutBound) return;
            el._logoutBound = true;
            el.addEventListener('click', () => this.handleLogout());
        });
        
        // Tab Switching
        const authTabs = document.querySelectorAll('.auth-tab');
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        
        // Form Submissions
        const submitLoginBtn = document.getElementById('submitLoginBtn');
        const submitRegisterBtn = document.getElementById('submitRegisterBtn');
        
        if (submitLoginBtn) submitLoginBtn.addEventListener('click', () => this.handleLogin());
        if (submitRegisterBtn) submitRegisterBtn.addEventListener('click', () => this.handleRegister());
        
        // Enter key submit
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) {
            loginForm.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleLogin();
                }
            });
        }
        
        if (registerForm) {
            registerForm.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleRegister();
                }
            });
        }
    }
    
    // =========================================================================
    // MODAL MANAGEMENT
    // =========================================================================
    
    openLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.remove('hidden');
            this.switchTab('login');
            this.clearMessages();
            document.getElementById('loginUsername')?.focus();
        }
    }
    
    closeLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.add('hidden');
            this.clearForms();
            this.clearMessages();
        }
    }
    
    switchTab(tab) {
        this.currentTab = tab;
        
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        
        // Show/hide forms
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const submitLoginBtn = document.getElementById('submitLoginBtn');
        const submitRegisterBtn = document.getElementById('submitRegisterBtn');
        
        if (tab === 'login') {
            if (loginForm) loginForm.style.display = 'block';
            if (registerForm) registerForm.style.display = 'none';
            if (submitLoginBtn) submitLoginBtn.style.display = 'inline-flex';
            if (submitRegisterBtn) submitRegisterBtn.style.display = 'none';
        } else {
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'block';
            if (submitLoginBtn) submitLoginBtn.style.display = 'none';
            if (submitRegisterBtn) submitRegisterBtn.style.display = 'inline-flex';
        }
        
        this.clearMessages();
    }
    
    // =========================================================================
    // AUTHENTICATION HANDLERS
    // =========================================================================
    
    async handleLogin() {
        const username = document.getElementById('loginUsername')?.value.trim();
        const password = document.getElementById('loginPassword')?.value;
        
        if (!username || !password) {
            this.showError('login', 'Bitte f�lle alle Felder aus!');
            return;
        }
        
        // Disable button w�hrend Login
        const submitBtn = document.getElementById('submitLoginBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '? Anmeldung l�uft...';
        }
        
        try {
            const result = await window.authManager.login(username, password);
            
            if (result.success) {
                this.showSuccess('login', `? Willkommen ${result.user.username}!`);
                
                setTimeout(() => {
                    this.closeLoginModal();
                }, 1500);
            } else {
                this.showError('login', result.error);
            }
        } catch (error) {
            this.showError('login', 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = '?? Anmelden';
            }
        }
    }
    
    handleLogout() {
        if (confirm('M�chtest du dich wirklich abmelden?')) {
            window.authManager.logout();
            this.showNotification('?? Erfolgreich abgemeldet!', 'info');
        }
    }
    
    handleRegister() {
        const username = document.getElementById('registerUsername')?.value.trim();
        const password = document.getElementById('registerPassword')?.value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm')?.value;
        
        if (!username || !password || !passwordConfirm) {
            this.showError('register', 'Bitte f�lle alle Felder aus!');
            return;
        }
        
        if (password !== passwordConfirm) {
            this.showError('register', 'Passw�rter stimmen nicht �berein!');
            return;
        }
        
        const result = window.authManager.register(username, password);
        
        if (result.success) {
            this.showSuccess('register', result.message);
            this.clearForms();
            
            setTimeout(() => {
                this.switchTab('login');
            }, 2000);
        } else {
            this.showError('register', result.error);
        }
    }
    
    // =========================================================================
    // UI HELPERS
    // =========================================================================
    
    showError(form, message) {
        const errorEl = document.getElementById(`${form}Error`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
        
        setTimeout(() => {
            if (errorEl) errorEl.style.display = 'none';
        }, 5000);
    }
    
    showSuccess(form, message) {
        const successEl = document.getElementById(`${form}Success`);
        if (successEl) {
            successEl.textContent = message;
            successEl.style.display = 'block';
        }
    }
    
    clearMessages() {
        ['login', 'register'].forEach(form => {
            const errorEl = document.getElementById(`${form}Error`);
            const successEl = document.getElementById(`${form}Success`);
            if (errorEl) errorEl.style.display = 'none';
            if (successEl) successEl.style.display = 'none';
        });
    }
    
    clearForms() {
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerPasswordConfirm').value = '';
    }
    
    showNotification(message, type = 'info') {
        // Nutze das bestehende Notification-System falls vorhanden
        if (window.editor && typeof window.editor.showNotification === 'function') {
            window.editor.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// EPIC LOGIN MODAL INTERACTION & ANIMATION
function epicLoginInit() {
    // Show/Hide Passwort
    function togglePassword(inputId, toggleId) {
        const input = document.getElementById(inputId);
        const toggle = document.getElementById(toggleId);
        if (!input || !toggle) return;
        toggle.addEventListener('click', () => {
            input.type = input.type === 'password' ? 'text' : 'password';
            toggle.textContent = input.type === 'password' ? '👁️' : '🙈';
        });
    }
    togglePassword('loginPassword', 'toggleLoginPassword');
    togglePassword('registerPassword', 'toggleRegisterPassword');
    togglePassword('registerPasswordConfirm', 'toggleRegisterPasswordConfirm');

    // Dynamischer Hintergrund (Partikel/Glow)
    const bg = document.getElementById('epicLoginBg');
    if (bg) {
        let glowPos = 0;
        setInterval(() => {
            glowPos = (glowPos + 1) % 100;
            bg.style.background = `radial-gradient(circle at ${60+Math.sin(glowPos/10)*20}% ${20+Math.cos(glowPos/10)*10}%, #9d4edd44 0%, #1a1a1a 100%)`;
        }, 80);
    }

    // Konfetti bei Erfolg
    function showConfetti() {
        const confetti = document.getElementById('epicLoginConfetti');
        if (!confetti) return;
        confetti.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const el = document.createElement('div');
            el.style.position = 'absolute';
            el.style.left = Math.random()*100+'%';
            el.style.top = '-40px';
            el.style.width = '12px';
            el.style.height = '12px';
            el.style.borderRadius = '50%';
            el.style.background = `hsl(${Math.random()*360},80%,60%)`;
            el.style.opacity = '0.85';
            el.style.zIndex = '10';
            el.style.animation = `epicConfetti 1.2s ${Math.random()*0.7}s both`;
            confetti.appendChild(el);
            setTimeout(() => { el.remove(); }, 1800);
        }
    }
    // Erfolgsmeldung abfangen
    const loginSuccess = document.getElementById('loginSuccess');
    if (loginSuccess) {
        const observer = new MutationObserver(() => {
            if (loginSuccess.style.display === 'block') {
                showConfetti();
            }
        });
        observer.observe(loginSuccess, { attributes: true, attributeFilter: ['style'] });
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', epicLoginInit);
} else {
    epicLoginInit();
}

// Initialize
let authUI;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        authUI = new AuthUI();
        window.authUI = authUI;
    });
} else {
    authUI = new AuthUI();
    window.authUI = authUI;
}
