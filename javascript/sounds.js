/*
    ╔══════════════════════════════════════════════════╗
    ║  🔊 SOUND ENGINE - Synthetische Audio-Gen.      ║
    ║  Web Audio API für programmatische Sounds       ║
    ║                                                  ║
    ║  Entwickler: Nico Kaschube                      ║
    ║  Berufsbildungswerk im Oberlinhaus Potsdam | 2025                  ║
    ╚══════════════════════════════════════════════════╝
*/

// ==================== SOUND MANAGER ====================
class SoundManager {
    constructor() {
        this.enabled = true;
        this.masterVolume = 0.7; // 🎵 Master-Lautstärke (0-1)
        this.sounds = {};
        this.audioContext = null;
        this.backgroundMusic = null; // 🎼 Hintergrundmusik
        this.fadeIntervals = new Map(); // 📉 Fade-Animationen
        this.soundQueue = []; // 🔄 Sound-Warteschlange
        this.initializeSounds();
        
        // 📊 Debug-Logging
        console.log('🎵 SoundManager initialisiert');
    }

    initializeSounds() {
        // Create audio context for better sound control
        // AudioContext wird erst nach User-Interaktion erstellt (Browser-Policy)
        try {
            // Lazy initialization - wird beim ersten play() erstellt
            this.audioContext = null;
        } catch (e) {
            console.log('Web Audio API not supported');
        }

        // Sounds werden NICHT hier generiert, sondern bei play()
        // da AudioContext erst nach User-Interaktion verfügbar ist
    }

    // 🚀 Performance: Preload nur die wichtigsten Sounds
    preloadEssentialSounds() {
        const essentialSounds = ['click', 'correct', 'wrong'];
        essentialSounds.forEach(soundName => {
            if (this.sounds[soundName]) {
                // Sounds sind bereits generiert, keine weitere Aktion nötig
                console.log(`✅ Sound '${soundName}' ready`);
            }
        });
    }

    // ===================================
    // LAUTSTÄRKE-MANAGEMENT             
    // ===================================
    
    // 🎵 Master-Lautstärke setzen (0-100)
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(100, volume)) / 100;
        
        // Hintergrundmusik-Lautstärke anpassen
        if (this.backgroundMusic && this.backgroundMusic.gainNode) {
            this.backgroundMusic.gainNode.gain.value = this.masterVolume * 0.3; // BG-Musik leiser
        }
    }
    
    // 🔊 Lautstärke abrufen
    getMasterVolume() {
        return Math.round(this.masterVolume * 100);
    }
    
    // 🔇 Stumm schalten
    mute() {
        this.previousVolume = this.masterVolume;
        this.setMasterVolume(0);
    }
    
    // 🔊 Stumm-Modus aufheben
    unmute() {
        const volume = this.previousVolume || 70;
        this.setMasterVolume(volume);
    }
    
    // 🎵 Sound-Test spielen
    testSound() {
        if (!this.enabled) return;
        this.playSound('correct', this.masterVolume);
    }

    generateSounds() {
        // ===================================
        // SOUND-GENERIERUNG                 
        // ===================================
        
        // Click Sound - Short beep
        this.sounds.click = this.createTone(800, 0.1, 'sine');
        
        // Correct Sound - Ascending melody
        this.sounds.correct = this.createMelody([
            {freq: 523, duration: 0.15}, // C5
            {freq: 659, duration: 0.15}, // E5
            {freq: 784, duration: 0.3}   // G5
        ]);
        
        // Wrong Sound - Buzzer
        this.sounds.wrong = this.createTone(150, 0.5, 'sawtooth');
        
        // Winner Sound - Victory fanfare
        this.sounds.winner = this.createMelody([
            {freq: 523, duration: 0.2}, // C5
            {freq: 659, duration: 0.2}, // E5
            {freq: 784, duration: 0.2}, // G5
            {freq: 1047, duration: 0.4} // C6
        ]);
        
        // Daily Double Sound - Dramatic chord
        this.sounds.dailyDouble = this.createChord([523, 659, 784], 1.0);
        
        // Theme Sound - Jeopardy-like melody
        this.sounds.theme = this.createMelody([
            {freq: 392, duration: 0.3}, // G4
            {freq: 440, duration: 0.3}, // A4
            {freq: 494, duration: 0.3}, // B4
            {freq: 523, duration: 0.6}, // C5
            {freq: 494, duration: 0.3}, // B4
            {freq: 440, duration: 0.3}, // A4
            {freq: 392, duration: 0.6}  // G4
        ]);
    }

    createTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext) return null;
        
        return () => {
            if (!this.enabled) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = waveType;
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }

    createMelody(notes) {
        if (!this.audioContext) return null;
        
        return () => {
            if (!this.enabled) return;
            
            let startTime = this.audioContext.currentTime;
            
            notes.forEach(note => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(note.freq, startTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + note.duration);
                
                startTime += note.duration;
            });
        };
    }

    createChord(frequencies, duration) {
        if (!this.audioContext) return null;
        
        return () => {
            if (!this.enabled) return;
            
            frequencies.forEach(freq => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + duration);
            });
        };
    }

    play(soundName) {
        if (!this.enabled) return;
        
        try {
            // Erstelle AudioContext beim ersten Aufruf (nach User-Interaktion)
            if (!this.audioContext) {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    console.log('🎵 AudioContext initialisiert');
                    // Jetzt können wir die Sounds generieren
                    this.generateSounds();
                } catch (e) {
                    console.warn('AudioContext konnte nicht erstellt werden:', e);
                    return;
                }
            }
            
            // Resume audio context if suspended (required by some browsers)
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Sound abspielen
            if (this.sounds[soundName]) {
                this.sounds[soundName]();
            }
        } catch (error) {
            console.log('Sound playback error:', error);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    isEnabled() {
        return this.enabled;
    }
}

// Export for use in main script
window.SoundManager = SoundManager;