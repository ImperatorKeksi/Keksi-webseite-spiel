/*
    📦 LAGERLOGISTIK-MODUS FRAGEN
    Lagerwesen, Transport, Sicherheit, Warenwirtschaft
    Entwickler: Nico Kaschube | Oberlinhaus Oberhausen | 2025
*/

// Fragen-Datenbank
const jeopardyData = {
    categories: [
        {
            name: "Lagerwirtschaft Grundlagen",
            questions: [
                { question: "Was ist der Unterschied zwischen Fachlagerist und Fachkraft für Lagerlogistik?", answer: "Fachkraft hat 3 Jahre Ausbildung statt 2", points: 100 },
                { question: "Was bedeutet FIFO?", answer: "First In First Out - Zuerst rein, zuerst raus", points: 200 },
                { question: "Was ist ein Wareneingang?", answer: "Annahme und Kontrolle eingehender Waren", points: 300 },
                { question: "Wofür steht die Abkürzung ERP?", answer: "Enterprise Resource Planning", points: 400 },
                { question: "Was ist der Meldebestand?", answer: "Mindestmenge bei der nachbestellt werden muss", points: 500 }
            ]
        },
        {
            name: "Logistik & Transport",
            questions: [
                { question: "Was ist ein Lieferschein?", answer: "Dokument über gelieferte Waren", points: 100 },
                { question: "Welches Fahrzeug wird im Lager häufig genutzt?", answer: "Gabelstapler/Hubwagen", points: 200 },
                { question: "Was ist ein Frachtbrief?", answer: "Transportdokument für Güterbeförderung", points: 300 },
                { question: "Was bedeutet Just-in-Time?", answer: "Lieferung genau zum Bedarfszeitpunkt", points: 400 },
                { question: "Was ist ein Ladungsträger?", answer: "Hilfsmittel zum Transport (z.B. Palette, Container)", points: 500 }
            ]
        },
        {
            name: "Arbeitssicherheit",
            questions: [
                { question: "Welche Schutzausrüstung trägst du im Lager?", answer: "Sicherheitsschuhe, Warnweste", points: 100 },
                { question: "Was machst du bei einem Unfall im Lager?", answer: "Ersthelfer rufen, Vorgesetzten informieren", points: 200 },
                { question: "Wofür steht PSA?", answer: "Persönliche Schutzausrüstung", points: 300 },
                { question: "Wie hoch darf man Paletten ohne Regal stapeln?", answer: "Maximal 6 Meter bzw. betriebliche Regelung", points: 400 },
                { question: "Was ist eine Gefährdungsbeurteilung?", answer: "Bewertung von Risiken am Arbeitsplatz", points: 500 }
            ]
        },
        {
            name: "Warenwirtschaft",
            questions: [
                { question: "Was ist eine Inventur?", answer: "Bestandsaufnahme aller Waren", points: 100 },
                { question: "Was bedeutet Kommissionierung?", answer: "Zusammenstellung von Waren für Aufträge", points: 200 },
                { question: "Was ist ein Barcode?", answer: "Strichcode zur Warenidentifikation", points: 300 },
                { question: "Was versteht man unter Schwund?", answer: "Warenverlust durch Diebstahl oder Verderb", points: 400 },
                { question: "Was ist der Unterschied zwischen Stichproben- und Vollinventur?", answer: "Stichprobe = Teilbereich, Vollinventur = kompletter Bestand", points: 500 }
            ]
        },
        {
            name: "Lagerorganisation",
            questions: [
                { question: "Was ist ein Hochregallager?", answer: "Lager mit sehr hohen Regalen (über 12m)", points: 100 },
                { question: "Was bedeutet Chaotische Lagerung?", answer: "Waren werden dort gelagert wo gerade Platz ist", points: 200 },
                { question: "Was ist ein Pufferlager?", answer: "Zwischenlager für kurzzeitige Lagerung", points: 300 },
                { question: "Was ist eine Lagerplatzkennzeichnung?", answer: "System zur eindeutigen Identifikation von Lagerplätzen", points: 400 },
                { question: "Was versteht man unter Cross-Docking?", answer: "Waren werden direkt vom Wareneingang zum Ausgang umgeschlagen", points: 500 }
            ]
        }
    ]
};
