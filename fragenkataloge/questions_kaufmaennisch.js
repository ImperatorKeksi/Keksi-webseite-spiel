// Kaufmännisch-Template: 50 Fragen (10x5)
const jeopardyData = {
    categories: [
        { name: " Büroorganisation", questions: [
            { question: "Was gehört zu guter Büroorganisation?", answer: "Ordnung Struktur Zeitmanagement", points: 100 },
            { question: "Was ist ein Ablagesystem?", answer: "Geordnete Aufbewahrung von Dokumenten", points: 200 },
            { question: "Wie sortiert man Akten?", answer: "Alphabetisch numerisch oder chronologisch", points: 300 },
            { question: "Was ist ein Wiedervorlagesystem?", answer: "System zur Erinnerung an Termine", points: 400 },
            { question: "Was bedeutet Digitalisierung im Büro?", answer: "Umstellung auf papierlose Prozesse", points: 500 }
        ]},
        { name: " Geschäftskorrespondenz", questions: [
            { question: "Was gehört in einen Geschäftsbrief?", answer: "Anschrift Datum Betreff Text Gruß", points: 100 },
            { question: "Was ist die DIN 5008?", answer: "Norm für Geschäftsbriefe", points: 200 },
            { question: "Wie formuliert man höflich?", answer: "Mit würde könnte bitte", points: 300 },
            { question: "Was ist eine Auftragsbestätigung?", answer: "Bestätigung eines Kundenauftrags", points: 400 },
            { question: "Wann schreibt man eine Mahnung?", answer: "Bei nicht bezahlten Rechnungen", points: 500 }
        ]},
        { name: "� Telefonieren & Kundenservice", questions: [
            { question: "Wie meldet man sich am Telefon?", answer: "Firma Name Gruß", points: 100 },
            { question: "Was ist aktives Zuhören?", answer: "Aufmerksam und nachfragend zuhören", points: 200 },
            { question: "Wie geht man mit Reklamationen um?", answer: "Ruhig bleiben verstehen Lösung anbieten", points: 300 },
            { question: "Was ist Kundenorientierung?", answer: "Bedürfnisse des Kunden in den Mittelpunkt", points: 400 },
            { question: "Was bedeutet Beschwerdemanagement?", answer: "Professioneller Umgang mit Beschwerden", points: 500 }
        ]},
        { name: " Rechnungswesen", questions: [
            { question: "Was steht auf einer Rechnung?", answer: "Absender Empfänger Betrag Leistung", points: 100 },
            { question: "Was bedeutet brutto und netto?", answer: "Mit/ohne Mehrwertsteuer", points: 200 },
            { question: "Wie hoch ist die Mehrwertsteuer?", answer: "19% (ermäßigt 7%)", points: 300 },
            { question: "Was ist ein Skonto?", answer: "Rabatt bei schneller Zahlung", points: 400 },
            { question: "Was bedeutet Zahlungsziel?", answer: "Frist zur Bezahlung", points: 500 }
        ]},
        { name: " Buchhaltung", questions: [
            { question: "Was macht die Buchhaltung?", answer: "Erfasst alle Geschäftsvorfälle", points: 100 },
            { question: "Was ist ein Beleg?", answer: "Nachweis für Geschäftsvorfall", points: 200 },
            { question: "Was bedeutet Soll und Haben?", answer: "Linke und rechte Kontoseite", points: 300 },
            { question: "Was ist eine Bilanz?", answer: "Gegenüberstellung von Vermögen und Schulden", points: 400 },
            { question: "Was besagt der Grundsatz 'Keine Buchung ohne Beleg'?", answer: "Jede Buchung braucht Nachweis", points: 500 }
        ]},
        { name: " Verträge & Recht", questions: [
            { question: "Was ist ein Kaufvertrag?", answer: "Vereinbarung über Kauf einer Sache", points: 100 },
            { question: "Ab welchem Alter ist man voll geschäftsfähig?", answer: "18 Jahre", points: 200 },
            { question: "Was ist ein Angebot?", answer: "Verbindlicher Vorschlag zum Vertragsabschluss", points: 300 },
            { question: "Was bedeutet Gewährleistung?", answer: "Haftung für Mängel", points: 400 },
            { question: "Wie lange gilt die Gewährleistung?", answer: "2 Jahre", points: 500 }
        ]},
        { name: " Terminplanung", questions: [
            { question: "Was ist ein Terminkalender?", answer: "Übersicht über Termine und Aufgaben", points: 100 },
            { question: "Was bedeutet Priorisieren?", answer: "Nach Wichtigkeit ordnen", points: 200 },
            { question: "Was ist die ABC-Analyse?", answer: "Einteilung in A (wichtig) B C", points: 300 },
            { question: "Was ist ein Meeting?", answer: "Geschäftliche Besprechung", points: 400 },
            { question: "Wie erstellt man eine Agenda?", answer: "Tagesordnung mit Themen und Zeiten", points: 500 }
        ]},
        { name: " Office-Software", questions: [
            { question: "Nenne drei Office-Programme", answer: "Word Excel PowerPoint", points: 100 },
            { question: "Wofür nutzt man Excel?", answer: "Tabellenkalkulation und Berechnungen", points: 200 },
            { question: "Was macht man in PowerPoint?", answer: "Präsentationen erstellen", points: 300 },
            { question: "Was ist eine Serienbrief-Funktion?", answer: "Massenbriefe mit individuellen Daten", points: 400 },
            { question: "Was ist Cloud-Speicherung?", answer: "Dateien im Internet speichern", points: 500 }
        ]},
        { name: " Betriebswirtschaft", questions: [
            { question: "Was ist Umsatz?", answer: "Gesamte Einnahmen", points: 100 },
            { question: "Was bedeutet Gewinn?", answer: "Umsatz minus Kosten", points: 200 },
            { question: "Was sind Fixkosten?", answer: "Kosten die immer gleich bleiben", points: 300 },
            { question: "Was sind variable Kosten?", answer: "Kosten die sich ändern", points: 400 },
            { question: "Was ist der Break-Even-Point?", answer: "Punkt wo Kosten = Erlös", points: 500 }
        ]},
        { name: " Personalwesen", questions: [
            { question: "Was steht im Arbeitsvertrag?", answer: "Gehalt Arbeitszeit Aufgaben", points: 100 },
            { question: "Was ist eine Gehaltsabrechnung?", answer: "Dokument über Lohn und Abzüge", points: 200 },
            { question: "Wie viel Urlaubstage gibt es mindestens?", answer: "20 Tage bei 5-Tage-Woche", points: 300 },
            { question: "Was ist eine Krankmeldung?", answer: "Mitteilung über Arbeitsunfähigkeit", points: 400 },
            { question: "Was macht die Personalabteilung?", answer: "Verwaltet Mitarbeiter-Angelegenheiten", points: 500 }
        ]}
    ]
};
