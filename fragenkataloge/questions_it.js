/*
    💻 IT-MODUS FRAGEN
    IT-Grundlagen, Hardware, Software, Netzwerke, Sicherheit
    Entwickler: Nico Kaschube | Oberlinhaus Oberhausen | 2025
*/

// ============================================================================= 
// 💻 IT-AZUBI FRAGEN-DATENBANK - KORREKTE JEOPARDY VERSION                   
// ============================================================================= 
const jeopardyData = {
    categories: [
        {
            name: "Rolle im Betrieb",
            questions: [
                // Ausbildung Basics
                { question: "Wie nennt man das Ausbildungssystem mit Betrieb und Berufsschule?", answer: "Duales System", points: 100 },
                { question: "Wo steht dein Ausbildungsplan?", answer: "Im Ausbildungsvertrag", points: 200 },
                { question: "Wer ist dein direkter Ansprechpartner im Betrieb?", answer: "Der Ausbilder", points: 300 },
                { question: "Wie lange dauert die IT-Ausbildung normalerweise?", answer: "3 Jahre", points: 400 },
                { question: "Was passiert bei der Zwischenprüfung?", answer: "Überprüfung des Lernstandes", points: 500 },
                
                // Betriebsabläufe
                { question: "Was machst du als erstes am Arbeitsplatz?", answer: "Computer hochfahren und E-Mails checken", points: 100 },
                { question: "Wen fragst du bei Problemen zuerst?", answer: "Den Ausbilder oder Kollegen", points: 200 },
                { question: "Was ist ein Helpdesk?", answer: "Erste Anlaufstelle für IT-Probleme", points: 300 },
                { question: "Wofür ist ein Ticketsystem da?", answer: "Zur Verwaltung von Kundenanfragen", points: 400 },
                { question: "Was bedeutet SLA?", answer: "Service Level Agreement", points: 500 },
                
                // Arbeitsschutz
                { question: "Wie viele Stunden darf ein Azubi unter 18 täglich arbeiten?", answer: "8 Stunden", points: 100 },
                { question: "Was machst du bei einem Arbeitsunfall?", answer: "Ersthelfer rufen und Vorgesetzten informieren", points: 200 },
                { question: "Wie sitzt du richtig am Computer?", answer: "Gerade, Füße am Boden, Bildschirm auf Augenhöhe", points: 300 },
                { question: "Was ist bei der Bildschirmarbeit wichtig?", answer: "Regelmäßige Pausen", points: 400 },
                { question: "Welches Gesetz schützt junge Arbeitnehmer?", answer: "Jugendarbeitsschutzgesetz", points: 500 },
                
                // IT-Grundlagen im Betrieb
                { question: "Was ist die IT-Abteilung?", answer: "Bereich für Computer und Technik", points: 100 },
                { question: "Was macht ein Administrator?", answer: "Verwaltet Computer und Netzwerke", points: 200 },
                { question: "Was ist eine Inventarnummer?", answer: "Eindeutige Kennzeichnung von IT-Geräten", points: 300 },
                { question: "Warum gibt es Backup-Systeme?", answer: "Um Daten zu sichern", points: 400 },
                { question: "Was ist ein IT-Budget?", answer: "Geld das für IT-Ausgaben eingeplant ist", points: 500 },
                
                // Kommunikation
                { question: "Wie verhältst du dich am Telefon?", answer: "Freundlich und professionell", points: 100 },
                { question: "Was gehört in eine E-Mail?", answer: "Betreff, Anrede, Text, Gruß", points: 200 },
                { question: "Wie fragst du höflich nach Hilfe?", answer: "Entschuldigung, können Sie mir bitte helfen?", points: 300 },
                { question: "Was machst du wenn ein Kunde unfreundlich ist?", answer: "Ruhig bleiben und sachlich antworten", points: 400 },
                { question: "Wie erklärst du technische Dinge einfach?", answer: "Ohne Fachbegriffe, mit Beispielen", points: 500 },
                
                // Datenschutz Basics
                { question: "Darfst du Kundendaten weitergeben?", answer: "Nein, nur mit Erlaubnis", points: 100 },
                { question: "Was ist ein sicheres Passwort?", answer: "Lang, mit Buchstaben, Zahlen und Zeichen", points: 200 },
                { question: "Was machst du mit vertraulichen Dokumenten?", answer: "Nicht offen liegen lassen", points: 300 },
                { question: "Wer darf deinen Computer benutzen?", answer: "Nur du selbst", points: 400 },
                { question: "Was ist die DSGVO?", answer: "Datenschutz-Grundverordnung", points: 500 },
                
                // Teamwork
                { question: "Wie arbeitest du gut im Team?", answer: "Hilfsbereit und respektvoll", points: 100 },
                { question: "Was machst du bei Meinungsunterschieden?", answer: "Ruhig diskutieren und Kompromisse finden", points: 200 },
                { question: "Warum sind Meetings wichtig?", answer: "Für Absprachen und Informationen", points: 300 },
                { question: "Was ist ein Projektteam?", answer: "Gruppe die zusammen an einem Projekt arbeitet", points: 400 },
                { question: "Wie gehst du mit Kritik um?", answer: "Ruhig anhören und als Chance sehen", points: 500 },
                
                // Berufsbild
                { question: "Was macht ein Fachinformatiker?", answer: "Programmiert und betreut IT-Systeme", points: 100 },
                { question: "Was ist der Unterschied zwischen Anwendungsentwicklung und Systemintegration?", answer: "Programmieren vs. Netzwerke einrichten", points: 200 },
                { question: "Was macht ein IT-System-Elektroniker?", answer: "Baut und repariert IT-Hardware", points: 300 },
                { question: "Was ist ein IT-System-Kaufmann?", answer: "Verkauft und berät zu IT-Produkten", points: 400 },
                { question: "Welche Weiterbildungen gibt es nach der Ausbildung?", answer: "Techniker, Meister, Studium", points: 500 },
                
                // Arbeitsorganisation
                { question: "Was ist eine To-Do-Liste?", answer: "Aufstellung der zu erledigenden Aufgaben", points: 100 },
                { question: "Wie teilst du deine Zeit ein?", answer: "Wichtige Sachen zuerst", points: 200 },
                { question: "Was machst du wenn du zu viel zu tun hast?", answer: "Vorgesetzten informieren und um Hilfe bitten", points: 300 },
                { question: "Warum ist Pünktlichkeit wichtig?", answer: "Zeigt Respekt und Zuverlässigkeit", points: 400 },
                { question: "Was ist Zeitmanagement?", answer: "Effiziente Nutzung der Arbeitszeit", points: 500 },
                
                // Prüfungsvorbereitung
                { question: "Wann ist die Abschlussprüfung?", answer: "Am Ende der Ausbildung", points: 100 },
                { question: "Aus welchen Teilen besteht die Prüfung?", answer: "Schriftlich und praktisch", points: 200 },
                { question: "Was ist ein Prüfungsprojekt?", answer: "Praktische Aufgabe in der Abschlussprüfung", points: 300 },
                { question: "Wie bereitest du dich auf Prüfungen vor?", answer: "Lernen, üben, wiederholen", points: 400 },
                { question: "Was machst du bei Prüfungsangst?", answer: "Gut vorbereiten, ruhig bleiben, tief atmen", points: 500 }
            ]
        },
        {
            name: "Hardware-Basics", 
            questions: [
                // Grundkomponenten
                { question: "Was ist die CPU?", answer: "Der Prozessor - das Gehirn des Computers", points: 100 },
                { question: "Wofür steht RAM?", answer: "Random Access Memory - Arbeitsspeicher", points: 200 },
                { question: "Was macht die Festplatte?", answer: "Speichert Daten dauerhaft", points: 300 },
                { question: "Wozu braucht man ein Netzteil?", answer: "Wandelt Wechselstrom in Gleichstrom um", points: 400 },
                { question: "Was verbindet alle Teile im Computer?", answer: "Das Mainboard", points: 500 },
                
                // Eingabegeräte
                { question: "Mit welchem Gerät tippst du?", answer: "Tastatur", points: 100 },
                { question: "Womit klickst du auf dem Bildschirm?", answer: "Maus", points: 200 },
                { question: "Wie nennt man das Touchpad am Laptop?", answer: "Trackpad", points: 300 },
                { question: "Was ist ein Scanner?", answer: "Gerät zum Digitalisieren von Papier", points: 400 },
                { question: "Wie heißt das Gerät für Spracheingabe?", answer: "Mikrofon", points: 500 },
                
                // Ausgabegeräte
                { question: "Womit siehst du was am Computer passiert?", answer: "Monitor/Bildschirm", points: 100 },
                { question: "Womit hörst du Töne vom Computer?", answer: "Lautsprecher", points: 200 },
                { question: "Womit druckst du Dokumente aus?", answer: "Drucker", points: 300 },
                { question: "Was ist ein Beamer?", answer: "Projektor für große Bildschirme", points: 400 },
                { question: "Womit hörst du privat Musik am Computer?", answer: "Kopfhörer", points: 500 },
                
                // Speicher
                { question: "Was ist der Unterschied zwischen HDD und SSD?", answer: "HDD hat bewegliche Teile, SSD nicht", points: 100 },
                { question: "Wie viel Speicher hat 1 GB?", answer: "1000 MB oder 1024 MB", points: 200 },
                { question: "Was ist ein USB-Stick?", answer: "Tragbarer Datenspeicher", points: 300 },
                { question: "Wozu braucht man eine externe Festplatte?", answer: "Für zusätzlichen Speicher oder Backup", points: 400 },
                { question: "Was ist Cloud-Speicher?", answer: "Datenspeicher im Internet", points: 500 },
                
                // Anschlüsse
                { question: "Womit schließt du eine Maus an?", answer: "USB", points: 100 },
                { question: "Welcher Anschluss ist für den Monitor?", answer: "HDMI, VGA oder DisplayPort", points: 200 },
                { question: "Was ist ein USB-C?", answer: "Neuer, kleinerer USB-Anschluss", points: 300 },
                { question: "Womit schließt du Kopfhörer an?", answer: "Klinke oder USB", points: 400 },
                { question: "Was ist Bluetooth?", answer: "Drahtlose Verbindung", points: 500 },
                
                // Mobilgeräte
                { question: "Was ist ein Smartphone?", answer: "Telefon mit Computer-Funktionen", points: 100 },
                { question: "Was ist ein Tablet?", answer: "Flacher Computer mit Touchscreen", points: 200 },
                { question: "Was ist der Unterschied zwischen Laptop und Desktop?", answer: "Laptop ist tragbar, Desktop steht fest", points: 300 },
                { question: "Was macht man mit einem Ladekabel?", answer: "Lädt den Akku auf", points: 400 },
                { question: "Was ist ein Powerbank?", answer: "Externe Batterie zum Aufladen", points: 500 },
                
                // Grafik
                { question: "Was macht die Grafikkarte?", answer: "Zeigt Bilder auf dem Monitor an", points: 100 },
                { question: "Was ist ein Pixel?", answer: "Kleinster Bildpunkt", points: 200 },
                { question: "Was bedeutet Full HD?", answer: "1920 x 1080 Pixel Auflösung", points: 300 },
                { question: "Was ist 4K?", answer: "Sehr hohe Bildauflösung", points: 400 },
                { question: "Warum brauchen Spiele eine gute Grafikkarte?", answer: "Für flüssige und schöne Bilder", points: 500 },
                
                // Kühlung
                { question: "Warum wird ein Computer warm?", answer: "Elektronik erzeugt Wärme", points: 100 },
                { question: "Womit kühlt man einen Prozessor?", answer: "Mit einem Lüfter", points: 200 },
                { question: "Was passiert wenn ein Computer überhitzt?", answer: "Er wird langsam oder schaltet sich ab", points: 300 },
                { question: "Wo sollte Wärme am Computer rauskommen?", answer: "Hinten und an den Seiten", points: 400 },
                { question: "Warum sollte man Computer entstauben?", answer: "Damit die Kühlung funktioniert", points: 500 },
                
                // Probleme lösen
                { question: "Was machst du wenn der Computer nicht angeht?", answer: "Stromkabel prüfen", points: 100 },
                { question: "Computer ist sehr langsam - was tun?", answer: "Neustarten oder Speicher prüfen", points: 200 },
                { question: "Bildschirm bleibt schwarz - was prüfen?", answer: "Kabel zum Monitor", points: 300 },
                { question: "Tastatur reagiert nicht - was tun?", answer: "Kabel prüfen oder neu anschließen", points: 400 },
                { question: "Computer macht laute Geräusche - was ist los?", answer: "Lüfter arbeitet stark oder ist defekt", points: 500 },
                
                // Wartung
                { question: "Wie oft sollte man den Computer ausschalten?", answer: "Täglich oder bei Nichtbenutzung", points: 100 },
                { question: "Warum sollte man Updates machen?", answer: "Für Sicherheit und neue Funktionen", points: 200 },
                { question: "Wie reinigt man eine Tastatur?", answer: "Vorsichtig mit weichem Tuch", points: 300 },
                { question: "Warum sollte man regelmäßig Dateien löschen?", answer: "Um Speicherplatz frei zu machen", points: 400 },
                { question: "Was ist ein Hardware-Check?", answer: "Überprüfung ob alle Teile funktionieren", points: 500 }
            ]
        },
        {
            name: "Software & Betriebssysteme",
            questions: [
                // Betriebssystem Basics
                { question: "Was ist ein Betriebssystem?", answer: "Software die den Computer steuert", points: 100 },
                { question: "Nenne drei bekannte Betriebssysteme", answer: "Windows, macOS, Linux", points: 200 },
                { question: "Was passiert beim Booten?", answer: "Computer startet das Betriebssystem", points: 300 },
                { question: "Was ist der Desktop?", answer: "Die Oberfläche wo Icons liegen", points: 400 },
                { question: "Was macht der Task-Manager?", answer: "Zeigt laufende Programme an", points: 500 },

                // Programme
                { question: "Was ist Microsoft Word?", answer: "Textverarbeitungsprogramm", points: 100 },
                { question: "Womit öffnet man Internetseiten?", answer: "Browser wie Chrome oder Firefox", points: 200 },
                { question: "Was ist Excel?", answer: "Tabellenkalkulation für Zahlen", points: 300 },
                { question: "Was macht ein Antivirenprogramm?", answer: "Schützt vor Viren und Schadsoftware", points: 400 },
                { question: "Was ist ein PDF?", answer: "Dokumentformat das überall gleich aussieht", points: 500 },

                // Dateien und Ordner
                { question: "Was ist eine Datei?", answer: "Gespeicherte Information am Computer", points: 100 },
                { question: "Was ist ein Ordner?", answer: "Behälter für Dateien", points: 200 },
                { question: "Was bedeutet die Endung .txt?", answer: "Textdatei", points: 300 },
                { question: "Wo landen gelöschte Dateien zuerst?", answer: "In den Papierkorb", points: 400 },
                { question: "Wie kopiert man eine Datei?", answer: "Rechtsklick -> Kopieren oder Strg+C", points: 500 },

                // Installation
                { question: "Wie installiert man ein Programm?", answer: "Setup-Datei ausführen", points: 100 },
                { question: "Was ist eine .exe Datei?", answer: "Ausführbare Programmdatei", points: 200 },
                { question: "Wo findet man installierte Programme?", answer: "Im Startmenü oder Programme-Ordner", points: 300 },
                { question: "Wie deinstalliert man Programme?", answer: "Über Systemsteuerung oder Einstellungen", points: 400 },
                { question: "Was ist ein Update?", answer: "Neue Version eines Programms", points: 500 },

                // Windows Basics
                { question: "Mit welcher Taste öffnet man das Startmenü?", answer: "Windows-Taste", points: 100 },
                { question: "Wie wechselt man zwischen Programmen?", answer: "Alt + Tab", points: 200 },
                { question: "Wo stellt man die Lautstärke ein?", answer: "Taskleiste rechts unten", points: 300 },
                { question: "Was ist die Systemsteuerung?", answer: "Zentrale Einstellungen von Windows", points: 400 },
                { question: "Wie macht man einen Screenshot?", answer: "Druck-Taste oder Windows+Umschalt+S", points: 500 },

                // Fehler und Hilfe
                { question: "Was tun wenn ein Programm nicht reagiert?", answer: "Task-Manager öffnen und beenden", points: 100 },
                { question: "Computer ist langsam - was hilft?", answer: "Neustart", points: 200 },
                { question: "Wo findet man Hilfe zu Programmen?", answer: "Hilfe-Menü oder F1-Taste", points: 300 },
                { question: "Was ist ein Bluescreen?", answer: "Systemfehler bei Windows", points: 400 },
                { question: "Wie startet man Windows im abgesicherten Modus?", answer: "F8 beim Start oder über Einstellungen", points: 500 },

                // Internet und Browser
                { question: "Was ist ein Browser?", answer: "Programm für Internetseiten", points: 100 },
                { question: "Was bedeutet WWW?", answer: "World Wide Web", points: 200 },
                { question: "Was ist ein Bookmark?", answer: "Gespeicherte Internetadresse", points: 300 },
                { question: "Was sind Cookies?", answer: "Kleine Dateien die Websites speichern", points: 400 },
                { question: "Was ist ein Download?", answer: "Datei aus dem Internet herunterladen", points: 500 },

                // Sicherheit
                { question: "Warum braucht man ein Passwort?", answer: "Zum Schutz vor unbefugtem Zugriff", points: 100 },
                { question: "Was ist ein Virus?", answer: "Schädliches Programm", points: 200 },
                { question: "Wie erkennt man verdächtige E-Mails?", answer: "Unbekannter Absender, merkwürdige Links", points: 300 },
                { question: "Was ist eine Firewall?", answer: "Schutz vor Angriffen aus dem Internet", points: 400 },
                { question: "Warum sollte man Software aktualisieren?", answer: "Für Sicherheit und Bugfixes", points: 500 },

                // Daten und Backup
                { question: "Was ist ein Backup?", answer: "Sicherheitskopie wichtiger Daten", points: 100 },
                { question: "Wo kann man Daten sichern?", answer: "Externe Festplatte, USB-Stick, Cloud", points: 200 },
                { question: "Was passiert bei einem Festplattenschaden?", answer: "Daten können verloren gehen", points: 300 },
                { question: "Wie oft sollte man Backups machen?", answer: "Regelmäßig, je nach Wichtigkeit der Daten", points: 400 },
                { question: "Was ist Synchronisation?", answer: "Daten auf mehreren Geräten gleich halten", points: 500 },

                // Mobile Geräte
                { question: "Was ist Android?", answer: "Betriebssystem für Handys", points: 100 },
                { question: "Wo lädt man Apps herunter?", answer: "App Store oder Google Play", points: 200 },
                { question: "Was ist iOS?", answer: "Betriebssystem von Apple für iPhone/iPad", points: 300 },
                { question: "Wie verbindet man Handy mit Computer?", answer: "USB-Kabel oder Bluetooth", points: 400 },
                { question: "Was sind Push-Nachrichten?", answer: "Automatische Benachrichtigungen von Apps", points: 500 }
            ]
        },
        {
            name: "Netzwerk-Grundlagen", 
            questions: [
                // Internet Basics
                { question: "Was bedeutet WWW?", answer: "World Wide Web", points: 100 },
                { question: "Was ist das Internet?", answer: "Weltweites Netzwerk von Computern", points: 200 },
                { question: "Was ist eine Website?", answer: "Internetseite mit Informationen", points: 300 },
                { question: "Was ist eine URL?", answer: "Internetadresse einer Webseite", points: 400 },
                { question: "Was bedeutet .de in einer Internetadresse?", answer: "Deutschland", points: 500 },

                // Netzwerk zuhause
                { question: "Womit kommt das Internet ins Haus?", answer: "Router oder Modem", points: 100 },
                { question: "Was ist WLAN?", answer: "Drahtloses Internet", points: 200 },
                { question: "Was ist ein Hotspot?", answer: "Öffentlicher WLAN-Zugang", points: 300 },
                { question: "Warum braucht WLAN ein Passwort?", answer: "Zum Schutz vor unbefugter Nutzung", points: 400 },
                { question: "Was ist der Unterschied zwischen LAN und WLAN?", answer: "LAN mit Kabel, WLAN ohne Kabel", points: 500 },

                // E-Mail Grundlagen
                { question: "Was ist eine E-Mail?", answer: "Elektronische Post", points: 100 },
                { question: "Was bedeutet das @ in der E-Mail-Adresse?", answer: "At - bedeutet bei", points: 200 },
                { question: "Was ist ein E-Mail-Provider?", answer: "Anbieter von E-Mail-Diensten", points: 300 },
                { question: "Was ist CC bei E-Mails?", answer: "Kopie an weitere Empfänger", points: 400 },
                { question: "Was ist BCC?", answer: "Versteckte Kopie", points: 500 },

                // Sicherheit im Netz
                { question: "Was ist ein sicheres Passwort?", answer: "Lang mit Buchstaben, Zahlen und Zeichen", points: 100 },
                { question: "Was ist Phishing?", answer: "Betrug mit gefälschten E-Mails", points: 200 },
                { question: "Woran erkennst du eine sichere Website?", answer: "HTTPS und Schloss-Symbol", points: 300 },
                { question: "Was tust du bei verdächtigen E-Mails?", answer: "Nicht öffnen, löschen", points: 400 },
                { question: "Warum sollte man öffentliches WLAN vorsichtig nutzen?", answer: "Daten können mitgelesen werden", points: 500 },

                // Social Media
                { question: "Was ist Facebook?", answer: "Soziales Netzwerk", points: 100 },
                { question: "Was sollte man bei Privateinstellungen beachten?", answer: "Nicht alles öffentlich machen", points: 200 },
                { question: "Was ist Cybermobbing?", answer: "Mobbing im Internet", points: 300 },
                { question: "Warum sollte man nicht alles posten?", answer: "Bleibt für immer im Internet", points: 400 },
                { question: "Was ist ein digitaler Fußabdruck?", answer: "Spuren die man im Internet hinterlässt", points: 500 },

                // Grundbegriffe
                { question: "Was ist ein Server?", answer: "Computer der Dienste anbietet", points: 100 },
                { question: "Was bedeutet Download?", answer: "Datei herunterladen", points: 200 },
                { question: "Was ist Upload?", answer: "Datei hochladen", points: 300 },
                { question: "Was ist Streaming?", answer: "Videos/Musik direkt abspielen ohne Download", points: 400 },
                { question: "Was ist eine IP-Adresse?", answer: "Eindeutige Adresse eines Geräts im Netz", points: 500 },

                // Geräte im Netzwerk
                { question: "Was macht ein Router?", answer: "Verbindet Geräte mit dem Internet", points: 100 },
                { question: "Was ist ein Switch?", answer: "Verbindet mehrere Geräte in einem Netzwerk", points: 200 },
                { question: "Was macht eine Firewall?", answer: "Schützt vor Angriffen aus dem Internet", points: 300 },
                { question: "Was ist ein Access Point?", answer: "Gerät das WLAN bereitstellt", points: 400 },
                { question: "Was macht ein Repeater?", answer: "Verstärkt WLAN-Signal", points: 500 },

                // Protokolle einfach
                { question: "Was ist HTTP?", answer: "Protokoll für Webseiten", points: 100 },
                { question: "Was bedeutet HTTPS?", answer: "Sicheres HTTP mit Verschlüsselung", points: 200 },
                { question: "Welcher Port wird für HTTP verwendet?", answer: "Port 80", points: 300 },
                { question: "Was ist FTP?", answer: "Protokoll für Dateiübertragung", points: 400 },
                { question: "Was macht DNS?", answer: "Wandelt Domainnamen in IP-Adressen um", points: 500 },

                // Cloud Services
                { question: "Was ist die Cloud?", answer: "Speicher und Dienste im Internet", points: 100 },
                { question: "Nenne einen Cloud-Speicher-Dienst", answer: "Google Drive, Dropbox, OneDrive", points: 200 },
                { question: "Vorteil von Cloud-Speicher?", answer: "Von überall erreichbar", points: 300 },
                { question: "Was ist ein Backup in der Cloud?", answer: "Datensicherung im Internet", points: 400 },
                { question: "Was ist Synchronisation?", answer: "Daten auf allen Geräten gleich halten", points: 500 },

                // Troubleshooting
                { question: "Kein Internet - was zuerst prüfen?", answer: "Kabel und Router", points: 100 },
                { question: "WLAN geht nicht - was tun?", answer: "Router neu starten", points: 200 },
                { question: "Website lädt nicht - was probieren?", answer: "Andere Website testen", points: 300 },
                { question: "E-Mails kommen nicht an - wo schauen?", answer: "Spam-Ordner prüfen", points: 400 },
                { question: "Internet sehr langsam - mögliche Ursache?", answer: "Viele Nutzer oder Downloads", points: 500 }
            ]
        },
        {
            name: "IT-Sicherheit",
            questions: [
                // Passwort Sicherheit
                { question: "Wie lang sollte ein sicheres Passwort sein?", answer: "Mindestens 8 Zeichen", points: 100 },
                { question: "Was gehört in ein sicheres Passwort?", answer: "Buchstaben, Zahlen und Sonderzeichen", points: 200 },
                { question: "Warum sollte jedes Konto ein eigenes Passwort haben?", answer: "Falls eines gehackt wird, sind andere sicher", points: 300 },
                { question: "Was ist ein Passwort-Manager?", answer: "Programm das Passwörter sicher speichert", points: 400 },
                { question: "Was ist Zwei-Faktor-Authentifizierung?", answer: "Zusätzliche Sicherheit neben dem Passwort", points: 500 },

                // Schadsoftware
                { question: "Was ist ein Virus?", answer: "Schädliches Programm das sich selbst kopiert", points: 100 },
                { question: "Was macht ein Trojaner?", answer: "Tarnt sich als harmloses Programm", points: 200 },
                { question: "Was ist Ransomware?", answer: "Erpressung durch Verschlüsselung von Daten", points: 300 },
                { question: "Wie schützt man sich vor Viren?", answer: "Antivirenprogramm und Updates", points: 400 },
                { question: "Was ist ein Rootkit?", answer: "Schadsoftware die sich vor dem System versteckt", points: 500 },

                // E-Mail Sicherheit
                { question: "Woran erkennst du Spam?", answer: "Unbekannter Absender, merkwürdiger Inhalt", points: 100 },
                { question: "Was ist Phishing?", answer: "Betrug um Passwörter zu stehlen", points: 200 },
                { question: "Was machst du mit verdächtigen E-Mail-Anhängen?", answer: "Nicht öffnen", points: 300 },
                { question: "Wie erkennst du eine Phishing-E-Mail?", answer: "Drängt zur Eingabe von Passwörtern", points: 400 },
                { question: "Was ist Spear-Phishing?", answer: "Gezielter Phishing-Angriff auf bestimmte Personen", points: 500 },

                // Internet-Sicherheit
                { question: "Woran erkennst du eine sichere Website?", answer: "HTTPS und Schloss-Symbol", points: 100 },
                { question: "Was ist ein sicherer Browser?", answer: "Aktueller Browser mit Sicherheitsupdates", points: 200 },
                { question: "Warum sind Updates wichtig?", answer: "Schließen Sicherheitslücken", points: 300 },
                { question: "Was ist eine Sicherheitslücke?", answer: "Fehler der von Angreifern ausgenutzt werden kann", points: 400 },
                { question: "Was ist Social Engineering?", answer: "Manipulation von Menschen zur Preisgabe von Informationen", points: 500 },

                // WLAN Sicherheit
                { question: "Ist öffentliches WLAN sicher?", answer: "Nein, Daten können mitgelesen werden", points: 100 },
                { question: "Wie schützt man WLAN zuhause?", answer: "Mit starkem Passwort", points: 200 },
                { question: "Was ist WPA2?", answer: "Sicherheitsstandard für WLAN", points: 300 },
                { question: "Warum sollte man WLAN verschlüsseln?", answer: "Damit andere nicht mitlesen können", points: 400 },
                { question: "Was ist ein VPN?", answer: "Verschlüsselte Verbindung durch das Internet", points: 500 },

                // Datenschutz
                { question: "Was sind personenbezogene Daten?", answer: "Informationen die eine Person identifizieren", points: 100 },
                { question: "Warum ist Datenschutz wichtig?", answer: "Schutz der Privatsphäre", points: 200 },
                { question: "Was ist die DSGVO?", answer: "Datenschutz-Grundverordnung", points: 300 },
                { question: "Wer darf deine Daten speichern?", answer: "Nur mit deiner Einwilligung", points: 400 },
                { question: "Was ist das Recht auf Vergessenwerden?", answer: "Recht auf Löschung persönlicher Daten", points: 500 },

                // Backup und Wiederherstellung
                { question: "Was ist ein Backup?", answer: "Sicherheitskopie wichtiger Daten", points: 100 },
                { question: "Wo sollte man Backups speichern?", answer: "An einem anderen Ort als die Originaldaten", points: 200 },
                { question: "Wie oft sollte man Backups machen?", answer: "Regelmäßig, abhängig von der Wichtigkeit", points: 300 },
                { question: "Was ist die 3-2-1 Backup-Regel?", answer: "3 Kopien, 2 verschiedene Medien, 1 extern", points: 400 },
                { question: "Was testet man bei Backups?", answer: "Ob die Wiederherstellung funktioniert", points: 500 },

                // Firewall und Schutz
                { question: "Was ist eine Firewall?", answer: "Schutzbarriere gegen Angriffe", points: 100 },
                { question: "Was macht ein Antivirenprogramm?", answer: "Erkennt und entfernt Schadsoftware", points: 200 },
                { question: "Was ist ein Port?", answer: "Virtueller Anschluss für Netzwerkdienste", points: 300 },
                { question: "Warum sollte man unnötige Dienste deaktivieren?", answer: "Weniger Angriffsfläche für Hacker", points: 400 },
                { question: "Was ist Intrusion Detection?", answer: "Erkennung von Eindringversuchen", points: 500 },

                // Mobile Sicherheit
                { question: "Wo lädt man Apps sicher herunter?", answer: "Nur aus offiziellen App Stores", points: 100 },
                { question: "Warum sollte man das Handy sperren?", answer: "Schutz bei Verlust oder Diebstahl", points: 200 },
                { question: "Was sind App-Berechtigungen?", answer: "Zugriff den Apps auf Handyfunktionen haben", points: 300 },
                { question: "Warum sollte man Apps aktualisieren?", answer: "Für Sicherheitsupdates", points: 400 },
                { question: "Was ist Mobile Device Management?", answer: "Zentrale Verwaltung von Firmenhandys", points: 500 },

                // Incident Response
                { question: "Was tust du bei einem Sicherheitsvorfall?", answer: "Sofort IT-Abteilung informieren", points: 100 },
                { question: "Computer ist langsam und verhält sich merkwürdig - was tun?", answer: "Virenscan starten", points: 200 },
                { question: "Du hast auf einen verdächtigen Link geklickt - was jetzt?", answer: "IT informieren und Passwörter ändern", points: 300 },
                { question: "Was ist bei einem Datenleck zu tun?", answer: "Vorfall melden und betroffene Personen informieren", points: 400 },
                { question: "Was dokumentiert man bei Sicherheitsvorfällen?", answer: "Was passiert ist und welche Schritte unternommen wurden", points: 500 }
            ]
        }
    ]
};