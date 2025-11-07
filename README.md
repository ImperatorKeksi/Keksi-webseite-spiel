<div align="center">

#  Jeopardy Quiz - Interaktives Lernspiel

### *Spielerisch lernen, digital lehren*

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-aktiv-success.svg)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)
[![Made with](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)](https://web.dev/progressive-web-apps/)

**Ein modernes, webbasiertes Lernspiel für Lehrer und Auszubildende**

[ Demo starten](#installation)  [ Dokumentation](#inhaltsverzeichnis)  [ Kontakt](#-kontakt--soziale-medien)

![Jeopardy Quiz Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=Jeopardy+Quiz+-+Interaktives+Lernen)

</div>

---

##  Inhaltsverzeichnis

- [ Über das Projekt](#-über-das-projekt)
- [ Motivation & Entstehung](#-motivation--entstehung)
- [ Features & Funktionen](#-features--funktionen)
- [ Spielmodi](#-spielmodi)
- [ Technologien](#-technologien)
- [ Installation & Start](#-installation--start)
- [ Projektstruktur](#-projektstruktur)
- [ Entwicklung](#-entwicklung)
- [ Über den Entwickler](#-über-den-entwickler)
- [ Kontakt & Soziale Medien](#-kontakt--soziale-medien)
- [ Lizenz](#-lizenz)

---

##  Über das Projekt

**Jeopardy Quiz** ist eine vollständig selbst entwickelte, webbasierte Progressive Web App (PWA), die das klassische Jeopardy-Spielprinzip in die digitale Welt bringt. Das Projekt entstand als persönliches Lernprojekt während meiner Ausbildung zum Fachinformatiker und hat sich zu einem vollwertigen Bildungstool entwickelt.

###  Was macht dieses Projekt besonders?

- ** 100% Eigenentwicklung** - Von Grund auf selbst programmiert, keine Frameworks
- ** Bildungsfokus** - Speziell für Ausbildungsberufe entwickelt
- ** Modern & Zugänglich** - Läuft auf jedem Gerät, auch offline
- ** Durchdacht gestaltet** - Professionelles UI/UX Design
- ** Erweiterbar** - Lehrer können eigene Fragen erstellen
- ** PWA-Ready** - Installierbar wie eine native App

###  Wie funktioniert es?

Das Spiel folgt dem klassischen Jeopardy-Format:
1. **Wähle eine Kategorie** aus 5 verschiedenen Themenbereichen
2. **Wähle einen Punktwert** (100-500 Punkte, steigender Schwierigkeitsgrad)
3. **Beantworte die Frage** - Richtig = Punkte gewinnen, Falsch = Punkte verlieren
4. **Daily Doubles** bringen zusätzliche Spannung mit Einsatz-Möglichkeiten
5. **Multiplayer-Modus** ermöglicht Wettbewerb mit bis zu 6 Spielern

---

##  Motivation & Entstehung

###  Warum dieses Projekt?

Als Auszubildender zum Fachinformatiker für IT-Systemelektroniker habe ich gemerkt, dass:
-  **Lernen oft trocken ist** - Traditionelle Methoden sind nicht immer motivierend
-  **Gamification funktioniert** - Spielerisches Lernen macht mehr Spaß
-  **Lehrer Tools brauchen** - Digitale Werkzeuge fehlen oft
-  **Technik helfen kann** - Moderne Webtechnologien bieten tolle Möglichkeiten

###  Die Entstehungsgeschichte

**Start:** Einfaches Quiz-Spiel für IT-Grundlagen  
**Evolution:** Hinzufügen von Multiplayer, Themes, Sound-Effekten  
**Expansion:** Mehrere Spielmodi für verschiedene Berufe  
**Professionalisierung:** Auth-System, Editor, PWA-Features  
**Heute:** Vollwertiges Bildungstool mit 125+ Fragen

###  Was ich dabei gelernt habe

-  **Frontend-Entwicklung** - HTML5, CSS3, JavaScript ES6+
-  **Progressive Web Apps** - Service Worker, Offline-Funktionalität
-  **UI/UX Design** - Responsive Design, Animationen, Accessibility
-  **State Management** - Spiellogik, Event-Handling, Datenverwaltung
-  **Audio-Programmierung** - Web Audio API für synthetische Sounds
-  **Projekt-Management** - Git, Dokumentation, Best Practices

---

##  Features & Funktionen

<table>
<tr>
<td width="50%">

###  Spiel-Features

-  **4 Spielmodi** (IT, Lagerlogistik, Kaufmännisch, Standard)
-  **125+ Fragen** (25 pro Modus)
-  **5 Kategorien** pro Modus
-  **Punktesystem** 100-500 je Schwierigkeit
-  **Daily Double** Bonus-Fragen
-  **Timer-Funktion** (optional)
-  **1-6 Spieler** Multiplayer
-  **Statistiken** & Achievements
-  **Sound-Effekte** Akustisches Feedback

</td>
<td width="50%">

###  Design & UX

-  **5 Theme-Designs** Farbschemata
-  **Smooth Animationen** Flüssige Übergänge
-  **Responsive Design** Mobile-First
-  **Touch-optimiert** Tablet-freundlich
-  **Accessibility** Tastatur & Screen-Reader
-  **Dark Mode** Augenschonend
-  **Glassmorphism** Modernes Design
-  **Gradient Backgrounds** Attraktiv
-  **Emoji-Icons** Intuitiv

</td>
</tr>
<tr>
<td width="50%">

###  Lehrer-Tools

-  **Fragen-Editor** Eigene Fragen erstellen
-  **Kategorie-Management** Neue Themen
-  **Import/Export** JSON-Format
-  **Rollen-System** Gast/Lehrer/Admin
-  **Login-System** Sicher & einfach
-  **Berechtigungen** Zugriffskontrolle

</td>
<td width="50%">

###  PWA-Features

-  **Offline-Modus** Ohne Internet spielbar
-  **Installierbar** Homescreen-Icon
-  **Service Worker** Schnelles Laden
-  **Local Storage** Daten bleiben erhalten
-  **App-like** Fühlt sich nativ an
-  **Auto-Update** Immer aktuell

</td>
</tr>
</table>

---

##  Spielmodi

Das Spiel bietet **4 spezialisierte Modi** für verschiedene Ausbildungsberufe:

<table>
<tr>
<td width="50%">

###  IT-Modus
**Für Fachinformatiker & IT-Azubis**

 **Kategorien:**
- Hardware-Basics
- Software & Betriebssysteme  
- Netzwerk-Grundlagen
- Programmierung
- IT-Sicherheit

 **25 Fragen** von Grundlagen bis Expertenwissen  
 **Beispiel:** "Was bedeutet RAM?" (100 Punkte)

</td>
<td width="50%">

###  Lagerlogistik-Modus
**Für Fachlageristen & Logistik-Azubis**

 **Kategorien:**
- Lagertechnik
- Arbeitssicherheit
- Transport & Versand
- Warenwirtschaft
- Lagerorganisation

 **25 Fragen** praxisnah und berufsrelevant  
 **Beispiel:** "Was ist FIFO?" (100 Punkte)

</td>
</tr>
<tr>
<td width="50%">

###  Kaufmännischer Modus
**Für Bürokaufleute & kaufmännische Azubis**

 **Kategorien:**
- Büroorganisation
- Rechnungswesen
- Kommunikation & Korrespondenz
- Geschäftsprozesse
- Recht & Verträge

 **25 Fragen** von Basics bis Spezialwissen  
 **Beispiel:** "Was bedeutet i.V.?" (100 Punkte)

</td>
<td width="50%">

###  Standard-Modus
**Für alle - Allgemeinwissen**

 **Kategorien:**
- Allgemeinwissen
- Mathematik & Logik
- Deutsch & Sprache
- Kultur & Geschichte
- Wissenschaft & Natur

 **25 Fragen** für jeden geeignet  
 **Beispiel:** "Wie viele Bundesländer hat Deutschland?" (100 Punkte)

</td>
</tr>
</table>

---

##  Technologien

###  Tech Stack

<div align="center">

| Kategorie | Technologien |
|-----------|-------------|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Architektur** | Vanilla JS, OOP, Event-Driven, Modular |
| **PWA** | Service Worker, Web App Manifest, Cache API |
| **Storage** | LocalStorage API, IndexedDB-ready |
| **Audio** | Web Audio API (synthetisch generiert) |
| **Design** | CSS Grid, Flexbox, Animations, Glassmorphism |

</div>

###  Design Prinzipien

- **Mobile-First** - Zuerst für kleine Bildschirme entwickelt
- **Progressive Enhancement** - Grundfunktion immer gewährleistet
- **Semantic HTML** - Barrierefreies Markup
- **BEM Methodology** - Strukturierte CSS-Klassennamen
- **Modern CSS** - Custom Properties, Grid, Animations

###  Performance

- **No Framework Overhead** - Pure JavaScript = Schnell!
- **Lazy Loading** - Ressourcen bei Bedarf laden
- **Code Splitting** - Modulare JavaScript-Dateien
- **Optimized Assets** - Minimale Ladezeiten
- **Service Worker Caching** - Instant Loading nach erstem Besuch

###  Browser-Kompatibilität

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ |  Vollständig unterstützt |
| Firefox | 88+ |  Vollständig unterstützt |
| Safari | 14+ |  Vollständig unterstützt |
| Edge | 90+ |  Vollständig unterstützt |
| Mobile | iOS/Android |  Optimiert |

---

##  Installation & Start

###  Voraussetzungen

- Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Optional: Live Server für lokale Entwicklung

###  Installation

\\\ash
# 1. Repository klonen
git clone https://github.com/ImperatorKeksi/Keksi-webseite-spiel.git

# 2. In Ordner wechseln
cd Keksi-webseite-spiel

# 3. index.html im Browser öffnen
# ODER Live Server starten (empfohlen)
\\\

###  Lokaler Server (Empfohlen)

**Option A: VS Code Live Server**
1. Installiere die Extension "Live Server"
2. Rechtsklick auf \index.html\  "Open with Live Server"
3. Browser öffnet automatisch \http://localhost:5500\

**Option B: Python**
\\\ash
python -m http.server 8000
# Dann öffne: http://localhost:8000
\\\

**Option C: Node.js**
\\\ash
npx http-server
# Dann öffne: http://localhost:8080
\\\

###  Als PWA installieren

1. Öffne die Website im Chrome/Edge Browser
2. Klicke auf das  Icon in der Adressleiste
3. Wähle "Installieren"
4. App wird zum Homescreen hinzugefügt
5. Jetzt auch offline spielbar! 

---

##  Projektstruktur

\\\
Keksi-webseite-spiel/

  index.html              # Landing Page mit Navigation
  game.html               # Hauptspiel mit Modus-Auswahl

  Styles
    styles.css             # Spiel-Styles (3445 Zeilen)
    main.css               # Landing Page Styles

  Core JavaScript
    script.js              # Hauptprogramm (1804 Zeilen)
    modules.js             # Game State, Events (284 Zeilen)
    sounds.js              # Audio Engine (248 Zeilen)
    sw.js                  # Service Worker (162 Zeilen)

  Authentifizierung
    auth.js                # Auth-System (491 Zeilen)
    auth-ui.js             # Login/Register UI (278 Zeilen)

  Features
    editor.js              # Fragen-Editor (770 Zeilen)
    stats.js               # Statistik-System (538 Zeilen)
    feedback.js            # Feedback Manager (759 Zeilen)
    main.js                # Landing Page Logic (222 Zeilen)

  Fragen-Datenbanken
    questions.js           # Allgemeinwissen (184 Zeilen)
    questions_it.js        # IT-Fragen (407 Zeilen)
    questions_lagerlogistik.js  # Logistik (78 Zeilen)
    questions_standard.js  # Standard (78 Zeilen)
    questions_kaufmaennisch.js  # Kaufmännisch (78 Zeilen)

  Konfiguration
    manifest.json          # PWA Manifest
    icons/                 # App Icons (8 Größen)

  Dokumentation
     README.md              # Diese Datei
\\\

###  Code-Statistiken

- **Total Dateien:** 22
- **Total Code-Zeilen:** ~10.000+
- **JavaScript:** ~6.500 Zeilen
- **CSS:** ~3.500 Zeilen
- **Fragen:** 125+
- **Entwicklungszeit:** 3 Monate
- **Commits:** 100+

---

##  Entwicklung

###  Eigene Fragen hinzufügen

1. Öffne eine der \questions_*.js\ Dateien
2. Finde die passende Kategorie
3. Füge neue Frage hinzu:

\\\javascript
{
    question: "Deine Frage hier?",
    answer: "Die Antwort",
    points: 100  // oder 200, 300, 400, 500
}
\\\

###  Neues Theme erstellen

In \styles.css\:

\\\css
.theme-mein-theme {
    --primary-gradient: linear-gradient(135deg, #farbe1, #farbe2);
    --text-primary: #farbe3;
    /* ... weitere Farben */
}
\\\

###  Deployment

**GitHub Pages:**
1. Repository auf GitHub pushen
2. Settings  Pages  Source: main branch
3. Fertig! URL: \https://username.github.io/repo-name\

**Netlify/Vercel:**
1. Repository verbinden
2. Build Command: keine (statisch)
3. Publish Directory: \/\
4. Deploy!

---

##  Über den Entwickler

<div align="center">

### **Nico Kaschube**
*Auszubildender Fachinformatiker für IT-Systemelektroniker*

![Developer](https://img.shields.io/badge/Developer-Nico%20Kaschube-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Ausbildung-green?style=for-the-badge)

</div>

####  Persönliche Informationen

- ** Ausbildung:** Fachinformatiker für IT-Systemelektroniker
- ** Ausbildungsstätte:** Oberlinhaus Oberhausen
- ** Ausbildungszeitraum:** 2024 - 2027 (laufend)
- ** Standort:** Oberhausen, Deutschland
- ** Fachrichtung:** IT-Systemelektroniker

####  Motivation hinter diesem Projekt

Als IT-Azubi erlebe ich täglich, wie wichtig praktische und interaktive Lernmethoden sind. Dieses Projekt ist aus dem Wunsch entstanden, digitale Tools zu schaffen, die:

-  **Lernen motivierend machen** - Gamification statt trockene Theorie
-  **Lehrern helfen** - Moderne Werkzeuge für modernen Unterricht
-  **Technik sinnvoll nutzen** - Zeigen, was mit Webtechnologien möglich ist
-  **Wissen teilen** - Open Source für alle zugänglich

####  Technische Kompetenzen

<table>
<tr>
<td width="33%">

**Frontend**
- HTML5 / CSS3
- JavaScript ES6+
- Responsive Design
- PWA Development

</td>
<td width="33%">

**Tools & Workflow**
- Git / GitHub
- VS Code
- Chrome DevTools
- Live Server

</td>
<td width="33%">

**Soft Skills**
- Selbstständiges Lernen
- Problemlösung
- Dokumentation
- Projekt-Management

</td>
</tr>
</table>

####  Persönliche Ziele

-  **Abschluss:** Erfolgreiche IHK-Prüfung
-  **Karriere:** Junior Developer  Senior Developer
-  **Lernen:** Ständige Weiterbildung in neuen Technologien
-  **Beitrag:** Open Source Community unterstützen

---

##  Kontakt & Soziale Medien

<div align="center">

###  Lass uns vernetzen!

[![Soziale Medien](https://img.shields.io/badge/Alle%20Links-guns.lol-ff69b4?style=for-the-badge&logo=linktree&logoColor=white)](https://guns.lol/imperatorkeksi)

** [guns.lol/imperatorkeksi](https://guns.lol/imperatorkeksi) **

*Alle meine Social Media Profile an einem Ort!*

---

###  Weitere Kontaktmöglichkeiten

[![GitHub](https://img.shields.io/badge/GitHub-ImperatorKeksi-181717?style=for-the-badge&logo=github)](https://github.com/ImperatorKeksi)
[![Repository](https://img.shields.io/badge/Repo-Keksi--webseite--spiel-blue?style=for-the-badge&logo=github)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)

---

###  Feedback & Fragen

Hast du Fragen, Anregungen oder Verbesserungsvorschläge?

-  **Feature Requests:** [GitHub Issues](https://github.com/ImperatorKeksi/Keksi-webseite-spiel/issues)
-  **Bug Reports:** [GitHub Issues](https://github.com/ImperatorKeksi/Keksi-webseite-spiel/issues)
-  **Stars:** Wenn dir das Projekt gefällt, gib einen  auf GitHub!

</div>

---

##  Mitwirken & Beitragen

###  Du willst helfen?

Ich freue mich über jeden Beitrag! Hier sind einige Möglichkeiten:

1. ** Star das Projekt** auf GitHub
2. ** Bug Reports** über GitHub Issues melden
3. ** Feature Vorschläge** einreichen
4. ** Fragen hinzufügen** für weitere Modi
5. ** Designs teilen** für neue Themes
6. ** Dokumentation verbessern**

###  Pull Requests

1. Fork das Repository
2. Erstelle einen Feature Branch (\git checkout -b feature/AmazingFeature\)
3. Commit deine Änderungen (\git commit -m 'Add some AmazingFeature'\)
4. Push zum Branch (\git push origin feature/AmazingFeature\)
5. Öffne einen Pull Request

---

##  Lizenz

<div align="center">

**MIT License**

Copyright  2025 Nico Kaschube

*Dieses Projekt ist Open Source und frei verwendbar für Bildungszwecke.*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

##  Danksagungen

Ein großes Dankeschön an:

- ** Oberlinhaus Oberhausen** - Für die Ausbildung und Unterstützung
- ** Meine Ausbilder** - Für die Förderung meiner Entwicklung
- ** Kollegen & Azubis** - Für Feedback und Ideen
- ** Open Source Community** - Für Inspiration und Best Practices
- ** MDN Web Docs** - Beste Dokumentation ever!
- ** Design Community** - Für UI/UX Inspiration

---

##  Projekt-Roadmap

###  Version 1.2.0 (Aktuell)
-  4 vollständige Spielmodi
-  125+ Fragen verfügbar
-  Auth-System mit Rollen
-  Lehrer-Editor funktionsfähig
-  PWA-Features vollständig
-  Umfassende Dokumentation

###  Version 1.3.0 (Geplant)
- [ ]  Mehrsprachigkeit (EN, DE)
- [ ]  Erweiterte Statistiken
- [ ]  Neue Spielmodi (Medizin, Recht)
- [ ]  Cloud-Sync für Fortschritt
- [ ]  Achievement-System
- [ ]  Native Mobile Apps

###  Version 2.0.0 (Vision)
- [ ]  Multiplayer über Netzwerk
- [ ]  Video-Fragen
- [ ]  KI-generierte Fragen
- [ ]  Lernpfade & Kurse
- [ ]  Lehrer-Dashboard
- [ ]  Analytics für Lehrer

---

##  Zusätzliche Ressourcen

###  Für Lehrer

- **[Lehrer-Handbuch](docs/teacher-guide.md)** (coming soon)
- **[Fragen-Vorlagen](docs/question-templates.md)** (coming soon)
- **[Best Practices](docs/best-practices.md)** (coming soon)

###  Für Entwickler

- **[API Dokumentation](docs/api.md)** (coming soon)
- **[Contributing Guide](CONTRIBUTING.md)** (coming soon)
- **[Code Style Guide](docs/style-guide.md)** (coming soon)

###  Für Spieler

- **[Spielanleitung](docs/how-to-play.md)** (coming soon)
- **[FAQ](docs/faq.md)** (coming soon)
- **[Tipps & Tricks](docs/tips.md)** (coming soon)

---

<div align="center">

##  Danke fürs Lesen!

*Wenn dir dieses Projekt gefällt, gib ihm einen  auf GitHub!*

---

**Entwickelt mit  und viel  für bessere Bildung**

*Nico Kaschube - Auszubildender Fachinformatiker für IT-Systemelektroniker*  
*Oberlinhaus Oberhausen, 2025*

---

[![Made with Love](https://img.shields.io/badge/Made%20with--red?style=for-the-badge)](https://github.com/ImperatorKeksi)
[![Built with Coffee](https://img.shields.io/badge/Built%20with--brown?style=for-the-badge)](https://github.com/ImperatorKeksi)
[![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>
