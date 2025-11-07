/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    💼 KAUFMÄNNISCHE FRAGEN-DATENBANK                        ║
║                   Fragen für Kaufmann/Verwaltung/Büro                       ║
║                                                                              ║
║  🎯 Zielgruppe: Kaufmännische Azubis                                        ║
║  📚 Themen: Büro, Verwaltung, Rechnungswesen, Geschäftsprozesse            ║
║  👨‍💻 Ersteller: Nico Kaschube                                              ║
║  📅 Erstellt: 2025                                                          ║
║                                                                              ║
║  🏗️ KATEGORIEN:                                                             ║
║  ├── 📋 Büroorganisation                                                   ║
║  ├── 💰 Rechnungswesen                                                     ║
║  ├── 📞 Kommunikation & Korrespondenz                                      ║
║  ├── 📊 Geschäftsprozesse                                                  ║
║  └── 📄 Recht & Verträge                                                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ============================================================================= 
// 💼 KAUFMÄNNISCHE FRAGEN-DATENBANK                                          
// ============================================================================= 
const jeopardyData = {
    categories: [
        {
            name: "Büroorganisation",
            questions: [
                { question: "Was bedeutet die Abkürzung 'i.V.'?", answer: "In Vertretung", points: 100 },
                { question: "Welches Programm gehört zu Microsoft Office?", answer: "Word, Excel, PowerPoint, Outlook (eines reicht)", points: 200 },
                { question: "Was ist ein Aktenplan?", answer: "System zur Ordnung und Ablage von Dokumenten", points: 300 },
                { question: "Was bedeutet DIN A4?", answer: "Genormtes Papierformat 210 × 297 mm", points: 400 },
                { question: "Was ist der Unterschied zwischen Ablage und Archiv?", answer: "Ablage = aktuelle Dokumente, Archiv = alte aufbewahrungspflichtige", points: 500 }
            ]
        },
        {
            name: "Rechnungswesen",
            questions: [
                { question: "Was ist eine Rechnung?", answer: "Dokument über gelieferte Waren oder Dienstleistungen", points: 100 },
                { question: "Was bedeutet Brutto?", answer: "Preis inklusive Mehrwertsteuer", points: 200 },
                { question: "Wie hoch ist der normale Mehrwertsteuersatz in Deutschland?", answer: "19%", points: 300 },
                { question: "Was ist der Unterschied zwischen Einnahmen und Ausgaben?", answer: "Einnahmen = Geld das reinkommt, Ausgaben = Geld das rausgeht", points: 400 },
                { question: "Was ist eine Bilanz?", answer: "Gegenüberstellung von Vermögen und Schulden eines Unternehmens", points: 500 }
            ]
        },
        {
            name: "Kommunikation & Korrespondenz",
            questions: [
                { question: "Wie beginnt ein formeller Geschäftsbrief?", answer: "Sehr geehrte Damen und Herren", points: 100 },
                { question: "Was gehört NICHT in eine geschäftliche E-Mail?", answer: "Emojis, Slang, informelle Sprache", points: 200 },
                { question: "Was bedeutet 'cc' in E-Mails?", answer: "Carbon Copy - Kopie an weitere Empfänger", points: 300 },
                { question: "Was ist ein Aktenzeichen?", answer: "Eindeutige Kennzeichnung eines Vorgangs", points: 400 },
                { question: "Wie lange sollte man auf eine geschäftliche E-Mail antworten?", answer: "Innerhalb von 24-48 Stunden", points: 500 }
            ]
        },
        {
            name: "Geschäftsprozesse",
            questions: [
                { question: "Was ist ein Angebot?", answer: "Verbindliches Verkaufsangebot an Kunden", points: 100 },
                { question: "Was kommt zuerst: Rechnung oder Lieferung?", answer: "Normalerweise Lieferung, dann Rechnung", points: 200 },
                { question: "Was ist ein Mahnwesen?", answer: "Prozess zur Einforderung überfälliger Zahlungen", points: 300 },
                { question: "Was bedeutet B2B?", answer: "Business to Business - Geschäft zwischen Unternehmen", points: 400 },
                { question: "Was ist eine Bestellung?", answer: "Verbindliche Auftragserteilung an Lieferanten", points: 500 }
            ]
        },
        {
            name: "Recht & Verträge",
            questions: [
                { question: "Ab welchem Alter ist man voll geschäftsfähig?", answer: "18 Jahre", points: 100 },
                { question: "Was ist ein Arbeitsvertrag?", answer: "Vertrag zwischen Arbeitgeber und Arbeitnehmer", points: 200 },
                { question: "Wie lange muss man Rechnungen aufbewahren?", answer: "10 Jahre", points: 300 },
                { question: "Was ist eine Probezeit?", answer: "Anfangszeit im Arbeitsverhältnis mit kürzerer Kündigungsfrist", points: 400 },
                { question: "Was regelt das Arbeitszeitgesetz?", answer: "Höchstarbeitszeit, Pausen und Ruhezeiten", points: 500 }
            ]
        }
    ]
};
