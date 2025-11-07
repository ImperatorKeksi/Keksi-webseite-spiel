/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                      📝 JEOPARDY FRAGEN-EDITOR                              ║
║                   Editor für Lehrer und Betreuer                            ║
║                                                                              ║
║  🎯 Zweck: Fragen und Kategorien verwalten                                 ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  📋 FUNKTIONEN:                                                              ║
║  ├── 📂 Kategorien erstellen, bearbeiten, löschen                          ║
║  ├── ❓ 20 Fragen pro Kategorie verwalten                                  ║
║  ├── 💾 LocalStorage Integration                                            ║
║  ├── 📥 Import/Export Funktion                                              ║
║  └── ✨ Einfache Bedienung für Nicht-Techniker                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// 📝 FRAGEN-EDITOR KLASSE                                                     
// ============================================================================= 
class QuestionEditor {
    constructor() {
        this.categories = [];
        this.currentCategoryId = null;
        this.customDataKey = 'jeopardy_custom_questions';
        
        this.init();
    }

    init() {
        this.loadCustomData();
        this.bindEventListeners();
        console.log('📝 Question Editor initialized');
    }

    bindEventListeners() {
        // Editor Screen Controls
        document.getElementById('openEditorBtn').addEventListener('click', () => this.openEditor());
        document.getElementById('closeEditorBtn').addEventListener('click', () => this.closeEditor());
        
        // Category Management
        document.getElementById('addCategoryBtn').addEventListener('click', () => this.addCategory());
        
        // Save and Reset
        document.getElementById('saveQuestionsBtn').addEventListener('click', () => this.saveQuestions());
        document.getElementById('resetQuestionsBtn').addEventListener('click', () => this.resetQuestions());
        
        // Import/Export
        document.getElementById('importQuestionsBtn').addEventListener('click', () => this.showImportModal());
        document.getElementById('exportQuestionsBtn').addEventListener('click', () => this.showExportModal());
        document.getElementById('closeImportExportBtn').addEventListener('click', () => this.closeImportExportModal());
        document.getElementById('cancelImportExportBtn').addEventListener('click', () => this.closeImportExportModal());
        document.getElementById('confirmImportBtn').addEventListener('click', () => this.confirmImport());
        document.getElementById('copyExportBtn').addEventListener('click', () => this.copyExportData());
        
        // Search Functionality
        const searchInput = document.getElementById('editorSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchQuestions(e.target.value));
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    e.target.value = '';
                    this.searchQuestions('');
                }
            });
        }
    }

    // =========================================================================
    // EDITOR NAVIGATION
    // =========================================================================
    
    openEditor() {
        document.getElementById('setupScreen').classList.add('hidden');
        document.getElementById('editorScreen').classList.remove('hidden');
        this.renderCategories();
    }

    closeEditor() {
        document.getElementById('editorScreen').classList.add('hidden');
        document.getElementById('setupScreen').classList.remove('hidden');
    }

    // =========================================================================
    // DATA MANAGEMENT
    // =========================================================================
    
    loadCustomData() {
        const savedData = localStorage.getItem(this.customDataKey);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                this.categories = parsed.categories || [];
                console.log('📥 Custom data loaded:', this.categories.length, 'categories');
            } catch (e) {
                console.error('❌ Error loading custom data:', e);
                this.categories = [];
            }
        } else {
            // Initialize with default structure if no custom data exists
            this.categories = this.getDefaultCategories();
        }
    }

    getDefaultCategories() {
        // Load from existing jeopardyData if available
        if (typeof jeopardyData !== 'undefined' && jeopardyData.categories) {
            return jeopardyData.categories.map((cat, index) => ({
                id: `cat-${Date.now()}-${index}`,
                name: cat.name,
                questions: cat.questions.map((q, qIndex) => ({
                    id: `q-${Date.now()}-${index}-${qIndex}`,
                    question: q.question,
                    answer: q.answer
                }))
            }));
        }
        
        // Return empty default structure
        return [];
    }

    saveToLocalStorage() {
        try {
            const data = {
                categories: this.categories,
                lastModified: new Date().toISOString()
            };
            localStorage.setItem(this.customDataKey, JSON.stringify(data));
            console.log('💾 Data saved to localStorage');
            
            // Notify game if it's running
            this.notifyGameOfChanges();
            
            return true;
        } catch (e) {
            console.error('❌ Error saving to localStorage:', e);
            alert('Fehler beim Speichern! Daten könnten zu groß sein.');
            return false;
        }
    }

    notifyGameOfChanges() {
        // Check if game exists and is active
        if (window.jeopardyGame && document.getElementById('gameScreen').classList.contains('hidden') === false) {
            console.log('🔄 Notifying game of category changes...');
            // Game will reload data on next start
        }
    }

    saveQuestions() {
        if (this.saveToLocalStorage()) {
            this.showNotification('✅ Fragen erfolgreich gespeichert!', 'success');
        }
    }

    resetQuestions() {
        if (confirm('Möchtest du wirklich alle benutzerdefinierten Fragen löschen und zu den Standardfragen zurückkehren?')) {
            localStorage.removeItem(this.customDataKey);
            this.categories = this.getDefaultCategories();
            this.currentCategoryId = null;
            this.renderCategories();
            this.showQuestionsPlaceholder();
            this.showNotification('🔄 Fragen wurden zurückgesetzt!', 'info');
        }
    }

    // =========================================================================
    // CATEGORY MANAGEMENT
    // =========================================================================
    
    renderCategories() {
        const container = document.getElementById('categoriesList');
        container.innerHTML = '';

        if (this.categories.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Noch keine Kategorien vorhanden.<br>Klicke auf "+ Neue Kategorie"</p>';
            return;
        }

        this.categories.forEach((category, index) => {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category-item';
            if (category.id === this.currentCategoryId) {
                categoryEl.classList.add('active');
            }

            const questionCount = category.questions ? category.questions.length : 0;
            const isFirst = index === 0;
            const isLast = index === this.categories.length - 1;

            categoryEl.innerHTML = `
                <div class="category-item-header">
                    <div class="category-order-buttons">
                        <button onclick="editor.moveCategoryUp('${category.id}')" 
                                ${isFirst ? 'disabled' : ''} 
                                title="Nach oben verschieben" 
                                class="btn-move-up">⬆️</button>
                        <button onclick="editor.moveCategoryDown('${category.id}')" 
                                ${isLast ? 'disabled' : ''} 
                                title="Nach unten verschieben" 
                                class="btn-move-down">⬇️</button>
                    </div>
                    <div class="category-main-info">
                        <div class="category-name">${this.escapeHtml(category.name)}</div>
                        <div class="category-info">${questionCount} / 20 Fragen</div>
                    </div>
                    <div class="category-actions">
                        <button onclick="editor.editCategoryName('${category.id}')" title="Umbenennen">✏️</button>
                        <button onclick="editor.deleteCategory('${category.id}')" title="Löschen">🗑️</button>
                    </div>
                </div>
            `;

            categoryEl.addEventListener('click', (e) => {
                // Don't trigger if clicking on action buttons
                if (e.target.tagName === 'BUTTON' || e.target.closest('.category-actions') || e.target.closest('.category-order-buttons')) {
                    return;
                }
                this.selectCategory(category.id);
            });

            container.appendChild(categoryEl);
        });
    }

    addCategory() {
        const name = prompt('Name der neuen Kategorie:');
        if (!name || name.trim() === '') {
            return;
        }

        const newCategory = {
            id: `cat-${Date.now()}`,
            name: name.trim(),
            questions: []
        };

        this.categories.push(newCategory);
        this.renderCategories();
        this.selectCategory(newCategory.id);
        this.saveToLocalStorage(); // Auto-save
        this.showNotification('✅ Kategorie hinzugefügt!', 'success');
    }

    editCategoryName(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return;

        const newName = prompt('Neuer Name für die Kategorie:', category.name);
        if (newName && newName.trim() !== '' && newName !== category.name) {
            category.name = newName.trim();
            this.renderCategories();
            if (this.currentCategoryId === categoryId) {
                this.renderQuestions();
            }
            this.saveToLocalStorage(); // Auto-save
            this.showNotification('✅ Kategorie umbenannt!', 'success');
        }
    }

    deleteCategory(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return;

        if (confirm(`Möchtest du die Kategorie "${category.name}" wirklich löschen? Alle Fragen gehen verloren!`)) {
            this.categories = this.categories.filter(c => c.id !== categoryId);
            if (this.currentCategoryId === categoryId) {
                this.currentCategoryId = null;
                this.showQuestionsPlaceholder();
            }
            this.renderCategories();
            this.saveToLocalStorage(); // Auto-save
            this.showNotification('🗑️ Kategorie gelöscht!', 'info');
        }
    }

    moveCategoryUp(categoryId) {
        const index = this.categories.findIndex(c => c.id === categoryId);
        if (index <= 0) return; // Already at the top or not found

        // Swap with previous category
        [this.categories[index - 1], this.categories[index]] = [this.categories[index], this.categories[index - 1]];
        
        this.renderCategories();
        this.saveToLocalStorage(); // Auto-save
        this.showNotification('⬆️ Kategorie nach oben verschoben', 'success');
    }

    moveCategoryDown(categoryId) {
        const index = this.categories.findIndex(c => c.id === categoryId);
        if (index === -1 || index >= this.categories.length - 1) return; // Already at the bottom or not found

        // Swap with next category
        [this.categories[index], this.categories[index + 1]] = [this.categories[index + 1], this.categories[index]];
        
        this.renderCategories();
        this.saveToLocalStorage(); // Auto-save
        this.showNotification('⬇️ Kategorie nach unten verschoben', 'success');
    }

    selectCategory(categoryId) {
        this.currentCategoryId = categoryId;
        this.renderCategories();
        this.renderQuestions();
    }

    // =========================================================================
    // QUESTION MANAGEMENT
    // =========================================================================
    
    renderQuestions() {
        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (!category) {
            this.showQuestionsPlaceholder();
            return;
        }

        document.getElementById('currentCategoryTitle').textContent = `Fragen: ${category.name}`;
        document.getElementById('questionCounter').textContent = `${category.questions.length} / 20 Fragen`;

        const container = document.getElementById('questionsEditor');
        container.innerHTML = '';

        // Render existing questions
        category.questions.forEach((question, index) => {
            const questionEl = this.createQuestionElement(question, index + 1);
            container.appendChild(questionEl);
        });

        // Add "New Question" button if less than 20 questions
        if (category.questions.length < 20) {
            const addBtn = document.createElement('button');
            addBtn.className = 'add-question-btn';
            addBtn.textContent = `+ Neue Frage hinzufügen (${category.questions.length}/20)`;
            addBtn.addEventListener('click', () => this.addQuestion());
            container.appendChild(addBtn);
        }
    }

    createQuestionElement(question, number) {
        const el = document.createElement('div');
        el.className = 'question-item';
        el.setAttribute('data-question-id', question.id);

        el.innerHTML = `
            <div class="question-header">
                <span class="question-number">Frage ${number}</span>
                <div class="question-actions">
                    <button class="btn-duplicate" onclick="editor.duplicateQuestion('${question.id}')" title="Frage duplizieren">📋 Duplizieren</button>
                    <button class="btn-delete" onclick="editor.deleteQuestion('${question.id}')" title="Frage löschen">🗑️ Löschen</button>
                </div>
            </div>
            <div class="question-form">
                <div class="form-group">
                    <label>Frage:</label>
                    <textarea 
                        data-field="question" 
                        data-question-id="${question.id}"
                        placeholder="Gib hier die Frage ein..."
                    >${this.escapeHtml(question.question)}</textarea>
                </div>
                <div class="form-group">
                    <label>Antwort:</label>
                    <input 
                        type="text" 
                        data-field="answer" 
                        data-question-id="${question.id}"
                        placeholder="Gib hier die Antwort ein..."
                        value="${this.escapeHtml(question.answer)}"
                    />
                </div>
            </div>
        `;

        // Add input listeners for auto-save
        el.querySelectorAll('[data-field]').forEach(input => {
            input.addEventListener('input', (e) => this.updateQuestionField(e.target));
        });

        return el;
    }

    addQuestion() {
        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (!category) return;

        if (category.questions.length >= 20) {
            alert('Maximum 20 Fragen pro Kategorie erreicht!');
            return;
        }

        const newQuestion = {
            id: `q-${Date.now()}`,
            question: '',
            answer: ''
        };

        category.questions.push(newQuestion);
        this.renderQuestions();
        
        // Scroll to new question
        setTimeout(() => {
            const lastQuestion = document.querySelector(`[data-question-id="${newQuestion.id}"]`);
            if (lastQuestion) {
                lastQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const firstInput = lastQuestion.querySelector('textarea');
                if (firstInput) firstInput.focus();
            }
        }, 100);
    }

    updateQuestionField(input) {
        const questionId = input.getAttribute('data-question-id');
        const field = input.getAttribute('data-field');
        const value = input.value;

        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (!category) return;

        const question = category.questions.find(q => q.id === questionId);
        if (!question) return;

        question[field] = value;
        
        // Update counter
        document.getElementById('questionCounter').textContent = `${category.questions.length} / 20 Fragen`;
    }

    deleteQuestion(questionId) {
        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (!category) return;

        if (confirm('Möchtest du diese Frage wirklich löschen?')) {
            category.questions = category.questions.filter(q => q.id !== questionId);
            this.renderQuestions();
            this.renderCategories(); // Update question count
            this.showNotification('🗑️ Frage gelöscht!', 'info');
        }
    }

    duplicateQuestion(questionId) {
        const category = this.categories.find(c => c.id === this.currentCategoryId);
        if (!category) return;

        // Check if we've reached the maximum number of questions
        if (category.questions.length >= 20) {
            alert('⚠️ Maximum von 20 Fragen pro Kategorie erreicht!');
            return;
        }

        // Find the question to duplicate
        const originalQuestion = category.questions.find(q => q.id === questionId);
        if (!originalQuestion) return;

        // Create a duplicate with a new ID
        const duplicatedQuestion = {
            id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            question: originalQuestion.question,
            answer: originalQuestion.answer
        };

        // Find the index of the original question and insert the duplicate right after it
        const originalIndex = category.questions.findIndex(q => q.id === questionId);
        category.questions.splice(originalIndex + 1, 0, duplicatedQuestion);

        // Re-render and scroll to the duplicated question
        this.renderQuestions();
        this.renderCategories(); // Update question count
        
        setTimeout(() => {
            const duplicatedEl = document.querySelector(`[data-question-id="${duplicatedQuestion.id}"]`);
            if (duplicatedEl) {
                duplicatedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Add a brief highlight animation
                duplicatedEl.style.animation = 'highlightPulse 1s ease-in-out';
            }
        }, 100);

        this.showNotification('📋 Frage dupliziert!', 'success');
    }

    showQuestionsPlaceholder() {
        document.getElementById('currentCategoryTitle').textContent = 'Fragen';
        document.getElementById('questionCounter').textContent = '0 / 20 Fragen';
        document.getElementById('questionsEditor').innerHTML = `
            <div class="editor-placeholder">
                <p>👈 Wähle eine Kategorie aus, um Fragen zu bearbeiten</p>
            </div>
        `;
    }

    // =========================================================================
    // IMPORT/EXPORT
    // =========================================================================
    
    showImportModal() {
        document.getElementById('importExportTitle').textContent = '📥 Fragen importieren';
        document.getElementById('importExportData').value = '';
        document.getElementById('importExportData').placeholder = 'Füge hier die JSON-Daten ein...';
        document.getElementById('confirmImportBtn').classList.remove('hidden');
        document.getElementById('copyExportBtn').classList.add('hidden');
        document.getElementById('importExportModal').classList.remove('hidden');
    }

    showExportModal() {
        const exportData = {
            version: '1.0',
            exported: new Date().toISOString(),
            categories: this.categories
        };
        
        document.getElementById('importExportTitle').textContent = '📤 Fragen exportieren';
        document.getElementById('importExportData').value = JSON.stringify(exportData, null, 2);
        document.getElementById('importExportData').placeholder = '';
        document.getElementById('confirmImportBtn').classList.add('hidden');
        document.getElementById('copyExportBtn').classList.remove('hidden');
        document.getElementById('importExportModal').classList.remove('hidden');
    }

    closeImportExportModal() {
        document.getElementById('importExportModal').classList.add('hidden');
    }

    confirmImport() {
        const jsonText = document.getElementById('importExportData').value.trim();
        if (!jsonText) {
            alert('Bitte füge gültige JSON-Daten ein!');
            return;
        }

        try {
            const data = JSON.parse(jsonText);
            
            // Validate structure
            if (!data.categories || !Array.isArray(data.categories)) {
                throw new Error('Ungültiges Format: categories fehlt');
            }

            // Validate categories
            for (const cat of data.categories) {
                if (!cat.name || !Array.isArray(cat.questions)) {
                    throw new Error('Ungültiges Kategorien-Format');
                }
                if (!cat.id) {
                    cat.id = `cat-${Date.now()}-${Math.random()}`;
                }
                for (const q of cat.questions) {
                    if (typeof q.question !== 'string' || typeof q.answer !== 'string') {
                        throw new Error('Ungültiges Fragen-Format');
                    }
                    if (!q.id) {
                        q.id = `q-${Date.now()}-${Math.random()}`;
                    }
                }
            }

            // Import successful
            this.categories = data.categories;
            this.currentCategoryId = null;
            this.saveToLocalStorage();
            this.renderCategories();
            this.showQuestionsPlaceholder();
            this.closeImportExportModal();
            this.showNotification('✅ Fragen erfolgreich importiert!', 'success');

        } catch (e) {
            alert('Fehler beim Importieren:\n' + e.message);
            console.error('Import error:', e);
        }
    }

    copyExportData() {
        const textarea = document.getElementById('importExportData');
        textarea.select();
        document.execCommand('copy');
        this.showNotification('📋 Daten in Zwischenablage kopiert!', 'success');
    }

    // =========================================================================
    // UTILITY FUNCTIONS
    // =========================================================================
    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // =========================================================================
    // PUBLIC API FOR GAME
    // =========================================================================
    
    getCustomQuestions() {
        // Return custom questions if available, otherwise return default
        if (this.categories.length === 0) {
            return null;
        }

        return {
            categories: this.categories.map(cat => ({
                name: cat.name,
                questions: cat.questions.map((q, index) => ({
                    question: q.question,
                    answer: q.answer,
                    points: (index % 5 + 1) * 100 // Assign points 100-500 cyclically
                }))
            }))
        };
    }

    hasCustomQuestions() {
        return this.categories.length > 0;
    }

    // =========================================================================
    // SEARCH FUNCTIONALITY
    // =========================================================================
    
    searchQuestions(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const resultCount = document.getElementById('searchResultCount');
        
        if (!term) {
            // Clear search - show all questions
            this.clearSearchHighlights();
            resultCount.textContent = '';
            return;
        }
        
        let matchCount = 0;
        
        // Search through all categories and questions
        this.categories.forEach(category => {
            category.questions.forEach(question => {
                const questionText = question.question.toLowerCase();
                const answerText = question.answer.toLowerCase();
                
                if (questionText.includes(term) || answerText.includes(term)) {
                    matchCount++;
                }
            });
        });
        
        // Update result count
        if (matchCount > 0) {
            resultCount.textContent = `${matchCount} ${matchCount === 1 ? 'Treffer' : 'Treffer'}`;
            resultCount.style.color = '#22c55e';
        } else {
            resultCount.textContent = 'Keine Treffer';
            resultCount.style.color = '#ef4444';
        }
        
        // Highlight matches in current view
        this.highlightSearchMatches(term);
    }
    
    highlightSearchMatches(term) {
        // Remove existing highlights
        this.clearSearchHighlights();
        
        if (!term) return;
        
        // Find and highlight all matching text in question inputs
        const questionsEditor = document.getElementById('questionsEditor');
        if (!questionsEditor) return;
        
        const inputs = questionsEditor.querySelectorAll('input[type="text"], textarea');
        
        inputs.forEach(input => {
            const text = input.value.toLowerCase();
            if (text.includes(term)) {
                // Highlight the input field
                input.classList.add('search-highlight');
                
                // Scroll to first match
                if (!this.hasScrolledToMatch) {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    this.hasScrolledToMatch = true;
                    setTimeout(() => this.hasScrolledToMatch = false, 1000);
                }
            }
        });
    }
    
    clearSearchHighlights() {
        const highlightedElements = document.querySelectorAll('.search-highlight');
        highlightedElements.forEach(el => el.classList.remove('search-highlight'));
    }
}

// ============================================================================= 
// INITIALIZE EDITOR                                                          
// ============================================================================= 

// Create global editor instance
let editor;

// Initialize after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        editor = new QuestionEditor();
        window.editor = editor; // Make it globally accessible
    });
} else {
    editor = new QuestionEditor();
    window.editor = editor;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
