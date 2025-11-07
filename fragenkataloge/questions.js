/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                      📚 JEOPARDY FRAGEN-DATENBANK                           ║
║                        Allgemeinwissen Fragenkatalog                         ║
║                                                                              ║
║  🎯 Zweck: Fragen für das Jeopardy Spiel                                   ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  📋 KATEGORIEN:                                                              ║
║  ├── 📖 Geschichte (100-500 Punkte)                                         ║
║  ├── 🔬 Wissenschaft (100-500 Punkte)                                       ║
║  ├── 🌍 Geographie (100-500 Punkte)                                         ║
║  ├── 🎨 Kunst & Kultur (100-500 Punkte)                                     ║
║  └── ⚽ Sport (100-500 Punkte)                                              ║
║                                                                              ║
║  📝 Hinweise:                                                                ║
║  • Schwierigkeitssteigerung nach Punktzahl                                  ║
║  • Verschiedene Wissensgebiete abgedeckt                                     ║
║  • Kurze und präzise Antworten                                              ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// 📚 ALLGEMEINWISSEN FRAGEN-DATENBANK                                         
// ============================================================================= 
const jeopardyData = {
    categories: [
        {
            name: "Geschichte",
            questions: [
                {
                    points: 100,
                    question: "In welchem Jahr fiel die Berliner Mauer?",
                    answer: "1989"
                },
                {
                    points: 200,
                    question: "Wer war der erste deutsche Bundeskanzler?",
                    answer: "Konrad Adenauer"
                },
                {
                    points: 300,
                    question: "Welcher römische Kaiser machte das Christentum zur Staatsreligion?",
                    answer: "Konstantin der Große"
                },
                {
                    points: 400,
                    question: "In welchem Jahr endete der Zweite Weltkrieg in Europa?",
                    answer: "1945 (8. Mai 1945)"
                },
                {
                    points: 500,
                    question: "Welche Revolution begann 1789 in Frankreich?",
                    answer: "Die Französische Revolution"
                }
            ]
        },
        {
            name: "Wissenschaft",
            questions: [
                {
                    points: 100,
                    question: "Was ist das chemische Symbol für Gold?",
                    answer: "Au"
                },
                {
                    points: 200,
                    question: "Wie viele Planeten hat unser Sonnensystem?",
                    answer: "8 Planeten"
                },
                {
                    points: 300,
                    question: "Welche Krankheit wird durch das Coronavirus SARS-CoV-2 verursacht?",
                    answer: "COVID-19"
                },
                {
                    points: 400,
                    question: "Wer entwickelte die Relativitätstheorie?",
                    answer: "Albert Einstein"
                },
                {
                    points: 500,
                    question: "Welches ist das häufigste Gas in der Erdatmosphäre?",
                    answer: "Stickstoff (etwa 78%)"
                }
            ]
        },
        {
            name: "Geographie",
            questions: [
                {
                    points: 100,
                    question: "Welches ist das größte Land der Welt?",
                    answer: "Russland"
                },
                {
                    points: 200,
                    question: "Wie heißt die Hauptstadt von Australien?",
                    answer: "Canberra"
                },
                {
                    points: 300,
                    question: "Welcher ist der längste Fluss der Welt?",
                    answer: "Der Nil"
                },
                {
                    points: 400,
                    question: "Auf welchem Kontinent liegt die Sahara-Wüste?",
                    answer: "Afrika"
                },
                {
                    points: 500,
                    question: "Welches Land hat die meisten Zeitzonen?",
                    answer: "Frankreich (12 Zeitzonen)"
                }
            ]
        },
        {
            name: "Sport",
            questions: [
                {
                    points: 100,
                    question: "Wie oft finden die Olympischen Sommerspiele statt?",
                    answer: "Alle 4 Jahre"
                },
                {
                    points: 200,
                    question: "In welcher Sportart wird der Stanley Cup verliehen?",
                    answer: "Eishockey"
                },
                {
                    points: 300,
                    question: "Welche Farbe hat das Trikot des Führenden bei der Tour de France?",
                    answer: "Gelb"
                },
                {
                    points: 400,
                    question: "Wie viele Spieler hat eine Volleyballmannschaft auf dem Feld?",
                    answer: "6 Spieler"
                },
                {
                    points: 500,
                    question: "In welchem Jahr fanden die ersten modernen Olympischen Spiele statt?",
                    answer: "1896 in Athen"
                }
            ]
        },
        {
            name: "Unterhaltung",
            questions: [
                {
                    points: 100,
                    question: "Welcher Streaming-Dienst produzierte die Serie 'Stranger Things'?",
                    answer: "Netflix"
                },
                {
                    points: 200,
                    question: "Wie heißt der Zauberer in der 'Herr der Ringe'-Trilogie?",
                    answer: "Gandalf"
                },
                {
                    points: 300,
                    question: "Welcher Film gewann 2020 den Oscar für den besten Film?",
                    answer: "Parasite"
                },
                {
                    points: 400,
                    question: "Wer komponierte die Musik für den Film 'Star Wars'?",
                    answer: "John Williams"
                },
                {
                    points: 500,
                    question: "Welche Band sang den Hit 'Bohemian Rhapsody'?",
                    answer: "Queen"
                }
            ]
        }
    ]
};

// Export for use in main script
window.jeopardyData = jeopardyData;