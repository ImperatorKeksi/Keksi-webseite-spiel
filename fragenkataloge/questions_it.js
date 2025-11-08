// IT-Template: 50 Fragen (10x5) - Vorlage für Editor
const jeopardyData = {
    categories: [
        { name: " Rolle im Betrieb", questions: [
            { question: "Wie nennt man das Ausbildungssystem mit Betrieb und Berufsschule?", answer: "Duales System", points: 100 },
            { question: "Wer ist dein direkter Ansprechpartner im Betrieb?", answer: "Der Ausbilder", points: 200 },
            { question: "Wie lange dauert die IT-Ausbildung normalerweise?", answer: "3 Jahre", points: 300 },
            { question: "Was ist ein Helpdesk?", answer: "Erste Anlaufstelle für IT-Probleme", points: 400 },
            { question: "Was bedeutet SLA?", answer: "Service Level Agreement", points: 500 }
        ]},
        { name: " Hardware", questions: [
            { question: "Was bedeutet CPU?", answer: "Central Processing Unit (Prozessor)", points: 100 },
            { question: "Was macht der Arbeitsspeicher (RAM)?", answer: "Speichert temporäre Daten", points: 200 },
            { question: "Was ist eine SSD?", answer: "Solid State Drive (schneller Speicher)", points: 300 },
            { question: "Welche Funktion hat ein Netzteil?", answer: "Stromversorgung des Computers", points: 400 },
            { question: "Was ist der Unterschied zwischen HDD und SSD?", answer: "HDD mechanisch, SSD elektronisch", points: 500 }
        ]},
        { name: " Betriebssysteme", questions: [
            { question: "Nenne drei bekannte Betriebssysteme.", answer: "Windows, Linux, macOS", points: 100 },
            { question: "Was macht ein Betriebssystem?", answer: "Verwaltet Hardware und Software", points: 200 },
            { question: "Was ist der Taskmanager?", answer: "Zeigt laufende Prozesse an", points: 300 },
            { question: "Was bedeutet 'Open Source'?", answer: "Quellcode ist frei verfügbar", points: 400 },
            { question: "Welches Betriebssystem basiert auf Unix?", answer: "Linux und macOS", points: 500 }
        ]},
        { name: " Netzwerke", questions: [
            { question: "Was bedeutet LAN?", answer: "Local Area Network", points: 100 },
            { question: "Was macht ein Router?", answer: "Verbindet Netzwerke miteinander", points: 200 },
            { question: "Was ist eine IP-Adresse?", answer: "Eindeutige Adresse im Netzwerk", points: 300 },
            { question: "Was bedeutet WLAN?", answer: "Wireless Local Area Network", points: 400 },
            { question: "Welcher Port wird für HTTPS verwendet?", answer: "Port 443", points: 500 }
        ]},
        { name: " IT-Sicherheit", questions: [
            { question: "Was ist ein Virus?", answer: "Schadsoftware die sich verbreitet", points: 100 },
            { question: "Was macht eine Firewall?", answer: "Schützt vor unerlaubten Zugriffen", points: 200 },
            { question: "Was ist Phishing?", answer: "Versuch Zugangsdaten zu stehlen", points: 300 },
            { question: "Was bedeutet Verschlüsselung?", answer: "Daten werden unleserlich gemacht", points: 400 },
            { question: "Was ist eine Zwei-Faktor-Authentifizierung?", answer: "Doppelte Anmeldung (Passwort + SMS)", points: 500 }
        ]},
        { name: " Datenbanken", questions: [
            { question: "Was ist eine Datenbank?", answer: "Strukturierte Sammlung von Daten", points: 100 },
            { question: "Was bedeutet SQL?", answer: "Structured Query Language", points: 200 },
            { question: "Was ist ein Primary Key?", answer: "Eindeutige Kennung eines Datensatzes", points: 300 },
            { question: "Nenne ein bekanntes Datenbanksystem.", answer: "MySQL PostgreSQL Oracle", points: 400 },
            { question: "Was ist eine Relation?", answer: "Verknüpfung zwischen Tabellen", points: 500 }
        ]},
        { name: " Programmierung", questions: [
            { question: "Was ist eine Variable?", answer: "Speicherplatz für Werte", points: 100 },
            { question: "Was macht eine IF-Bedingung?", answer: "Führt Code unter Bedingungen aus", points: 200 },
            { question: "Was ist eine Schleife?", answer: "Wiederholung von Code", points: 300 },
            { question: "Was bedeutet 'Debugging'?", answer: "Fehlersuche im Code", points: 400 },
            { question: "Was ist ein Compiler?", answer: "Übersetzt Code in Maschinensprache", points: 500 }
        ]},
        { name: " Cloud & Server", questions: [
            { question: "Was bedeutet 'Cloud'?", answer: "Dienste über das Internet", points: 100 },
            { question: "Was ist ein Server?", answer: "Computer der Dienste bereitstellt", points: 200 },
            { question: "Nenne einen Cloud-Anbieter.", answer: "AWS Azure Google Cloud", points: 300 },
            { question: "Was ist Virtualisierung?", answer: "Mehrere virtuelle Computer auf einem", points: 400 },
            { question: "Was bedeutet SaaS?", answer: "Software as a Service", points: 500 }
        ]},
        { name: "� Datenschutz", questions: [
            { question: "Was ist die DSGVO?", answer: "Datenschutz-Grundverordnung", points: 100 },
            { question: "Was sind personenbezogene Daten?", answer: "Daten die eine Person identifizieren", points: 200 },
            { question: "Darfst du Kundendaten weitergeben?", answer: "Nein nur mit Erlaubnis", points: 300 },
            { question: "Was ist ein Datenschutzbeauftragter?", answer: "Person die Datenschutz überwacht", points: 400 },
            { question: "Was bedeutet 'Recht auf Vergessenwerden'?", answer: "Recht auf Löschung eigener Daten", points: 500 }
        ]},
        { name: " Support & Wartung", questions: [
            { question: "Was ist ein Ticketsystem?", answer: "Verwaltung von Support-Anfragen", points: 100 },
            { question: "Was bedeutet 'First Level Support'?", answer: "Erste Anlaufstelle für Probleme", points: 200 },
            { question: "Was ist ein Backup?", answer: "Sicherungskopie von Daten", points: 300 },
            { question: "Wie oft sollte man Backups machen?", answer: "Regelmäßig (täglich bis wöchentlich)", points: 400 },
            { question: "Was ist ein Wartungsfenster?", answer: "Geplante Zeit für System-Updates", points: 500 }
        ]}
    ]
};
