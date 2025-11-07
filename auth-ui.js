/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                      🎨 AUTHENTICATION UI LOGIK                              ║
║                    Login/Register Modal Verwaltung                          ║
║                                                                              ║
║  📚 Projekt: Jeopardy Quiz - Auth UI                                       ║
║  👨‍💻 Entwickler: Nico Kaschube                                              ║
║  📍 Ausbildungsort: Oberlinhaus Oberhausen                                  ║
║  🎓 Ausbildung: Fachinformatiker für IT-Systemelektroniker                  ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  📋 FUNKTIONEN:                                                              ║
║  ├── 🔓 Login-Dialog anzeigen/schließen                                    ║
║  ├── 📝 Registrierungs-Formular                                            ║
║  ├── 🔄 Tab-Wechsel zwischen Login & Register                              ║
║  ├── ✅ Formular-Validierung                                                ║
║  ├── 💾 Integration mit AuthManager                                         ║
║  └── 🎨 Modal Animationen                                                   ║
║                                                                              ║
║  🎯 Zweck: Benutzeroberfläche für Authentifizierung                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// LOGIN/REGISTER UI MANAGER                                                   
// ============================================================================= 

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
        console.log('🎨 Auth UI initialized');
    }
    
    bindEvents() {
        // Open/Close Login Modal
        const loginBtn = document.getElementById('loginBtn');
        const loginBtnNav = document.getElementById('loginBtnNav');
        const closeLoginBtn = document.getElementById('closeLoginBtn');
        const cancelLoginBtn = document.getElementById('cancelLoginBtn');
        
        if (loginBtn) loginBtn.addEventListener('click', () => this.openLoginModal());
        if (loginBtnNav) loginBtnNav.addEventListener('click', () => this.openLoginModal());
        if (closeLoginBtn) closeLoginBtn.addEventListener('click', () => this.closeLoginModal());
        if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', () => this.closeLoginModal());
        
        // Logout Button
        const logoutBtn = document.getElementById('logoutBtn');
        const logoutBtnNav = document.getElementById('logoutBtnNav');
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.handleLogout());
        if (logoutBtnNav) logoutBtnNav.addEventListener('click', () => this.handleLogout());
        
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
            this.showError('login', 'Bitte fülle alle Felder aus!');
            return;
        }
        
        // Disable button während Login
        const submitBtn = document.getElementById('submitLoginBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Anmeldung läuft...';
        }
        
        try {
            const result = await window.authManager.login(username, password);
            
            if (result.success) {
                this.showSuccess('login', `✅ Willkommen ${result.user.username}!`);
                
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
                submitBtn.textContent = '🔓 Anmelden';
            }
        }
    }
    
    handleLogout() {
        if (confirm('Möchtest du dich wirklich abmelden?')) {
            window.authManager.logout();
            this.showNotification('👋 Erfolgreich abgemeldet!', 'info');
        }
    }
    
    handleRegister() {
        const username = document.getElementById('registerUsername')?.value.trim();
        const password = document.getElementById('registerPassword')?.value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm')?.value;
        
        if (!username || !password || !passwordConfirm) {
            this.showError('register', 'Bitte fülle alle Felder aus!');
            return;
        }
        
        if (password !== passwordConfirm) {
            this.showError('register', 'Passwörter stimmen nicht überein!');
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
