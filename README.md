# Jeopardy Quiz - Interaktives Lernspiel für Lehrer

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-aktiv-success.svg)

##  Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Für wen ist das?](#für-wen-ist-das)
- [Funktionen](#funktionen)
- [Spielmodi](#spielmodi)
- [Installation](#installation)
- [Dateiübersicht](#dateiübersicht)
- [Technologien](#technologien)
- [Über den Entwickler](#über-den-entwickler)
- [Lizenz](#lizenz)

---

##  Über das Projekt

**Jeopardy Quiz** ist ein interaktives, webbasiertes Lernspiel, das speziell für Lehrer und Bildungseinrichtungen entwickelt wurde. Es bietet eine unterhaltsame Möglichkeit, Wissen in verschiedenen Bereichen zu testen und zu vertiefen.

Das Spiel funktioniert wie die bekannte TV-Show Jeopardy: Spieler wählen Kategorien und Punktwerte aus und müssen Fragen beantworten. Je schwieriger die Frage, desto mehr Punkte gibt es!

###  Besonderheiten

- **Progressive Web App (PWA)** - Funktioniert auch offline!
- **Keine Installation nötig** - Läuft direkt im Browser
- **Responsive Design** - Optimiert für Desktop, Tablet und Smartphone
- **Multiplayer-Unterstützung** - Bis zu 6 Spieler gleichzeitig
- **Lehrer-Editor** - Eigene Fragen erstellen und bearbeiten

---

##  Für wen ist das?

Dieses Tool wurde speziell entwickelt für:

###  Lehrer & Pädagogen
- Interaktive Unterrichtsgestaltung
- Wissensüberprüfung auf spielerische Art
- Eigene Fragen für spezifische Themen erstellen
- Verschiedene Schwierigkeitsgrade anpassen

###  Auszubildende & Schüler
- IT-Ausbildung (Fachinformatiker)
- Lagerlogistik (Fachlagerist)
- Kaufmännische Berufe (Bürokaufmann)
- Allgemeinbildung

###  Bildungseinrichtungen
- Oberlinhaus Berlin
- Berufsschulen
- Weiterbildungsinstitute
- Betriebliche Ausbildung

---

##  Funktionen

###  Spiel-Features
-  **4 verschiedene Spielmodi** (IT, Lagerlogistik, Standard, Kaufmännisch)
-  **25 Fragen pro Spiel** (5 Kategorien  5 Fragen)
-  **Punktesystem** (100-500 Punkte je nach Schwierigkeit)
-  **Daily Double** - Zufällige Bonus-Fragen mit doppelten Punkten
-  **Timer-Funktion** - Zeitlimit für Antworten (optional)
-  **Multiplayer-Modus** - 1-6 Spieler
-  **Statistiken** - Fortschritt und Erfolge tracken
-  **Sound-Effekte** - Akustisches Feedback

###  Benutzeroberfläche
-  **5 Theme-Designs** (Purple-Blue, Ocean-Blue, Forest-Green, Sunset-Orange, Dark-Mode)
-  **Animationen** - Flüssige Übergänge und visuelle Effekte
-  **Touch-optimiert** - Perfekt für Tablets
-  **Barrierefreiheit** - Tastatursteuerung und Screen-Reader kompatibel
-  **Responsive Design** - Passt sich jedem Bildschirm an

###  Lehrer-Tools
-  **Fragen-Editor** - Eigene Fragen erstellen, bearbeiten, löschen
-  **Kategorie-Management** - Neue Kategorien hinzufügen
-  **Import/Export** - Fragen als JSON speichern und laden
-  **Rollen-System** - Gast, Lehrer, Admin-Zugriff
-  **Login-System** - Sichere Authentifizierung

###  PWA-Features
-  **Offline-Modus** - Spiel ohne Internet spielbar
-  **Installierbar** - Auf Homescreen hinzufügen
-  **Schnell** - Service Worker für optimale Performance
-  **Zuverlässig** - Daten werden lokal gespeichert

---

##  Spielmodi

Das Spiel bietet 4 spezialisierte Modi für verschiedene Ausbildungsberufe:

###  IT-Modus
**Für Fachinformatiker & IT-Auszubildende**
- **Kategorien**: Hardware, Software, Netzwerke, Programmierung, IT-Sicherheit
- **Schwierigkeit**: Grundlagen bis Expertenwissen
- **Frageanzahl**: 25 Fragen
- **Beispiele**: "Was bedeutet RAM?", "Welches Protokoll nutzt das Web?"

###  Lagerlogistik-Modus
**Für Fachlageristen & Logistik-Azubis**
- **Kategorien**: Lagertechnik, Sicherheit, Transport, Warenwirtschaft, Organisation
- **Schwierigkeit**: Praxisnah und berufsrelevant
- **Frageanzahl**: 25 Fragen
- **Beispiele**: "Was ist FIFO?", "Welche Schutzkleidung im Lager?"

###  Kaufmännischer Modus
**Für Bürokaufleute & kaufmännische Auszubildende**
- **Kategorien**: Büroorganisation, Rechnungswesen, Kommunikation, Geschäftsprozesse, Recht
- **Schwierigkeit**: Von Basics bis zu Spezialwissen
- **Frageanzahl**: 25 Fragen
- **Beispiele**: "Was bedeutet i.V.?", "Wie hoch ist die Mehrwertsteuer?"

###  Standard-Modus
**Für alle - Allgemeinwissen**
- **Kategorien**: Allgemeinwissen, Mathematik, Deutsch, Kultur, Wissenschaft
- **Schwierigkeit**: Für jeden geeignet
- **Frageanzahl**: 25 Fragen
- **Beispiele**: "Wie viele Bundesländer hat Deutschland?", "Wer malte die Mona Lisa?"

---

##  Installation

### Option 1: Direkter Start (Empfohlen)
1. Repository herunterladen oder klonen
2. \index.html\ im Browser öffnen
3. Fertig! 

### Option 2: Lokaler Webserver
\\\ash
# Mit Python 3
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
\\\

Dann Browser öffnen: \http://localhost:8000\

### Option 3: Als PWA installieren
1. Website im Chrome/Edge öffnen
2. Auf "Installieren" klicken (Icon in der Adressleiste)
3. App wird zum Homescreen hinzugefügt
4. Offline spielbar!

---

##  Dateiübersicht

###  HTML-Dateien
| Datei | Beschreibung |
|-------|--------------|
| \index.html\ | Hauptseite - Landing Page mit Navigation, Spielauswahl und Login |
| \game.html\ | Spieloberfläche - Enthält das komplette Jeopardy-Spiel mit allen Modi |

###  CSS-Dateien
| Datei | Beschreibung |
|-------|--------------|
| \styles.css\ | Hauptstyles für das Spiel - Theme-System, Animationen, Responsive Design (3445 Zeilen) |
| \main.css\ | Styles für die Landing Page - Navigation, Hero-Section, Game-Cards |

###  JavaScript Kern-Dateien
| Datei | Beschreibung |
|-------|--------------|
| \script.js\ | **Hauptprogramm** - JeopardyGame-Klasse, Spiel-Logik, UI-Management, Debug-System (1804 Zeilen) |
| \modules.js\ | **Spiel-Module** - GameStateManager, PerformanceMonitor, EventSystem (284 Zeilen) |
| \sounds.js\ | **Audio-Engine** - SoundManager für alle Sound-Effekte, synthetische Audio-Generierung (246 Zeilen) |
| \main.js\ | **Landing Page Logik** - Navigation, Smooth-Scrolling, Interaktionen |

###  Authentifizierung
| Datei | Beschreibung |
|-------|--------------|
| \uth.js\ | **Auth-System** - Benutzer-Verwaltung, Rollen (Gast/Lehrer/Admin), LocalStorage |
| \uth-ui.js\ | **Auth-UI** - Login/Logout-Dialoge, Registrierung, Passwort-Verwaltung |

###  Fragen-Datenbanken
| Datei | Beschreibung | Kategorien |
|-------|--------------|------------|
| \questions.js\ | Allgemeinwissen | Geschichte, Wissenschaft, Geographie, Kunst, Sport |
| \questions_it.js\ | IT-Fragen | Hardware, Software, Netzwerke, Programmierung, IT-Sicherheit |
| \questions_lagerlogistik.js\ | Logistik-Fragen | Lagertechnik, Sicherheit, Transport, Warenwirtschaft, Organisation |
| \questions_standard.js\ | Standard-Fragen | Allgemeinwissen, Mathematik, Deutsch, Kultur, Wissenschaft |
| \questions_kaufmaennisch.js\ | Kaufmännische Fragen | Büro, Rechnungswesen, Kommunikation, Geschäftsprozesse, Recht |

###  Zusatz-Features
| Datei | Beschreibung |
|-------|--------------|
| \editor.js\ | **Fragen-Editor** - UI für Lehrer zum Erstellen/Bearbeiten von Fragen |
| \stats.js\ | **Statistik-System** - Spieler-Stats, Fortschritt, Achievements |
| \eedback.js\ | **Feedback-System** - Rückmeldungen sammeln und anzeigen |

###  PWA & Config
| Datei | Beschreibung |
|-------|--------------|
| \sw.js\ | **Service Worker** - Offline-Funktionalität, Caching-Strategie (162 Zeilen) |
| \manifest.json\ | **PWA Manifest** - App-Konfiguration, Icons, Theme-Farben |

###  Dokumentation
| Datei | Beschreibung |
|-------|--------------|
| \README.md\ | Diese Datei - Vollständige Projektdokumentation |

---

##  Technologien

### Frontend
- **HTML5** - Semantisches Markup
- **CSS3** - Modern mit Flexbox, Grid, Animationen
- **JavaScript ES6+** - Klassen, Module, Async/Await

### Architektur
- **Vanilla JavaScript** - Keine Frameworks, pure Performance
- **Object-Oriented Programming** - Klassen-basierte Struktur
- **Event-Driven** - Observer Pattern für Kommunikation
- **Modular Design** - Wiederverwendbare Komponenten

### PWA-Technologien
- **Service Worker API** - Offline-Caching
- **Web App Manifest** - Installierbarkeit
- **LocalStorage API** - Daten-Persistierung
- **Web Audio API** - Sound-Generierung

### Browser-Kompatibilität
-  Chrome 90+
-  Firefox 88+
-  Safari 14+
-  Edge 90+
-  Mobile Browser (iOS Safari, Chrome Mobile)

---

##  Über den Entwickler

### Nico Kaschube
**Auszubildender Fachinformatiker für IT-Systemelektroniker**

 **Standort**: Oberhausen, Deutschland  
 **Ausbildungsort**: Oberlinhaus Berlin  
 **Ausbildungsjahr**: 2024-2027 (laufend)  
 **Fachrichtung**: IT-Systemelektroniker

####  Motivation
Dieses Projekt entstand aus der Idee, digitale Lerntools zu entwickeln, die Lehrern und Auszubildenden helfen, Wissen auf unterhaltsame Weise zu vermitteln und zu festigen. Als IT-Azubi selbst weiß ich, wie wichtig praktische und interaktive Lernmethoden sind.

####  Ziel des Projekts
Das Jeopardy Quiz soll Lehrern ein flexibles Tool an die Hand geben, mit dem sie:
- Unterrichtsinhalte spielerisch vermitteln können
- Eigene Fragen für spezifische Themen erstellen können
- Den Lernerfolg ihrer Schüler fördern können
- Digitale Kompetenzen im Unterricht einsetzen können

####  Technische Kompetenzen
- **Frontend-Entwicklung**: HTML5, CSS3, JavaScript ES6+
- **Web-Technologien**: PWA, Service Worker, Web APIs
- **UI/UX Design**: Responsive Design, Accessibility, User Experience
- **Projekt-Management**: Git, Versionskontrolle, Dokumentation

---

##  Entwicklungsstand

###  Version 1.2.0 (Aktuell)
- 4 vollständige Spielmodi
- Über 100 Fragen verfügbar
- Vollständiges Auth-System
- Lehrer-Editor funktionsfähig
- PWA-Features implementiert
- Umfassende Dokumentation

###  Geplante Features (v1.3.0)
- [ ] Mehr Fragenkategorien
- [ ] Mehrspieler über Netzwerk
- [ ] Fortschritts-Dashboard für Lehrer
- [ ] Export von Spielstatistiken
- [ ] Weitere Spiel-Modi
- [ ] Dark Mode Verbesserungen

---

##  Mitwirken

Verbesserungsvorschläge und Bug-Reports sind willkommen!

### Kontakt
- **GitHub**: @ImperatorKeksi
- **Repository**: Keksi-webseite-spiel

---

##  Lizenz

MIT License - Frei verwendbar für Bildungszwecke.

---

##  Danksagungen

- **Oberlinhaus Berlin** - Für die Ausbildung und Unterstützung
- **Alle Lehrer und Azubis** - Für Feedback und Ideen
- **Open Source Community** - Für Inspiration und Best Practices

---

##  Support & Hilfe

### Häufige Fragen (FAQ)

**Q: Benötige ich einen Account zum Spielen?**  
A: Nein! Als Gast können Sie sofort loslegen. Nur für den Fragen-Editor benötigen Sie einen Lehrer-Account.

**Q: Funktioniert das Spiel offline?**  
A: Ja! Nach dem ersten Laden funktioniert alles offline (PWA-Feature).

**Q: Kann ich eigene Fragen hinzufügen?**  
A: Ja! Mit einem Lehrer-Account haben Sie Zugriff auf den Fragen-Editor.

**Q: Auf welchen Geräten läuft das Spiel?**  
A: Desktop, Laptop, Tablet, Smartphone - vollständig responsive!

**Q: Ist das Spiel kostenlos?**  
A: Ja, komplett kostenlos für Bildungszwecke!

---

**Entwickelt mit  für bessere Bildung**

*Nico Kaschube - Auszubildender Fachinformatiker für IT-Systemelektroniker*  
*Oberlinhaus Oberhausen, 2025*
