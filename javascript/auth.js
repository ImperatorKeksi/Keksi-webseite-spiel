/*
    ╔══════════════════════════════════════════════════╗
    ║  🔐 AUTHENTICATION - Login & Rollen             ║
    ║  Benutzer-Authentifizierung mit Berechtigungen  ║
    ║                                                  ║
    ║  Entwickler: Nico Kaschube                      ║
    ║  Berufsbildungswerk im Oberlinhaus Potsdam | 2025                  ║
    ╚══════════════════════════════════════════════════╝
*/

// ==================== AUTH MANAGER ====================
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
        this.bindProfileNavigation();
    }
    
    // =========================================================================
    // USER MANAGEMENT (LOCAL)
    // =========================================================================
    
    initializeDefaultUsers() {
        let users = this.getLocalUsers();
        
        // Erstelle Standard-Accounts wenn keine Benutzer existieren
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
                },
                {
                    id: 'schueler-1',
                    username: 'schueler',
                    password: this.hashPassword('schueler123'),
                    role: this.roles.GUEST,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem(this.usersKey, JSON.stringify(users));
        }
    }
    
    getLocalUsers() {
        try {
            const stored = localStorage.getItem(this.usersKey);
            if (!stored) {
                console.warn('⚠️ Keine Nutzer im LocalStorage gefunden');
                return [];
            }
            
            const users = JSON.parse(stored);
            
            // Validierung: Prüfen ob Array
            if (!Array.isArray(users)) {
                console.error('❌ LocalStorage Daten sind kein Array');
                return [];
            }
            
            return users;
        } catch (error) {
            console.error('❌ Fehler beim Laden der Nutzer:', error);
            console.error('LocalStorage könnte korrupt sein. Erstelle Backup...');
            
            // Backup erstellen falls möglich
            try {
                const corruptData = localStorage.getItem(this.usersKey);
                localStorage.setItem(this.usersKey + '_backup', corruptData);
                console.log('💾 Backup erstellt: ' + this.usersKey + '_backup');
            } catch (backupError) {
                console.error('❌ Konnte kein Backup erstellen:', backupError);
            }
            
            return [];
        }
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
        try {
            if (this.currentUser) {
                this.logAudit('logout', this.currentUser.username);
            }
            
            localStorage.removeItem(this.storageKey);
            this.currentUser = null;
            this.updateUI();
            
            console.log('✅ Logout erfolgreich');
            console.log('👋 User logged out');
        } catch (error) {
            console.error('❌ Fehler beim Logout:', error);
            // Trotzdem UI updaten
            this.currentUser = null;
            try {
                this.updateUI();
            } catch (uiError) {
                console.error('❌ UI-Update nach Logout fehlgeschlagen:', uiError);
            }
        }
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
        // Sammle alle bekannten Button-/Display-IDs (seitenübergreifend)
        const loginIds = ['loginBtn','loginBtnNav','loginBtnGame','loginBtnAR','loginBtnNR','loginBtnSLF','loginBtnDB','loginBtnTimer','loginBtnZG'];
        const logoutIds = ['logoutBtn','logoutBtnNav','logoutBtnGame','logoutBtnAR','logoutBtnNR','logoutBtnSLF','logoutBtnDB','logoutBtnTimer','logoutBtnZG'];
        const userDisplayIds = ['userDisplay','userDisplayNav','userDisplayGame','userDisplayAR','userDisplayNR','userDisplaySLF','userDisplayDB','userDisplayTimer','userDisplayZG'];

        const logins = loginIds.map(id => document.getElementById(id)).filter(Boolean);
        const logouts = logoutIds.map(id => document.getElementById(id)).filter(Boolean);
        const displays = userDisplayIds.map(id => document.getElementById(id)).filter(Boolean);

        if (this.isLoggedIn()) {
            logins.forEach(el => el.style.display = 'none');
            logouts.forEach(el => el.style.display = 'inline-flex');
            displays.forEach(el => {
                el.style.display = 'inline-flex';
                el.textContent = `${this.currentUser.username}`;
                el.title = `Rolle: ${this.getRoleLabel(this.currentUser.role)}`;
            });
        } else {
            logins.forEach(el => el.style.display = 'inline-flex');
            logouts.forEach(el => el.style.display = 'none');
            displays.forEach(el => {
                el.style.display = 'none';
            });
        }

        // Zeige/Verstecke Feature-Buttons basierend auf Berechtigungen
        this.updateFeatureButtons();
        
        // Nach UI-Update: sicherstellen, dass Klick auf Profil zur Dashboard-Seite führt
        this.bindProfileNavigation();
    }

    // Profil-Klick: zum Dashboard navigieren
    bindProfileNavigation() {
        try {
            const profileEls = Array.from(document.querySelectorAll('[id^="userDisplay"]'));
            profileEls.forEach(el => {
                // Doppelte Listener vermeiden
                if (el._dashboardBound) return;
                el._dashboardBound = true;
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    if (!this.isLoggedIn()) return;
                    const inSeiten = window.location.pathname.includes('/seiten/');
                    const target = inSeiten ? 'dashboard.html' : 'seiten/dashboard.html';
                    window.location.href = target;
                });
            });
        } catch (e) {
            console.warn('⚠️ Konnte Profil-Navigation nicht binden:', e);
        }
    }

    // (Entfernt) Zusätzlich angehängter Dashboard-Link wird nicht mehr verwendet
    
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
        
        // Analytics Button (nur für Admins)
        const analyticsBtn = document.getElementById('openAnalyticsBtn');
        if (analyticsBtn) {
            if (this.currentUser && this.currentUser.role === 'admin') {
                analyticsBtn.style.display = 'inline-flex';
                analyticsBtn.disabled = false;
            } else {
                analyticsBtn.style.display = 'none';
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
    
    // =========================================================================
    // QUESTION STORAGE (Account-basierte Fragen-Speicherung)
    // =========================================================================
    
    saveQuestions(userId, questions) {
        try {
            const key = `jeopardy_user_questions_${userId}`;
            localStorage.setItem(key, JSON.stringify(questions));
            console.log(`✅ Fragen gespeichert für User ${userId}`);
            return { success: true };
        } catch (error) {
            console.error('❌ Fehler beim Speichern:', error);
            return { success: false, error: error.message };
        }
    }
    
    loadQuestions(userId) {
        try {
            const key = `jeopardy_user_questions_${userId}`;
            const stored = localStorage.getItem(key);
            if (stored) {
                const questions = JSON.parse(stored);
                console.log(`✅ Fragen geladen für User ${userId}`);
                return { success: true, questions };
            } else {
                console.log(`ℹ️ Keine gespeicherten Fragen für User ${userId}`);
                return { success: true, questions: null };
            }
        } catch (error) {
            console.error('❌ Fehler beim Laden:', error);
            return { success: false, error: error.message };
        }
    }
    
    deleteQuestions(userId) {
        try {
            const key = `jeopardy_user_questions_${userId}`;
            localStorage.removeItem(key);
            console.log(`✅ Fragen gelöscht für User ${userId}`);
            return { success: true };
        } catch (error) {
            console.error('❌ Fehler beim Löschen:', error);
            return { success: false, error: error.message };
        }
    }
    
    // =========================================================================
    // ADMIN: PASSWORD RESET
    // =========================================================================
    
    resetUserPassword(username, newPassword) {
        // Nur Admin darf Passwörter zurücksetzen
        if (!this.canManageUsers()) {
            console.warn('⚠️ Unauthorized password reset attempt');
            return { success: false, error: 'Keine Berechtigung!' };
        }
        
        try {
            const users = this.getLocalUsers();
            const userIndex = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
            
            if (userIndex === -1) {
                return { success: false, error: 'Benutzer nicht gefunden!' };
            }
            
            // Neues Passwort hashen
            const hashedPassword = this.hashPassword(newPassword);
            users[userIndex].password = hashedPassword;
            
            // Speichern
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            
            // Audit-Log
            this.logAudit({
                action: 'password_reset',
                target: username,
                by: this.currentUser?.username || 'admin',
                timestamp: new Date().toISOString()
            });
            
            console.log(`✅ Passwort zurückgesetzt für: ${username}`);
            return { success: true };
            
        } catch (error) {
            console.error('❌ Fehler beim Passwort-Reset:', error);
            return { success: false, error: error.message };
        }
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
    });
} else {
    authManager = new AuthManager();
    window.authManager = authManager;
}
