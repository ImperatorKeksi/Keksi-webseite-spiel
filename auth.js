/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                      🔐 AUTHENTICATION & AUTHORIZATION                       ║
║                    Login-System mit Rollen & Berechtigungen                 ║
║                                                                              ║
║  🎯 Zweck: Benutzer-Authentifizierung und Zugriffskontrolle                ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  📋 FUNKTIONEN:                                                              ║
║  ├── 👤 Login/Logout System                                                 ║
║  ├── 🎭 Rollen-Management (Guest, Teacher, Admin)                          ║
║  ├── 💾 LocalStorage + Server Validation                                    ║
║  ├── 🔒 Berechtigungs-Checks für Features                                  ║
║  └── 🔑 Session-Management mit Token                                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// 🔐 AUTHENTICATION MANAGER                                                   
// ============================================================================= 

class AuthManager {
    constructor() {
        // Storage Keys
        this.storageKey = 'jeopardy_auth_session';
        this.usersKey = 'jeopardy_users_local';
        
        // Server Config (später konfigurierbar)
        this.serverUrl = 'http://localhost:3000/api'; // Beispiel-Server
        this.useServerAuth = false; // Auf true setzen wenn Server verfügbar
        
        // Rollen-Definitionen
        this.roles = {
            GUEST: 'guest',      // Normaler Spieler
            TEACHER: 'teacher',  // Lehrer (nur Editor)
            ADMIN: 'admin'       // Admin (Editor + Stats + Alles)
        };
        
        // Berechtigungen pro Rolle
        this.permissions = {
            guest: ['play', 'feedback'],
            teacher: ['play', 'feedback', 'editor'],
            admin: ['play', 'feedback', 'editor', 'stats', 'user_management']
        };
        
        // Aktuelle Session
        this.currentUser = null;
        
        this.init();
    }
    
    init() {
        this.loadSession();
        this.initializeDefaultUsers();
        this.updateUI();
        console.log('🔐 Auth Manager initialized');
    }
    
    // =========================================================================
    // USER MANAGEMENT (LOCAL)
    // =========================================================================
    
