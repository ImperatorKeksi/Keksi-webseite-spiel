/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                   💬 FEEDBACK & BUG REPORT SYSTEM                           ║
║                    Feedback-Formular Manager                                 ║
║                                                                              ║
║  🎯 Zweck: Feedback und Bug Reports sammeln und per E-Mail senden          ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  ⚙️ SETUP ERFORDERLICH:                                                     ║
║  → Zeile 182: Ersetze YOUR_EMAIL@example.com mit deiner echten E-Mail!     ║
║  → FormSubmit.co wird verwendet (kostenlos, keine Registrierung nötig)     ║
║  → Beim ersten Submit: E-Mail bestätigen, danach funktioniert es           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// 💬 FEEDBACK-MANAGER KLASSE                                                  
// ============================================================================= 

// ============================================================================= 
// 📦 FEEDBACK QUEUE (OFFLINE-SPEICHERUNG)                                    
// ============================================================================= 
class FeedbackQueue {
    constructor() {
        this.queueKey = 'feedback_queue';
        this.maxQueueSize = 50; // Max 50 Feedbacks in Queue
    }

    addToQueue(feedbackData) {
        try {
            const queue = this.getQueue();
            
            // Prevent queue overflow
            if (queue.length >= this.maxQueueSize) {
                console.warn('⚠️ Feedback queue is full, removing oldest entry');
                queue.shift(); // Remove oldest
            }
            
            const queueItem = {
                ...feedbackData,
                queuedAt: new Date().toISOString(),
                status: 'pending',
                retries: 0
            };
            
            queue.push(queueItem);
            localStorage.setItem(this.queueKey, JSON.stringify(queue));
            console.log('💾 Feedback added to queue:', queue.length, 'items');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to add to queue:', error);
            return false;
        }
    }

    getQueue() {
        try {
            const data = localStorage.getItem(this.queueKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('❌ Failed to read queue:', error);
            return [];
        }
    }

    removeFromQueue(index) {
        try {
            const queue = this.getQueue();
            queue.splice(index, 1);
            localStorage.setItem(this.queueKey, JSON.stringify(queue));
            console.log('🗑️ Removed item from queue');
            return true;
        } catch (error) {
            console.error('❌ Failed to remove from queue:', error);
            return false;
        }
    }

    clearQueue() {
        localStorage.removeItem(this.queueKey);
        console.log('🧹 Queue cleared');
    }

    getQueueSize() {
        return this.getQueue().length;
    }

    async sendQueuedFeedback() {
        if (!navigator.onLine) {
            console.log('📴 Offline - skipping queue processing');
            return;
        }

        const queue = this.getQueue();
        const pending = queue.filter(item => item.status === 'pending');
        
        if (pending.length === 0) {
            console.log('✅ No pending feedback to send');
            return;
        }

        console.log(`🔄 Processing ${pending.length} queued feedbacks...`);

        for (let i = 0; i < queue.length; i++) {
            const item = queue[i];
            
            if (item.status !== 'pending') continue;
            if (item.retries >= 3) {
                console.warn(`⚠️ Max retries reached for item ${i}, marking as failed`);
                queue[i].status = 'failed';
                continue;
            }

            try {
                // Attempt to send
                const success = await this.sendSingleFeedback(item);
                
                if (success) {
                    console.log(`✅ Sent queued feedback ${i + 1}/${pending.length}`);
                    this.removeFromQueue(i);
                    i--; // Adjust index after removal
                } else {
                    queue[i].retries++;
                    queue[i].lastRetry = new Date().toISOString();
                }
            } catch (error) {
                console.error(`❌ Failed to send feedback ${i}:`, error);
                queue[i].retries++;
            }
        }

        // Save updated queue
        localStorage.setItem(this.queueKey, JSON.stringify(queue));
    }

    async sendSingleFeedback(feedbackData) {
        // Reuse the same sending logic
        try {
            const typeEmoji = {
                'bug': '🐛',
                'feedback': '💡',
                'feature': '✨',
                'question': '❓',
                'other': '📝'
            };

            const emailBody = {
                _subject: `${typeEmoji[feedbackData.type] || '📝'} IT-Jeopardy: ${feedbackData.type.toUpperCase()} von ${feedbackData.name}`,
                '📅 Zeitstempel': feedbackData.timestamp,
                '👤 Name': feedbackData.name,
                '📋 Typ': feedbackData.type,
                '📝 Beschreibung': feedbackData.description
            };

            if (feedbackData.priority) {
                emailBody['⚠️ Dringlichkeit'] = feedbackData.priority;
            }
            if (feedbackData.category) {
                emailBody['🎯 Bereich'] = feedbackData.category;
            }
            if (feedbackData.steps) {
                emailBody['🔄 Schritte'] = feedbackData.steps;
            }

            emailBody['💻 System'] = feedbackData.system;
            emailBody['📐 Viewport'] = feedbackData.viewport;
            emailBody['🔢 Version'] = feedbackData.version;
            emailBody['🕐 In Queue seit'] = feedbackData.queuedAt;

            const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(emailBody)
            });

            return response.ok;
        } catch (error) {
            console.error('Send error:', error);
            return false;
        }
    }
}

