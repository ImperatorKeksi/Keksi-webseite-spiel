<div align="center">

# 🎓 Lehrer Tools - Oberlinhaus

### *Digitale Werkzeuge für modernen Unterricht*

[![Version](https://img.shields.io/badge/version-v1.0--beta-orange.svg)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)
[![Status](https://img.shields.io/badge/status-Open%20Beta-yellow.svg)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)
[![Made with](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)](https://web.dev/progressive-web-apps/)
[![Design](https://img.shields.io/badge/Design-Glassmorphism-purple.svg)](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)

**Eine wachsende Sammlung digitaler Tools für Lehrer und Ausbilder**

**⚠️ OPEN BETA - In aktiver Entwicklungsphase | Feedback willkommen!**

[📧 Kontakt & Feedback](#-über-den-entwickler)

</div>

---

## 📋 Inhaltsverzeichnis

- [🎯 Über das Projekt](#-über-das-projekt)
- [💻 Technologien](#-technologien)
- [👨‍💻 Über den Entwickler](#-über-den-entwickler)
- [🙏 Danksagungen](#-danksagungen)

---

## 🎯 Über das Projekt

**Lehrer Tools** ist eine vollständig selbst entwickelte Plattform mit digitalen Werkzeugen für Lehrer und Ausbilder. Das Projekt entsteht während meiner Ausbildung zum Fachinformatiker und wird basierend auf Feedback von Berufsschullehrern kontinuierlich weiterentwickelt.

### ✨ Was macht dieses Projekt besonders?

- ✅ **100% Eigenentwicklung** - Komplett selbst programmiert, keine Frameworks
- 🎓 **Bildungsfokus** - Speziell für Berufsschulen und Ausbilder
- 📱 **Modern & Zugänglich** - Läuft auf jedem Gerät, auch offline (PWA)
- 🎨 **Professionelles Design** - Modernes UI/UX mit Glassmorphism & Dark Theme
- ⚡ **Performance-optimiert** - Schnelle Ladezeiten, progressive Enhancement
- ♿ **Barrierefrei** - WCAG 2.1 AA konform
- 💬 **Open Beta** - Aktive Entwicklung mit Feedback-Integration
- 🇩🇪 **Vollständig auf Deutsch** - Optimiert für deutsche Berufsschulen

### 💡 Motivation

Als IT-Azubi möchte ich:
- 🎯 Berufsschulen und Lehrern praktische Tools zur Verfügung stellen
- ⚡ Den Unterrichtsalltag vereinfachen und digitalisieren
- 📈 Basierend auf Feedback die Plattform stetig erweitern
- 🎓 Meine Fähigkeiten während der Ausbildung unter Beweis stellen

---

##  Technologien

### 🛠️ Tech Stack

<div align="center">

| Kategorie | Technologien |
|-----------|-------------|
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) |
| **Architektur** | Vanilla JS, OOP, Event-Driven, Modular Design |
| **PWA** | Service Worker, Web App Manifest, Cache API, Install Prompts |
| **Storage** | LocalStorage API, IndexedDB (planned) |
| **Audio** | Web Audio API (synthetisch generiert) |
| **Design** | CSS Grid, Flexbox, Animations, Glassmorphism, CSS Variables |
| **Accessibility** | WCAG 2.1 AA, ARIA Labels, Keyboard Navigation |
| **Performance** | Code Splitting, Lazy Loading, Asset Optimization |

</div>

### 📊 Code-Statistiken

| Kategorie         | Dateien | Zeilen    |
|-------------------|---------|-----------|
| **HTML**          | 12      | ~2.500    |
| **JavaScript**    | 39      | ~22.000   |
| **CSS**           | 11      | ~7.000    |
| **Fragen-DB**     | 5       | ~3.500    |
| **Dokumentation** | 3       | ~2.000    |
| **Assets**        | 5       | -         |
| **GESAMT**        | 75      | **~37.000** |

- ⏱️ **Entwicklungszeit:** 6 Wochen
- 🔄 **Commits:** 350+
- 🛠️ **Tools:** 7 (Quiz, Timer, Stadt-Land-Fluss, Zufallsgenerator, Notenrechner, Aufgabenroulette, Dashboard)
- ✨ **Features:** 12 Enhancement-Module
- 📊 **Analytics:** DSGVO-konform, lokal gespeichert
- 🎮 **Spielmodi:** 4 (Standard, IT, Lagerlogistik, Kaufmännisch)

### 🌐 Browser-Kompatibilität

| Browser | Version | Status |
|---------|---------|--------|
| 🟢 Chrome | 90+ | ✅ Vollständig unterstützt |
| 🟠 Firefox | 88+ | ✅ Vollständig unterstützt |
| 🔵 Safari | 14+ | ✅ Vollständig unterstützt |
| 🟣 Edge | 90+ | ✅ Vollständig unterstützt |
| 📱 Mobile | iOS/Android | ✅ Optimiert |

### 📁 Projektstruktur

```
📂 Keksi-webseite-spiel/
│
├── 📄 START.html                   # Einstiegspunkt, zentrale Startseite für alle Nutzer
├── 📄 README.md                    # Projektübersicht, Dokumentation und Hinweise
├── 📁 config/                      # Build-Konfiguration und Paketverwaltung
│   ├── package.json                # NPM-Pakete und Skripte
│   └── vite.config.js              # Vite Build System für Produktion
├── 📁 docs/                        # Projekt-Dokumentation und technische Guides
│   ├── ANALYTICS.md                # Analytics- und Tracking-Dokumentation
│   ├── PROJECT_STRUCTURE.md        # Ausführliche Projektstruktur und Erklärungen
├── 📁 seiten/                      # Alle HTML-Seiten der Anwendung
│   ├── index.html                  # Hauptmenü und Tool-Übersicht
│   ├── game.html                   # Jeopardy Quiz Spiel
│   ├── stadt-land-fluss.html       # Stadt-Land-Fluss Spiel
│   ├── timer.html                  # Digitale Uhr und Timer
│   ├── zufallsgenerator.html       # Zufallsgenerator Tool
│   ├── notenrechner.html           # Notenrechner Tool
│   ├── aufgabenroulette.html       # Aufgabenroulette Spiel
│   ├── dashboard.html              # Lehrer-Dashboard und Statistiken
│   ├── preview.html                # Beta-Preview und Testseite
├── 📁 portfolio/                   # Entwickler-Portfolio und persönliche Infos
│   └── Portfolio.html              # Portfolio-Seite des Entwicklers
├── 📁 stylesheets/                 # Alle CSS-Styles für Layout und Design
│   ├── main.css                    # Haupt-Styles für Landing Page
│   ├── styles.css                  # Styles für die Spiele und Tools
│   ├── animations.css              # Animationen und Effekte
│   ├── responsive.css              # Responsives Design für alle Geräte
│   ├── accessibility.css           # Barrierefreiheit und A11y-Styles
│   ├── theme.css                   # Theme- und Farbwechsel
│   ├── statistics.css              # Statistik-Widget Styles
│   ├── pwa-styles.css              # PWA-spezifische Styles
│   ├── dashboard.css               # Dashboard-Styles
│   ├── export-share.css            # Export- und Teilen-UI
│   ├── analytics.css               # Analytics-Dashboard Styles
├── 📁 javascript/                  # Alle JavaScript-Dateien und Module
│   ├── script.js                   # Hauptspiel-Logik
│   ├── modules.js                  # Game State Management und Core-Module
│   ├── sounds.js                   # Audio-Engine und Soundeffekte
│   ├── auth.js                     # Authentifizierung und Login
│   ├── auth-ui.js                  # Login-UI Komponenten
│   ├── editor.js                   # Fragen-Editor für Quiz
│   ├── stats.js                    # Statistiken und Auswertungen
│   ├── feedback.js                 # Feedback-System
│   ├── analytics.js                # Analytics Core
│   ├── analytics-events.js         # Event-Tracking
│   ├── analytics-ui.js             # Analytics Dashboard
│   ├── main.js                     # Logik für Landing Page
│   ├── timer.js                    # Timer-Logik
│   ├── stadt-land-fluss.js         # Stadt-Land-Fluss Logik
│   ├── zufallsgenerator.js         # Zufallsgenerator Logik
│   ├── notenrechner.js             # Notenrechner Logik
│   ├── aufgabenroulette.js         # Aufgabenroulette Logik
│   ├── animations.js               # Animation Controller
│   ├── responsive.js               # Responsive Controller
│   ├── accessibility.js            # Barrierefreiheit Features
│   ├── statistics.js               # Statistik-Tracking
│   ├── performance.js              # Performance-Monitor
│   ├── pwa-controller.js           # PWA-Management
│   ├── dashboard.js                # Dashboard-Logik
│   ├── export-share.js             # Export-Features
│   ├── haptic-feedback.js          # Haptisches Feedback
│   ├── toast.js                    # Toast Notifications
│   ├── loading-states.js           # Ladeindikatoren
│   ├── error-handler.js            # Globaler Error Handler
│   ├── enhancements-loader.js      # Modul-Loader für Erweiterungen
├── 📁 fragenkataloge/              # Fragen-Datenbanken für Quiz und Spiele
│   ├── questions_standard.js       # Standard-Fragen
│   ├── questions_it.js             # IT-Fragen
│   ├── questions_kaufmaennisch.js  # Kaufmännische Fragen
│   ├── questions_lagerlogistik.js  # Lagerlogistik-Fragen
│   ├── questions.js                # Custom-Loader
├── 📁 icons/                       # App Icons und Logos
│   ├── logo.svg                    # Vollständiges Logo
│   ├── logo-simple.svg             # Einfaches Logo
├── 📁 assets/                      # Medien und Assets
│   └── preview.mp4                 # Beta Preview-Video
├── 📁 pwa/                         # Progressive Web App Dateien
│   ├── manifest.json               # Web App Manifest
│   ├── sw.js                       # Service Worker
│   ├── version.json                # Versionstracking
├── 📁 tools/                       # Entwickler-Tools und Generatoren
│   └── generate_icons.html         # Icon-Generator Tool
```

---

## 👨‍💻 Über den Entwickler

<div align="center">

### Nico Kaschube
*Auszubildender Fachinformatiker für IT-Systemelektroniker*

![Developer](https://img.shields.io/badge/Developer-Nico%20Kaschube-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Ausbildung-green?style=for-the-badge)

</div>

#### 📋 Persönliche Informationen

- 🎓 **Ausbildung:** Fachinformatiker für IT-Systemelektroniker
- 🏢 **Ausbildungsstätte:** Berufsbildungswerk im Oberlinhaus, Potsdam
- 📅 **Ausbildungszeitraum:** 01.09.2025 - 31.08.2028 (3 Jahre, laufend)
- 📍 **Standort:** Potsdam, Deutschland

#### 💡 Motivation

Dieses Projekt entstand aus dem Wunsch, digitale Tools zu schaffen, die:
- 🎮 **Lernen motivierend machen** - Gamification statt trockene Theorie
- 👨‍🏫 **Lehrern helfen** - Moderne Werkzeuge für modernen Unterricht
- 💻 **Technik sinnvoll nutzen** - Zeigen, was mit Webtechnologien möglich ist
- 🌐 **Wissen teilen** - Open Source für alle zugänglich

#### 🛠️ Technische Kompetenzen

<table>
<tr>
<td width="50%">

**Frontend Development**
- HTML5 / CSS3
- JavaScript ES6+
- Responsive Design
- PWA Development
- Web Accessibility

</td>
<td width="50%">

**Tools & Workflow**
- Git / GitHub
- VS Code
- Chrome DevTools
- Live Server
- Performance Optimization

</td>
</tr>
</table>

#### 🎯 Projekt-Ziele

- ✅ Berufsschulen und Ausbildern praktische digitale Tools zur Verfügung stellen
- ✅ Unterrichtsalltag vereinfachen und digitalisieren
- ✅ Basierend auf Feedback neue Features und Tools entwickeln
- ✅ Meine Fähigkeiten während der Ausbildung unter Beweis stellen
- 🎓 Ausbildung erfolgreich abschließen (2025-2028)

---

### 📧 Kontakt & Feedback

<div align="center">

#### 🔗 Alle meine Links

[![Soziale Medien](https://img.shields.io/badge/Alle%20Links-guns.lol-ff69b4?style=for-the-badge&logo=linktree&logoColor=white)](https://guns.lol/imperatorkeksi)

**➡️ [guns.lol/imperatorkeksi](https://guns.lol/imperatorkeksi) ⬅️**

*Alle meine Social Media Profile & Kontaktmöglichkeiten an einem Ort!*

---

#### 💻 GitHub

[![GitHub](https://img.shields.io/badge/GitHub-ImperatorKeksi-181717?style=for-the-badge&logo=github)](https://github.com/ImperatorKeksi)
[![Repository](https://img.shields.io/badge/Repo-Keksi--webseite--spiel-blue?style=for-the-badge&logo=github)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)

---

#### 💬 Feedback erwünscht!

Hast du Fragen, Anregungen oder Verbesserungsvorschläge?

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/ImperatorKeksi/Keksi-webseite-spiel/issues)
- ✨ **Feature Requests:** [GitHub Issues](https://github.com/ImperatorKeksi/Keksi-webseite-spiel/issues)
- ⭐ **Feedback:** Wenn dir das Projekt gefällt, gib einen Stern auf GitHub!
- 📧 **Direktkontakt:** Über [guns.lol/imperatorkeksi](https://guns.lol/imperatorkeksi)

</div>

---

## 🙏 Danksagungen

- 🏢 **Berufsbildungswerk im Oberlinhaus, Potsdam** - Für die Ausbildung und Unterstützung
- 👨‍🏫 **Meine Ausbilder & Berufsschullehrer** - Für wertvolles Feedback und Förderung
- 👥 **Kollegen & Azubis** - Für Ideen, Testen und konstruktive Kritik
- 🌐 **Open Source Community** - Für Inspiration und Lernressourcen

---

<div align="center">

## ⭐ Danke fürs Lesen!

*Wenn dir dieses Projekt gefällt, gib ihm einen ⭐ auf GitHub!*

---

**Entwickelt mit ❤️ und viel ☕ für bessere digitale Bildung**

*Nico Kaschube - Auszubildender Fachinformatiker für IT-Systemelektroniker*  
*Berufsbildungswerk im Oberlinhaus, Potsdam | 2025*

---

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/ImperatorKeksi)
[![Built with Coffee](https://img.shields.io/badge/Built%20with-☕-brown?style=for-the-badge)](https://github.com/ImperatorKeksi)
[![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Open Beta](https://img.shields.io/badge/Status-Open%20Beta-orange?style=for-the-badge)](https://github.com/ImperatorKeksi/Keksi-webseite-spiel)

</div>