    initializeDefaultUsers() {
        let users = this.getLocalUsers();
        
        // Erstelle Standard-Admin wenn keine Benutzer existieren
        if (users.length === 0) {
            users = [
                {
                    id: 'admin-1',
                    username: 'admin',
                    password: this.hashPassword('admin123'), // Einfaches Hashing
                    role: this.roles.ADMIN,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 'teacher-1',
                    username: 'lehrer',
                    password: this.hashPassword('lehrer123'),
                    role: this.roles.TEACHER,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            console.log('✅ Default users created: admin/admin123, lehrer/lehrer123');
        }
    }
    
    getLocalUsers() {
        const stored = localStorage.getItem(this.usersKey);
        return stored ? JSON.parse(stored) : [];
    }
    
    // Einfaches Password Hashing (für Lokal)
    hashPassword(password) {
        // Simpel aber ausreichend für lokale Nutzung
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(36);
    }
    
    // =========================================================================
    // AUTHENTICATION
    // =========================================================================
    
    async login(username, password) {
        try {
            // Versuche zuerst Server-Auth (wenn aktiviert)
            if (this.useServerAuth) {
                return await this.loginServer(username, password);
            }
            
            // Fallback: Lokale Authentifizierung
            return this.loginLocal(username, password);
            
        } catch (error) {
            console.error('❌ Login failed:', error);
            return {
                success: false,
                error: 'Login fehlgeschlagen. Bitte versuche es erneut.'
            };
        }
    }
    
    loginLocal(username, password) {
        const users = this.getLocalUsers();
        const hashedPassword = this.hashPassword(password);
        
        const user = users.find(u => 
            u.username.toLowerCase() === username.toLowerCase() && 
            u.password === hashedPassword
        );
        
        if (!user) {
            return {
                success: false,
                error: 'Falscher Benutzername oder Passwort!'
            };
        }
        
        // Erstelle Session
        const session = {
            userId: user.id,
            username: user.username,
            role: user.role,
            loginTime: new Date().toISOString(),
            token: this.generateToken()
        };
        
        // Speichere Session
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        this.currentUser = session;
        
        this.updateUI();
        this.logAudit('login', user.username);
        
        return {
            success: true,
            user: {
                username: user.username,
                role: user.role
            }
        };
    }
    
    async loginServer(username, password) {
        try {
            const response = await fetch(`${this.serverUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                return {
                    success: false,
                    error: data.error || 'Login fehlgeschlagen'
                };
            }
            
            // Speichere Session mit Server-Token
            const session = {
                userId: data.userId,
                username: data.username,
                role: data.role,
                loginTime: new Date().toISOString(),
                token: data.token,
                serverAuth: true
            };
            
            localStorage.setItem(this.storageKey, JSON.stringify(session));
            this.currentUser = session;
            
            this.updateUI();
            this.logAudit('login', username);
            
            return {
                success: true,
                user: {
                    username: data.username,
                    role: data.role
                }
            };
            
        } catch (error) {
            console.error('❌ Server login failed:', error);
            // Fallback zu lokaler Auth
            return this.loginLocal(username, password);
        }
    }
    
    logout() {
        if (this.currentUser) {
            this.logAudit('logout', this.currentUser.username);
        }
        
        localStorage.removeItem(this.storageKey);
        this.currentUser = null;
        this.updateUI();
        
        console.log('👋 User logged out');
    }
    
    loadSession() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.currentUser = JSON.parse(stored);
                
                // Validiere Session (optional Server-Check)
                if (this.currentUser.serverAuth && this.useServerAuth) {
                    this.validateServerSession();
                }
                
                console.log('✅ Session restored:', this.currentUser.username);
            } catch (e) {
                console.error('❌ Invalid session data');
                localStorage.removeItem(this.storageKey);
            }
        }
    }
    
    async validateServerSession() {
        if (!this.currentUser || !this.currentUser.token) return;
        
        try {
            const response = await fetch(`${this.serverUrl}/auth/validate`, {
                headers: {
                    'Authorization': `Bearer ${this.currentUser.token}`
                }
            });
            
            if (!response.ok) {
                console.warn('⚠️ Session invalid, logging out');
                this.logout();
            }
        } catch (error) {
            console.warn('⚠️ Could not validate session with server');
        }
    }
    
    generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    
    // =========================================================================
    // AUTHORIZATION & PERMISSIONS
    // =========================================================================
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getRole() {
        return this.currentUser ? this.currentUser.role : this.roles.GUEST;
    }
    
    hasPermission(permission) {
        const role = this.getRole();
        const rolePermissions = this.permissions[role] || this.permissions.guest;
        return rolePermissions.includes(permission);
    }
    
    canAccessEditor() {
        return this.hasPermission('editor');
    }
    
    canAccessStats() {
        return this.hasPermission('stats');
    }
    
    canManageUsers() {
        return this.hasPermission('user_management');
    }
    
    requiresAuth(feature) {
        const publicFeatures = ['play', 'feedback'];
        return !publicFeatures.includes(feature);
    }
    
    // =========================================================================
    // UI UPDATES
    // =========================================================================
    
    updateUI() {
        // Zeige/Verstecke Login/Logout Buttons
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userDisplay = document.getElementById('userDisplay');
        
        // Navigation Buttons (für Landing Page)
        const loginBtnNav = document.getElementById('loginBtnNav');
        const logoutBtnNav = document.getElementById('logoutBtnNav');
        const userDisplayNav = document.getElementById('userDisplayNav');
        
        if (this.isLoggedIn()) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-flex';
            if (loginBtnNav) loginBtnNav.style.display = 'none';
            if (logoutBtnNav) logoutBtnNav.style.display = 'inline-flex';
            
            if (userDisplay) {
                userDisplay.style.display = 'inline-flex';
                userDisplay.textContent = `👤 ${this.currentUser.username}`;
                userDisplay.title = `Rolle: ${this.getRoleLabel(this.currentUser.role)}`;
            }
            if (userDisplayNav) {
                userDisplayNav.style.display = 'inline-flex';
                userDisplayNav.textContent = `👤 ${this.currentUser.username}`;
                userDisplayNav.title = `Rolle: ${this.getRoleLabel(this.currentUser.role)}`;
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (loginBtnNav) loginBtnNav.style.display = 'inline-flex';
            if (logoutBtnNav) logoutBtnNav.style.display = 'none';
            if (userDisplay) userDisplay.style.display = 'none';
            if (userDisplayNav) userDisplayNav.style.display = 'none';
        }
        
        // Zeige/Verstecke Feature-Buttons basierend auf Berechtigungen
        this.updateFeatureButtons();
    }
    
    updateFeatureButtons() {
        // Editor Button
        const editorBtn = document.getElementById('openEditorBtn');
        if (editorBtn) {
            if (this.canAccessEditor()) {
                editorBtn.style.display = 'inline-flex';
                editorBtn.disabled = false;
            } else {
                editorBtn.style.display = 'none';
            }
        }
        
        // Stats Button
        const statsBtn = document.getElementById('openStatsBtn');
        if (statsBtn) {
            if (this.canAccessStats()) {
                statsBtn.style.display = 'inline-flex';
                statsBtn.disabled = false;
            } else {
                statsBtn.style.display = 'none';
            }
        }
        
        // Feedback bleibt für alle sichtbar
        const feedbackBtn = document.getElementById('openFeedbackBtn');
        if (feedbackBtn) {
            feedbackBtn.style.display = 'inline-flex';
        }
    }
    
    getRoleLabel(role) {
        const labels = {
            guest: 'Gast',
            teacher: 'Lehrer',
            admin: 'Administrator'
        };
        return labels[role] || 'Unbekannt';
    }
    
    // =========================================================================
    // REGISTRATION
    // =========================================================================
    
    register(username, password, role = this.roles.GUEST) {
        const users = this.getLocalUsers();
        
        // Prüfe ob Username bereits existiert
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            return {
                success: false,
                error: 'Benutzername bereits vergeben!'
            };
        }
        
        // Validierung
        if (username.length < 3) {
            return {
                success: false,
                error: 'Benutzername muss mindestens 3 Zeichen lang sein!'
            };
        }
        
        if (password.length < 6) {
            return {
                success: false,
                error: 'Passwort muss mindestens 6 Zeichen lang sein!'
            };
        }
        
        // Erstelle neuen User
        const newUser = {
            id: `user-${Date.now()}`,
            username: username,
            password: this.hashPassword(password),
            role: role,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
        
        this.logAudit('register', username);
        
        return {
            success: true,
            message: 'Registrierung erfolgreich! Du kannst dich jetzt anmelden.'
        };
    }
    
    // =========================================================================
    // AUDIT LOG
    // =========================================================================
    
    logAudit(action, username) {
        const auditLog = JSON.parse(localStorage.getItem('jeopardy_audit_log') || '[]');
        auditLog.push({
            action,
            username,
            timestamp: new Date().toISOString(),
            role: this.getRole()
        });
        
        // Behalte nur die letzten 100 Einträge
        if (auditLog.length > 100) {
            auditLog.shift();
        }
        
        localStorage.setItem('jeopardy_audit_log', JSON.stringify(auditLog));
    }
    
    getAuditLog() {
        if (!this.canManageUsers()) {
            console.warn('⚠️ Unauthorized access to audit log');
            return [];
        }
        return JSON.parse(localStorage.getItem('jeopardy_audit_log') || '[]');
    }
}

// ============================================================================= 
// INITIALIZE AUTH MANAGER                                                     
// ============================================================================= 

let authManager;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        authManager = new AuthManager();
        window.authManager = authManager;
        console.log('✅ Auth Manager loaded');
    });
} else {
    authManager = new AuthManager();
    window.authManager = authManager;
    console.log('✅ Auth Manager loaded');
}