// ============================================================================= 
// 💬 FEEDBACK-MANAGER KLASSE                                                  
// ============================================================================= 
class FeedbackManager {
    constructor() {
        this.feedbackQueue = new FeedbackQueue();
        this.init();
    }

    init() {
        console.log('🔄 FeedbackManager.init() called');
        try {
            // Wait for DOM to be fully ready before binding
            if (document.readyState === 'loading') {
                console.log('⏳ DOM loading, waiting...');
                document.addEventListener('DOMContentLoaded', () => {
                    console.log('✅ DOM ready, binding events...');
                    this.bindEventListeners();
                    this.setupCharCounter();
                    this.checkOnlineStatus();
                    this.setupOnlineListener();
                    console.log('💬 Feedback Manager initialized (after DOM ready)');
                });
            } else {
                // DOM already loaded
                console.log('✅ DOM already ready, binding events with delay...');
                setTimeout(() => {
                    this.bindEventListeners();
                    this.setupCharCounter();
                    this.checkOnlineStatus();
                    this.setupOnlineListener();
                    console.log('💬 Feedback Manager initialized');
                }, 100); // Small delay to ensure all elements are ready
            }
        } catch (error) {
            console.error('❌ Error in FeedbackManager.init():', error);
        }
    }

    setupOnlineListener() {
        // Listen for online/offline events
        window.addEventListener('online', () => {
            console.log('🌐 Connection restored!');
            this.showConnectionStatus('online');
            // Try to send queued feedback
            setTimeout(() => this.feedbackQueue.sendQueuedFeedback(), 1000);
        });

        window.addEventListener('offline', () => {
            console.log('📴 Connection lost!');
            this.showConnectionStatus('offline');
        });
    }

    checkOnlineStatus() {
        const queueSize = this.feedbackQueue.getQueueSize();
        if (queueSize > 0) {
            console.log(`📬 ${queueSize} feedback(s) in queue`);
            if (navigator.onLine) {
                // Try to send queued items
                setTimeout(() => this.feedbackQueue.sendQueuedFeedback(), 2000);
            }
        }
    }

