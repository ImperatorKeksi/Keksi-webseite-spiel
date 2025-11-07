/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                       🎮 GAME-MODULE & CORE-LOGIC                           ║
║                     Zentrale Spiellogik & Zustandsverwaltung                ║
║                                                                              ║
║  🎯 Zweck: Modulare Spiel-Architektur                                      ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║  💡 Verwendete Patterns: Observer, State-Management, Events                  ║
║                                                                              ║
║  🏗️ MODULE:                                                                 ║
║  ├── 📊 GameStateManager - Spielzustand & Events                           ║
║  ├── 📈 PerformanceMonitor - Leistungsüberwachung                          ║
║  ├── ⚡ LazyLoadManager - Ressourcen-Management                            ║
║  └── 🔄 EventEmitter - Kommunikation zwischen Modulen                      ║
║                                                                              ║
║  📝 DESIGN PATTERNS:                                                         ║
║  • Observer Pattern für Events                                              ║
║  • Singleton Pattern für Manager                                            ║
║  • Module Pattern für Kapselung                                             ║
║  • Strategy Pattern für Spielmodi                                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

/* ============================================================================= */
/* 🎮 CORE GAME-LOGIC MODULE                                                   */
/* ============================================================================= */

// ===================================
// SPIEL-ZUSTAND VERWALTUNG          
// ===================================
class GameStateManager {
    constructor() {
        this.state = {
            phase: 'setup',      // setup, playing, paused, finished
            round: 1,
            currentPlayer: 0,
            score: {},
            usedQuestions: new Set(),
            dailyDoubles: new Set(),
            gameMode: null,
            difficulty: 'azubi1'
        };
        
        this.listeners = {};
        
        if (window.debugLog) {
            debugLog.log('info', 'game', '🎮 GameStateManager initialisiert');
        }
    }
    
    // 📡 Event-System für Zustandsänderungen
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
        
        if (window.debugLog) {
            debugLog.log('debug', 'game', `📡 Event: ${event}`, data);
        }
    }
    
    // 🔄 Zustand ändern
    setState(updates) {
        const oldState = { ...this.state };
        Object.assign(this.state, updates);
        
        this.emit('stateChanged', {
            oldState,
            newState: this.state,
            updates
        });
        
        if (window.debugLog) {
            debugLog.log('info', 'game', '🔄 Zustand geändert', updates);
        }
    }
    
    // 📊 Zustand abrufen
    getState() {
        return { ...this.state };
    }
}

// ===================================
// PERFORMANCE MONITOR               
// ===================================
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            frameCount: 0,
            fps: 0,
            memoryUsage: 0,
            renderTime: 0,
            lastUpdate: performance.now()
        };
        
        this.isMonitoring = false;
        this.animationFrame = null;
        
        if (window.debugLog) {
            debugLog.log('info', 'performance', '⚡ PerformanceMonitor bereit');
        }
    }
    
    // 📊 Monitoring starten
    startMonitoring() {
        if (this.isMonitoring) return;
        
        this.isMonitoring = true;
        this.updateMetrics();
        
        if (window.debugLog) {
            debugLog.log('info', 'performance', '📊 Performance-Monitoring gestartet');
        }
    }
    
    // ⏹️ Monitoring stoppen
    stopMonitoring() {
        this.isMonitoring = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (window.debugLog) {
            debugLog.log('info', 'performance', '⏹️ Performance-Monitoring gestoppt');
        }
    }
    
    // 🔄 Metriken aktualisieren
    updateMetrics() {
        if (!this.isMonitoring) return;
        
        const now = performance.now();
        const deltaTime = now - this.metrics.lastUpdate;
        
        // FPS berechnen
        this.metrics.frameCount++;
        if (deltaTime >= 1000) {
            this.metrics.fps = Math.round((this.metrics.frameCount * 1000) / deltaTime);
            this.metrics.frameCount = 0;
            this.metrics.lastUpdate = now;
            
            // Speicher-Nutzung (falls verfügbar)
            if (performance.memory) {
                this.metrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576); // MB
            }
            
            // FPS Counter anzeigen
            if (DEBUG_CONFIG.showFPS) {
                this.displayFPS();
            }
        }
        
        this.animationFrame = requestAnimationFrame(() => this.updateMetrics());
    }
    
    // 📺 FPS Counter anzeigen
    displayFPS() {
        let fpsDisplay = document.getElementById('fps-counter');
        if (!fpsDisplay) {
            fpsDisplay = document.createElement('div');
            fpsDisplay.id = 'fps-counter';
            fpsDisplay.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(fpsDisplay);
        }
        
        const { fps, memoryUsage } = this.metrics;
        const fpsColor = fps >= 30 ? '#00ff00' : fps >= 15 ? '#ffff00' : '#ff0000';
        
        fpsDisplay.innerHTML = `
            <div style="color: ${fpsColor}">FPS: ${fps}</div>
            ${memoryUsage > 0 ? `<div>RAM: ${memoryUsage} MB</div>` : ''}
        `;
    }
    
    // 📈 Metriken abrufen
    getMetrics() {
        return { ...this.metrics };
    }
}

// ===================================
// LAZY LOADING MANAGER              
// ===================================
class LazyLoadManager {
    constructor() {
        this.loadedResources = new Set();
        this.loadingPromises = new Map();
        
        if (window.debugLog) {
            debugLog.log('info', 'performance', '📦 LazyLoadManager initialisiert');
        }
    }
    
    // 📦 Resource lazy laden
    async loadResource(name, loadFunction) {
        if (this.loadedResources.has(name)) {
            return true;
        }
        
        if (this.loadingPromises.has(name)) {
            return this.loadingPromises.get(name);
        }
        
        const promise = this.performLoad(name, loadFunction);
        this.loadingPromises.set(name, promise);
        
        return promise;
    }
    
    async performLoad(name, loadFunction) {
        try {
            if (window.debugLog) {
                debugLog.log('info', 'performance', `📦 Lade Resource: ${name}`);
            }
            
            const startTime = performance.now();
            await loadFunction();
            const loadTime = performance.now() - startTime;
            
            this.loadedResources.add(name);
            this.loadingPromises.delete(name);
            
            if (window.debugLog) {
                debugLog.log('info', 'performance', `✅ Resource geladen: ${name} (${loadTime.toFixed(2)}ms)`);
            }
            
            return true;
        } catch (error) {
            this.loadingPromises.delete(name);
            
            if (window.debugLog) {
                debugLog.log('error', 'performance', `❌ Fehler beim Laden: ${name}`, error);
            }
            
            throw error;
        }
    }
    
    // 🧹 Cache leeren
    clearCache() {
        this.loadedResources.clear();
        this.loadingPromises.clear();
        
        if (window.debugLog) {
            debugLog.log('info', 'performance', '🧹 Resource-Cache geleert');
        }
    }
}

// ===================================
// GLOBALE INSTANZEN                 
// ===================================
window.gameState = new GameStateManager();
window.performanceMonitor = new PerformanceMonitor();
window.lazyLoader = new LazyLoadManager();

// 🔧 Debug-Hilfsfunktionen
if (DEBUG_CONFIG.enabled) {
    window.startPerformanceMonitoring = () => performanceMonitor.startMonitoring();
    window.stopPerformanceMonitoring = () => performanceMonitor.stopMonitoring();
    window.getGameState = () => gameState.getState();
}