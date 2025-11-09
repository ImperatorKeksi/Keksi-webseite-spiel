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
- � **Performance-optimiert** - Schnelle Ladezeiten, progressive Enhancement
- ♿ **Barrierefrei** - WCAG 2.1 AA konform
- 💬 **Open Beta** - Aktive Entwicklung mit Feedback-Integration

### 💡 Motivation

Als IT-Azubi möchte ich:
- 🎯 Berufsschulen und Lehrern praktische Tools zur Verfügung stellen
- ⚡ Den Unterrichtsalltag vereinfachen und digitalisieren
- 📈 Basierend auf Feedback die Plattform stetig erweitern
- 🎓 Meine Fähigkeiten während der Ausbildung unter Beweis stellen

---

## 💻 Technologien

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

- 📁 **Total Dateien:** 60+
- 💻 **Code-Zeilen:** ~25.000+
- 📜 **JavaScript:** ~16.000 Zeilen
- 🎨 **CSS:** ~9.000 Zeilen
- ❓ **Fragen:** 125+ über 25 Kategorien
- ⏱️ **Entwicklungszeit:** 10+ Wochen
- 🔄 **Commits:** 300+
- 🛠️ **Tools:** 6 (Quiz, Timer, Stadt-Land-Fluss, Zufallsgenerator, Notenrechner, Aufgabenroulette)
- ✨ **Features:** 10 Enhancement-Module

### 🌐 Browser-Kompatibilität

| Browser | Version | Status |
|---------|---------|--------|
| 🟢 Chrome | 90+ | ✅ Vollständig unterstützt |
| 🟠 Firefox | 88+ | ✅ Vollständig unterstützt |
| 🔵 Safari | 14+ | ✅ Vollständig unterstützt |
| 🟣 Edge | 90+ | ✅ Vollständig unterstützt |
| 📱 Mobile | iOS/Android | ✅ Optimiert |

### � Projektstruktur

```
📂 Keksi-webseite-spiel/
│
├── 📄 START.html                   ← Zentrale Startdatei
├── 📄 README.md                    ← Diese Dokumentation
│
├── 📁 seiten/                      ← HTML-Seiten
│   ├── index.html                  (Hauptmenü & Tool-Übersicht)
│   ├── game.html                   (Jeopardy Quiz)
│   ├── dashboard.html              (Lehrer-Dashboard)
│   └── timer.html                  (Digitale Uhr & Timer)
│
├── 📁 stylesheets/                 ← CSS-Styles
│   ├── main.css                    (Landing Page)
│   ├── styles.css                  (Spiel-Styles)
│   ├── animations.css              (Animation System)
│   ├── responsive.css              (Responsive Design)
│   ├── accessibility.css           (A11y Styles)
│   ├── theme.css                   (Theme Toggle)
│   ├── statistics.css              (Stats Widget)
│   ├── pwa-styles.css              (PWA UI)
│   ├── dashboard.css               (Dashboard)
│   └── export-share.css            (Export UI)
│
├── 📁 javascript/                  ← JavaScript-Dateien
│   ├── script.js                   (Hauptspiel-Logik)
│   ├── modules.js                  (Game State Management)
│   ├── sounds.js                   (Audio-Engine)
│   ├── auth.js                     (Authentifizierung)
│   ├── auth-ui.js                  (Login-UI)
│   ├── editor.js                   (Fragen-Editor)
│   ├── stats.js                    (Statistiken)
│   ├── feedback.js                 (Feedback-System)
│   ├── main.js                     (Landing Page Logik)
│   ├── timer.js                    (Timer-Logik)
│   ├── animations.js               (Animation Controller)
│   ├── responsive.js               (Responsive Controller)
│   ├── accessibility.js            (A11y Features)
│   ├── theme-controller.js         (Theme System)
│   ├── statistics.js               (Stats Tracking)
│   ├── performance.js              (Performance Monitor)
│   ├── pwa-controller.js           (PWA Management)
│   ├── dashboard.js                (Dashboard Logic)
│   ├── export-share.js             (Export Features)
│   ├── haptic-feedback.js          (Haptics)
│   └── enhancements-loader.js      (Module Loader)
│
├── 📁 fragenkataloge/              ← Fragen-Datenbanken
│   ├── questions_it.js             (IT-Modus)
│   ├── questions_lagerlogistik.js  (Lagerlogistik)
│   ├── questions_kaufmaennisch.js  (Kaufmännisch)
│   └── questions_standard.js       (Standard)
│
├── 📁 icons/                       ← PWA-Icons
│   └── icon-*.png                  (8 Größen: 72px-512px)
│
├── 📁 pwa/                         ← Progressive Web App
│   ├── manifest.json               (App-Manifest)
│   ├── sw.js                       (Service Worker v2.1.0)
│   └── version.json                (Version Tracking)
│
└── 📁 tools/                       ← Entwickler-Tools
    └── generate_icons.html         (Icon-Generator)
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
