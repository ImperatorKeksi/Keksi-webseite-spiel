/*
    ╔═══════════════════════════════════════════════════╗
    ║  🎛️ DASHBOARD CONTROLLER                          ║
    ║  Personal Dashboard, Favorites, Quick Access     ║
    ║                                                   ║
    ║  Entwickler: Nico Kaschube                       ║
    ║  Berufsbildungswerk im Oberlinhaus Potsdam | 2025║
    ╚═══════════════════════════════════════════════════╝
*/

class DashboardController {
    constructor() {
        this.STORAGE_KEY = 'lehrertools-dashboard';
        this.data = this.loadData();
        this.tools = this.getAvailableTools();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.render();
                this.setupClock();
            });
        } else {
            this.render();
            this.setupClock();
        }
    }

    // ========================================
    // DATA MANAGEMENT
    // ========================================
    getDefaultData() {
        return {
            version: '2.0.0',
            favorites: ['game', 'timer', 'notenrechner'],
            quickAccess: ['game', 'timer', 'stadt-land-fluss', 'zufallsgenerator'],
            savedConfigs: [],
            widgets: {
                clock: { enabled: true, position: 0 },
                stats: { enabled: true, position: 1 },
                recentActivity: { enabled: true, position: 2 }
            },
            customization: {
                theme: 'default',
                layout: 'grid'
            }
        };
    }

    loadData() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                return { ...this.getDefaultData(), ...JSON.parse(saved) };
            }
        } catch (error) {
            console.error('❌ Dashboard load error:', error);
        }
        return this.getDefaultData();
    }

    saveData() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        } catch (error) {
            console.error('❌ Dashboard save error:', error);
        }
    }

    // ========================================
    // AVAILABLE TOOLS
    // ========================================
    getAvailableTools() {
        return {
            'game': {
                name: 'IT Jeopardy',
                icon: '🎮',
                url: '../seiten/game.html',
                description: 'Spiele das IT-Quiz',
                category: 'games'
            },
            'timer': {
                name: 'Timer',
                icon: '⏰',
                url: '../seiten/timer.html',
                description: 'Countdown-Timer',
                category: 'tools'
            },
            'stadt-land-fluss': {
                name: 'Stadt-Land-Fluss',
                icon: '🌍',
                url: '../seiten/stadt-land-fluss.html',
                description: 'Klassisches Spiel',
                category: 'games'
            },
            'zufallsgenerator': {
                name: 'Zufallsgenerator',
                icon: '🎲',
                url: '../seiten/zufallsgenerator.html',
                description: 'Zufallszahlen & Listen',
                category: 'tools'
            },
            'notenrechner': {
                name: 'Notenrechner',
                icon: '📊',
                url: '../seiten/notenrechner.html',
                description: 'Notenschlüssel berechnen',
                category: 'tools'
            },
            'aufgabenroulette': {
                name: 'Aufgabenroulette',
                icon: '🎡',
                url: '../seiten/aufgabenroulette.html',
                description: 'Zufällige Aufgaben',
                category: 'tools'
            }
        };
    }

    // ========================================
    // RENDER FUNCTIONS
    // ========================================
    render() {
        this.renderQuickAccess();
        this.renderFavorites();
        this.renderRecentActivity();
        this.renderSavedConfigs();
        this.renderStatsOverview();
        this.renderWidgets();
    }

    renderQuickAccess() {
        const container = document.getElementById('quick-access');
        if (!container) return;

        const html = this.data.quickAccess.map(toolId => {
            const tool = this.tools[toolId];
            if (!tool) return '';
            
            return `
                <a href="${tool.url}" class="quick-access-card">
                    <div class="card-icon">${tool.icon}</div>
                    <div class="card-content">
                        <h4 class="card-title">${tool.name}</h4>
                        <p class="card-desc">${tool.description}</p>
                    </div>
                </a>
            `;
        }).join('');

        container.innerHTML = html || '<p class="empty-state">Keine Schnellzugriffe vorhanden</p>';
    }

    renderFavorites() {
        const container = document.getElementById('favorites');
        if (!container) return;

        const html = this.data.favorites.map(toolId => {
            const tool = this.tools[toolId];
            if (!tool) return '';
            
            return `
                <a href="${tool.url}" class="favorite-card">
                    <div class="favorite-icon">${tool.icon}</div>
                    <h4 class="favorite-title">${tool.name}</h4>
                    <button class="favorite-remove" onclick="event.preventDefault(); dashboardController.removeFavorite('${toolId}')" aria-label="Aus Favoriten entfernen">
                        ×
                    </button>
                </a>
            `;
        }).join('');

        container.innerHTML = html || '<p class="empty-state">Noch keine Favoriten gespeichert</p>';
    }

    renderRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;

        // Get from statistics if available
        if (window.statsController) {
            const recent = window.statsController.getRecentActivity(5);
            
            const html = recent.map(activity => {
                const tool = this.tools[activity.name];
                const icon = tool ? tool.icon : '📌';
                const name = tool ? tool.name : activity.name;
                
                return `
                    <div class="activity-card">
                        <span class="activity-icon">${icon}</span>
                        <div class="activity-content">
                            <h5 class="activity-name">${name}</h5>
                            <span class="activity-time">${this.formatTimeAgo(activity.timestamp)}</span>
                        </div>
                        ${tool ? `<a href="${tool.url}" class="activity-btn">Öffnen</a>` : ''}
                    </div>
                `;
            }).join('');

            container.innerHTML = html || '<p class="empty-state">Keine Aktivität vorhanden</p>';
        } else {
            container.innerHTML = '<p class="empty-state">Statistiken werden geladen...</p>';
        }
    }

    renderSavedConfigs() {
        const container = document.getElementById('saved-configs');
        if (!container) return;

        const html = this.data.savedConfigs.map((config, index) => `
            <div class="config-card">
                <div class="config-header">
                    <h4 class="config-name">${config.name}</h4>
                    <span class="config-tool">${this.tools[config.tool]?.icon} ${this.tools[config.tool]?.name}</span>
                </div>
                <p class="config-desc">${config.description || 'Keine Beschreibung'}</p>
                <div class="config-actions">
                    <button class="btn btn-primary btn-sm" onclick="dashboardController.loadConfig(${index})">
                        Laden
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="dashboardController.deleteConfig(${index})">
                        Löschen
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = html || '<p class="empty-state">Keine Konfigurationen gespeichert</p>';
    }

    renderStatsOverview() {
        const container = document.getElementById('stats-overview');
        if (!container) return;

        if (window.statsController) {
            const stats = window.statsController.getStats();
            const jeopardy = stats.games.jeopardy;
            
            const html = `
                <div class="stat-overview-card">
                    <div class="stat-icon">🎮</div>
                    <div class="stat-value">${jeopardy.gamesPlayed}</div>
                    <div class="stat-label">Spiele gespielt</div>
                </div>
                <div class="stat-overview-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${jeopardy.correctAnswers}</div>
                    <div class="stat-label">Richtige Antworten</div>
                </div>
                <div class="stat-overview-card">
                    <div class="stat-icon">🏆</div>
                    <div class="stat-value">${jeopardy.highscore}</div>
                    <div class="stat-label">Höchste Punktzahl</div>
                </div>
                <div class="stat-overview-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${window.statsController.getAccuracyRate()}%</div>
                    <div class="stat-label">Genauigkeit</div>
                </div>
            `;
            
            container.innerHTML = html;
        } else {
            container.innerHTML = '<p class="empty-state">Statistiken werden geladen...</p>';
        }
    }

    renderWidgets() {
        const container = document.getElementById('widgets');
        if (!container) return;

        const enabledWidgets = Object.entries(this.data.widgets)
            .filter(([_, widget]) => widget.enabled)
            .sort((a, b) => a[1].position - b[1].position);

        // Placeholder widgets
        const html = enabledWidgets.map(([name, _]) => {
            switch (name) {
                case 'clock':
                    return '<div class="widget-card">🕐 Uhr Widget (Coming Soon)</div>';
                case 'stats':
                    return '<div class="widget-card">📊 Statistik Widget (Coming Soon)</div>';
                case 'recentActivity':
                    return '<div class="widget-card">🕒 Aktivitäten Widget (Coming Soon)</div>';
                default:
                    return '';
            }
        }).join('');

        container.innerHTML = html || '<p class="empty-state">Keine Widgets aktiviert</p>';
    }

    // ========================================
    // CLOCK & TIME
    // ========================================
    setupClock() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    updateClock() {
        const now = new Date();
        
        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        const timeEl = document.getElementById('current-time');
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }

    // ========================================
    // FAVORITES MANAGEMENT
    // ========================================
    addFavorite(toolId) {
        if (!this.data.favorites.includes(toolId)) {
            this.data.favorites.push(toolId);
            this.saveData();
            this.renderFavorites();
            
            if (typeof AnimationsController !== 'undefined') {
                AnimationsController.showNotification('⭐ Zu Favoriten hinzugefügt', 'success', 2000);
            }
        }
    }

    removeFavorite(toolId) {
        this.data.favorites = this.data.favorites.filter(id => id !== toolId);
        this.saveData();
        this.renderFavorites();
        
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification('Aus Favoriten entfernt', 'info', 2000);
        }
    }

    showEditFavorites() {
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification('⭐ Favoriten-Editor kommt bald!', 'info', 3000);
        }
    }

    // ========================================
    // CONFIG MANAGEMENT
    // ========================================
    saveConfig(tool, name, config) {
        this.data.savedConfigs.push({
            tool,
            name,
            config,
            description: '',
            created: new Date().toISOString()
        });
        this.saveData();
        this.renderSavedConfigs();
        
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification('💾 Konfiguration gespeichert', 'success', 2000);
        }
    }

    loadConfig(index) {
        const config = this.data.savedConfigs[index];
        if (!config) return;
        
        // Redirect to tool with config
        const tool = this.tools[config.tool];
        if (tool) {
            window.location.href = `${tool.url}?config=${encodeURIComponent(JSON.stringify(config.config))}`;
        }
    }

    deleteConfig(index) {
        if (confirm('Möchtest du diese Konfiguration wirklich löschen?')) {
            this.data.savedConfigs.splice(index, 1);
            this.saveData();
            this.renderSavedConfigs();
            
            if (typeof AnimationsController !== 'undefined') {
                AnimationsController.showNotification('🗑️ Konfiguration gelöscht', 'warning', 2000);
            }
        }
    }

    showConfigManager() {
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification('💾 Konfigurations-Manager kommt bald!', 'info', 3000);
        }
    }

    // ========================================
    // WIDGET MANAGEMENT
    // ========================================
    toggleWidget(widgetName) {
        if (this.data.widgets[widgetName]) {
            this.data.widgets[widgetName].enabled = !this.data.widgets[widgetName].enabled;
            this.saveData();
            this.renderWidgets();
        }
    }

    showWidgetManager() {
        if (typeof AnimationsController !== 'undefined') {
            AnimationsController.showNotification('🎛️ Widget-Manager kommt bald!', 'info', 3000);
        }
    }

    // ========================================
    // HELPERS
    // ========================================
    formatTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const seconds = Math.floor((now - past) / 1000);
        
        if (seconds < 60) return 'Gerade eben';
        if (seconds < 3600) return `vor ${Math.floor(seconds / 60)}min`;
        if (seconds < 86400) return `vor ${Math.floor(seconds / 3600)}h`;
        return `vor ${Math.floor(seconds / 86400)}d`;
    }

    // ========================================
    // PUBLIC API
    // ========================================
    getData() {
        return this.data;
    }

    resetDashboard() {
        if (confirm('⚠️ Möchtest du das Dashboard wirklich zurücksetzen?')) {
            this.data = this.getDefaultData();
            this.saveData();
            this.render();
            
            if (typeof AnimationsController !== 'undefined') {
                AnimationsController.showNotification('🔄 Dashboard zurückgesetzt', 'warning', 3000);
            }
        }
    }
}

// ========================================
// AUTO-INIT
// ========================================
let dashboardController;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        dashboardController = new DashboardController();
        window.dashboardController = dashboardController;
    });
} else {
    dashboardController = new DashboardController();
    window.dashboardController = dashboardController;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardController;
}