    showConnectionStatus(status) {
        const message = status === 'online' 
            ? '🌐 Verbindung wiederhergestellt! Sende gespeicherte Feedbacks...'
            : '📴 Offline - Feedbacks werden lokal gespeichert';
        
        const notification = document.createElement('div');
        notification.className = 'connection-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${status === 'online' ? '#10b981' : '#f59e0b'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    bindEventListeners() {
        try {
            console.log('🔄 Binding event listeners...');
            
            // Wait for button to exist
            const openBtn = document.getElementById('openFeedbackBtn');
            if (!openBtn) {
                console.warn('⚠️ Feedback button not found yet, retrying in 200ms...');
                setTimeout(() => this.bindEventListeners(), 200);
                return;
            }

            console.log('✅ Feedback button found:', openBtn);

            // Open/Close Modal
            openBtn.addEventListener('click', () => {
                console.log('🖱️ Feedback button clicked!');
                this.openModal();
            });
            
            const closeBtn = document.getElementById('closeFeedbackBtn');
            const cancelBtn = document.getElementById('cancelFeedbackBtn');
            
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            } else {
                console.warn('⚠️ Close button not found');
            }
            
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => this.closeModal());
            } else {
                console.warn('⚠️ Cancel button not found');
            }
            
            // Submit Feedback
            const submitBtn = document.getElementById('submitFeedbackBtn');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => this.submitFeedback());
            } else {
                console.warn('⚠️ Submit button not found');
            }
            
            // Type change - show priority for bugs
            const typeSelect = document.getElementById('feedbackType');
            if (typeSelect) {
                typeSelect.addEventListener('change', (e) => {
                    const isBug = e.target.value === 'bug';
                    const priorityGroup = document.getElementById('priorityGroup');
                    const categoryGroup = document.getElementById('categoryGroup');
                    const stepsGroup = document.getElementById('stepsGroup');
                    
                    if (priorityGroup) priorityGroup.style.display = isBug ? 'block' : 'none';
                    if (categoryGroup) categoryGroup.style.display = isBug ? 'block' : 'none';
                    if (stepsGroup) stepsGroup.style.display = isBug ? 'block' : 'none';
                });
            } else {
                console.warn('⚠️ Type select not found');
            }
            
            console.log('✅ Feedback event listeners bound successfully');
        } catch (error) {
            console.error('❌ Error binding event listeners:', error);
        }
    }

    setupCharCounter() {
        const textarea = document.getElementById('feedbackDescription');
        const counter = document.getElementById('charCounter');
        
        if (!textarea || !counter) {
            console.warn('⚠️ Char counter elements not found');
            return;
        }
        
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            const max = 1500;
            counter.textContent = `${length} / ${max} Zeichen`;
            
            // Color coding
            counter.classList.remove('warning', 'error');
            if (length > max * 0.95) {
                counter.classList.add('error');
            } else if (length > max * 0.8) {
                counter.classList.add('warning');
            }
        });
    }

    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        
        let browserName = 'Unknown';
        let browserVersion = '';
        let os = 'Unknown OS';
        
        // Detect Browser
        if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || '';
        } else if (userAgent.indexOf('Edg') > -1) {
            browserName = 'Edge';
            browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || '';
        } else if (userAgent.indexOf('Chrome') > -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || '';
        } else if (userAgent.indexOf('Safari') > -1) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || '';
        }
        
        // Detect OS
        if (userAgent.indexOf('Windows NT 10.0') > -1) os = 'Windows 10/11';
        else if (userAgent.indexOf('Windows NT 6.3') > -1) os = 'Windows 8.1';
        else if (userAgent.indexOf('Windows NT 6.2') > -1) os = 'Windows 8';
        else if (userAgent.indexOf('Windows NT 6.1') > -1) os = 'Windows 7';
        else if (userAgent.indexOf('Mac OS X') > -1) os = 'macOS';
        else if (userAgent.indexOf('Linux') > -1) os = 'Linux';
        else if (userAgent.indexOf('Android') > -1) os = 'Android';
        else if (userAgent.indexOf('iOS') > -1) os = 'iOS';
        
        // Detect if mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? '📱 Mobile' : '💻 Desktop';
        
        return {
            browser: `${browserName} ${browserVersion}`,
            os: os,
            deviceType: deviceType,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            timestamp: new Date().toLocaleString('de-DE')
        };
    }

    openModal() {
        console.log('📂 Opening feedback modal...');
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.resetForm();
            console.log('✅ Modal opened');
        } else {
            console.error('❌ Modal not found!');
        }
    }

    closeModal() {
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    resetForm() {
        const form = document.getElementById('feedbackForm');
        const priorityGroup = document.getElementById('priorityGroup');
        const categoryGroup = document.getElementById('categoryGroup');
        const stepsGroup = document.getElementById('stepsGroup');
        const counter = document.getElementById('charCounter');
        
        if (form) form.reset();
        if (priorityGroup) priorityGroup.style.display = 'none';
        if (categoryGroup) categoryGroup.style.display = 'none';
        if (stepsGroup) stepsGroup.style.display = 'none';
        if (counter) {
            counter.textContent = '0 / 1500 Zeichen';
            counter.classList.remove('warning', 'error');
        }
    }

    async submitFeedback() {
        console.log('📤 Submitting feedback...');
        
        // Get form data
        const type = document.getElementById('feedbackType').value;
        const description = document.getElementById('feedbackDescription').value.trim();
        const name = document.getElementById('feedbackName').value.trim() || 'Anonym';
        
        // Validate required fields
        if (!type) {
            alert('❌ Bitte wähle einen Typ aus!');
            return;
        }
        
        if (!description) {
            alert('❌ Bitte beschreibe dein Anliegen!');
            return;
        }
        
        if (description.length < 10) {
            alert('❌ Bitte gib eine ausführlichere Beschreibung an (mindestens 10 Zeichen)!');
            return;
        }
        
        // Get bug-specific data if applicable
        const isBug = type === 'bug';
        const priority = isBug ? document.getElementById('bugPriority')?.value || 'medium' : null;
        const category = isBug ? document.getElementById('bugCategory')?.value || 'other' : null;
        const steps = isBug ? document.getElementById('bugSteps')?.value.trim() || '' : null;
        
        // Validate bug category
        if (isBug && !category) {
            alert('❌ Bei Bug-Meldungen bitte den Bereich auswählen!');
            return;
        }
        
        // Get automatic browser info
        const browserInfo = this.getBrowserInfo();
        
        // Collect optimized feedback data
        const feedbackData = {
            // User Input
            name: name,
            type: type,
            description: description,
            
            // Bug-specific (only if type === 'bug')
            ...(isBug && {
                priority: priority,
                category: category,
                steps: steps || 'Keine Schritte angegeben'
            }),
            
            // Technical Info (compact)
            system: `${browserInfo.deviceType} | ${browserInfo.browser} | ${browserInfo.os}`,
            viewport: browserInfo.viewport,
            timestamp: browserInfo.timestamp,
            version: '2.0.1'
        };
        
        console.log('📊 Feedback data:', feedbackData);
        
        // Show loading
        const submitBtn = document.getElementById('submitFeedbackBtn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '⏳ Wird gesendet...';
        submitBtn.disabled = true;
        
        try {
            // Send to FormSubmit (free service, no registration needed)
            // WICHTIG: Ersetze YOUR_EMAIL@example.com mit deiner echten E-Mail-Adresse!
            const typeEmoji = {
                'bug': '🐛',
                'feedback': '💡',
                'feature': '✨',
                'question': '❓',
                'other': '📝'
            };
            
            const emailBody = {
                _subject: `${typeEmoji[type]} IT-Jeopardy: ${type.toUpperCase()} von ${name}`,
                '📅 Zeitstempel': feedbackData.timestamp,
                '👤 Name': feedbackData.name,
                '📋 Typ': feedbackData.type,
                '📝 Beschreibung': feedbackData.description
            };
            
            // Add bug-specific fields
            if (isBug) {
                emailBody['⚠️ Dringlichkeit'] = feedbackData.priority;
                emailBody['🎯 Bereich'] = feedbackData.category;
                if (feedbackData.steps) {
                    emailBody['🔄 Schritte'] = feedbackData.steps;
                }
            }
            
            // Add technical info
            emailBody['💻 System'] = feedbackData.system;
            emailBody['📐 Viewport'] = feedbackData.viewport;
            emailBody['🔢 Version'] = feedbackData.version;
            
            const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(emailBody)
            });
            
            if (response.ok) {
                console.log('✅ Feedback sent successfully!');
                alert('✅ Feedback erfolgreich gesendet! Vielen Dank!');
                this.closeModal();
                this.resetForm();
            } else {
                throw new Error('Server antwortet nicht');
            }
        } catch (error) {
            console.error('❌ Feedback-Fehler:', error);
            
            // Save to queue for later
            const queued = this.feedbackQueue.addToQueue(feedbackData);
            
            if (queued) {
                const queueSize = this.feedbackQueue.getQueueSize();
                alert(`📴 Server nicht erreichbar.\n\n💾 Feedback wurde lokal gespeichert (${queueSize} in Queue).\n\nWir versuchen es automatisch erneut, sobald du online bist!`);
                this.closeModal();
                this.resetForm();
            } else {
                // Queue failed, fallback to download
                alert('⚠️ Speicherung fehlgeschlagen. Feedback wird als Datei heruntergeladen.');
                this.generateFeedbackFile(feedbackData);
            }
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    generateFeedbackFile(data) {
        // Create formatted text content
        const typeLabels = {
            'feedback': '💡 Feedback / Verbesserungsvorschlag',
            'bug': '🐛 Bug Report / Fehler',
            'feature': '✨ Feature-Wunsch',
            'question': '❓ Frage / Hilfe'
        };
        
        const priorityLabels = {
            'low': '🟢 Niedrig',
            'medium': '🟡 Mittel',
            'high': '🟠 Hoch',
            'critical': '🔴 Kritisch'
        };
        
        let content = `═══════════════════════════════════════════════════════════════
        IT-JEOPARDY SPIEL - FEEDBACK & BUG REPORT
═══════════════════════════════════════════════════════════════

📅 Datum: ${new Date(data.timestamp).toLocaleString('de-DE')}
👤 Name: ${data.name}
📧 E-Mail: ${data.email}
📋 Typ: ${typeLabels[data.type] || data.type}
${data.priority !== 'N/A' ? `⚠️ Priorität: ${priorityLabels[data.priority] || data.priority}\n` : ''}
═══════════════════════════════════════════════════════════════

BESCHREIBUNG:
${data.description}

═══════════════════════════════════════════════════════════════

SYSTEM-INFORMATIONEN:
🌐 Browser: ${data.browser}
🔗 URL: ${data.url}
📦 App-Version: ${data.appVersion}

═══════════════════════════════════════════════════════════════

Vielen Dank für dein Feedback!

Bitte sende diese Datei an: nico.kaschube@example.com
(oder erstelle ein Issue auf GitHub)

═══════════════════════════════════════════════════════════════
`;
        
        // Create JSON version for technical analysis
        const jsonContent = JSON.stringify(data, null, 2);
        
        // Create download
        this.downloadFile(content, `feedback_${Date.now()}.txt`);
        
        // Show success message
        this.showSuccessMessage();
        
        // Close modal
        setTimeout(() => {
            this.closeModal();
        }, 2000);
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    showSuccessMessage() {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'feedback-success-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 30px 50px;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                z-index: 10001;
                text-align: center;
                animation: scaleIn 0.3s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 15px;">✅</div>
                <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Vielen Dank!</h3>
                <p style="margin: 0; font-size: 1.1rem;">Dein Feedback wurde heruntergeladen!</p>
                <p style="margin: 10px 0 0 0; font-size: 0.9rem; opacity: 0.9;">Die Datei findest du in deinem Download-Ordner.</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'scaleOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

// ============================================================================= 
// INITIALIZE FEEDBACK MANAGER                                                 
// ============================================================================= 

// Add animations CSS first
try {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            from {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
            to {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        
        @keyframes scaleOut {
            from {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            to {
                transform: translate(-50%, -50%) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
} catch (error) {
    console.error('Failed to add feedback animations:', error);
}

// Initialize FeedbackManager
console.log('🔄 Loading FeedbackManager...');

function initializeFeedbackManager() {
    try {
        console.log('🔄 Initializing FeedbackManager...');
        window.feedbackManager = new FeedbackManager();
        console.log('✅ FeedbackManager loaded successfully!', window.feedbackManager);
    } catch (error) {
        console.error('❌ Failed to initialize FeedbackManager:', error);
        console.error('Error details:', error.message, error.stack);
    }
}

// Initialize based on document state
if (document.readyState === 'loading') {
    console.log('⏳ Document still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initializeFeedbackManager);
} else {
    console.log('✅ Document already loaded, initializing immediately...');
    initializeFeedbackManager();
}
