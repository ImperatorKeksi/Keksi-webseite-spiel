/*
    ╔═══════════════════════════════════════════════════╗
    ║  🎨 THEME CONTROLLER                              ║
    ║  Dark/Light/Auto Mode mit LocalStorage           ║
    ║                                                   ║
    ║  Entwickler: Nico Kaschube                       ║
    ║  Berufsbildungswerk im Oberlinhaus Potsdam | 2025║
    ╚═══════════════════════════════════════════════════╝
*/

class ThemeController {
    constructor() {
        this.STORAGE_KEY = 'lehrertools-theme';
        this.themes = {
            dark: {
                name: 'Dark Mode',
                icon: '🌙',
                description: 'Dunkles Design für bessere Lesbarkeit'
            },
            light: {
                name: 'Light Mode',
                icon: '☀️',
                description: 'Helles Design für Tageslicht'
            },
            auto: {
                name: 'Auto Mode',
                icon: '🔄',
                description: 'Automatisch basierend auf Systemeinstellung'
            }
        };
        
        this.init();
    }

    init() {
        // Lade gespeichertes Theme SOFORT (vor DOM)
        this.loadTheme();
        
        // Rest nach DOM-Load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupThemeToggle();
                this.setupSystemThemeListener();
            });
        } else {
            this.setupThemeToggle();
            this.setupSystemThemeListener();
        }
    }

    // ========================================
    // THEME LADEN & ANWENDEN
    // ========================================
    loadTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.applyTheme(savedTheme);
    }

    applyTheme(theme) {
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.currentTheme = theme;
        
        // Meta Theme Color anpassen
        this.updateMetaThemeColor();
        
        console.log(`🎨 Theme applied: ${theme}`);
    }

    getCurrentTheme() {
        return this.currentTheme || localStorage.getItem(this.STORAGE_KEY) || 'dark';
    }

    getActiveTheme() {
        // Gibt das TATSÄCHLICH aktive Theme zurück (dark/light, nicht auto)
        return document.documentElement.getAttribute('data-theme');
    }

    // ========================================
    // THEME TOGGLE BUTTON
    // ========================================
    setupThemeToggle() {
        // Prüfe ob bereits vorhanden
        if (document.getElementById('theme-toggle')) return;

        const toggle = document.createElement('div');
        toggle.id = 'theme-toggle';
        toggle.className = 'theme-toggle';
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('aria-label', 'Theme ändern');
        toggle.setAttribute('tabindex', '0');
        
        this.updateToggleContent(toggle);
        
        // Click Handler
        toggle.addEventListener('click', () => this.showThemePicker());
        
        // Keyboard Handler
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.showThemePicker();
            }
        });
        
        document.body.appendChild(toggle);
    }

    updateToggleContent(toggle) {
        const currentTheme = this.getCurrentTheme();
        const theme = this.themes[currentTheme];
        
        toggle.innerHTML = `
            <span class="theme-icon">${theme.icon}</span>
            <span class="theme-label">${theme.name}</span>
        `;
    }

    // ========================================
    // THEME PICKER MODAL
    // ========================================
    showThemePicker() {
        // Prüfe ob bereits offen
        if (document.getElementById('theme-picker-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'theme-picker-modal';
        modal.className = 'theme-picker-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'theme-picker-title');
        
        const currentTheme = this.getCurrentTheme();
        
        modal.innerHTML = `
            <div class="theme-picker-content">
                <h2 id="theme-picker-title" class="theme-picker-title">🎨 Theme auswählen</h2>
                <p class="theme-picker-subtitle">Wähle dein bevorzugtes Farbschema</p>
                
                <div class="theme-options">
                    ${Object.keys(this.themes).map(themeKey => `
                        <div class="theme-option ${currentTheme === themeKey ? 'active' : ''}" 
                             data-theme="${themeKey}"
                             role="button"
                             tabindex="0"
                             aria-pressed="${currentTheme === themeKey}">
                            <div class="theme-preview theme-preview-${themeKey}"></div>
                            <span class="theme-option-icon">${this.themes[themeKey].icon}</span>
                            <div class="theme-option-name">${this.themes[themeKey].name}</div>
                            <div class="theme-option-desc">${this.themes[themeKey].description}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="theme-picker-info">
                    ℹ️ Deine Auswahl wird automatisch gespeichert
                </div>
                
                <button class="theme-picker-close">Schließen</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus Management
        const firstOption = modal.querySelector('.theme-option');
        firstOption?.focus();
        
        // Theme Option Click
        modal.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                this.selectTheme(theme);
            });
            
            // Keyboard Support
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const theme = option.getAttribute('data-theme');
                    this.selectTheme(theme);
                }
            });
        });
        
        // Close Button
        modal.querySelector('.theme-picker-close').addEventListener('click', () => {
            this.closeThemePicker();
        });
        
        // Click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeThemePicker();
            }
        });
        
        // ESC to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeThemePicker();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Animation
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
        });
    }

    selectTheme(theme) {
        this.applyTheme(theme);
        
        // Update Toggle Button
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            this.updateToggleContent(toggle);
        }
        
        // Update Active State im Modal
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            option.setAttribute('aria-pressed', 'false');
        });
        
        const selectedOption = document.querySelector(`[data-theme="${theme}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
            selectedOption.setAttribute('aria-pressed', 'true');
        }
        
        // Notification
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification(
                `${this.themes[theme].icon} ${this.themes[theme].name} aktiviert`,
                'success',
                2000
            );
        }
        
        // Close after short delay
        setTimeout(() => {
            this.closeThemePicker();
        }, 800);
    }

    closeThemePicker() {
        const modal = document.getElementById('theme-picker-modal');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    }

    // ========================================
    // SYSTEM THEME LISTENER
    // ========================================
    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (this.getCurrentTheme() === 'auto') {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                this.updateMetaThemeColor();
                
                console.log(`🔄 System theme changed to ${newTheme}`);
                
                if (typeof AnimationsController !== 'undefined') {
                    AnimationsController.showNotification(
                        `🔄 Theme automatisch auf ${newTheme === 'dark' ? 'Dark' : 'Light'} gewechselt`,
                        'info',
                        2500
                    );
                }
            }
        });
    }

    // ========================================
    // META THEME COLOR
    // ========================================
    updateMetaThemeColor() {
        const isDark = this.getActiveTheme() === 'dark';
        const color = isDark ? '#0a0a0a' : '#ffffff';
        
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }
        metaTheme.content = color;
    }

    // ========================================
    // STATIC UTILITIES
    // ========================================
    static isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    static isLightMode() {
        return document.documentElement.getAttribute('data-theme') === 'light';
    }

    static getTheme() {
        return document.documentElement.getAttribute('data-theme');
    }

    static setTheme(theme) {
        if (window.themeController) {
            window.themeController.applyTheme(theme);
        }
    }

    // ========================================
    // THEME ANALYTICS
    // ========================================
    trackThemeChange(theme) {
        console.log(`📊 Theme changed to: ${theme}`);
        // TODO: Send to analytics service
    }
}

// ========================================
// AUTO-INIT
// ========================================
const themeController = new ThemeController();
window.themeController = themeController;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeController;
}
