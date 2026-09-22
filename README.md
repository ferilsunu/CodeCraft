# CodeCraft — Modern Cloud Web IDE & Playground

<div align="center">

![CodeCraft Banner](https://socialify.git.ci/ferilsunu/CodeCraft/image?description=1&font=Inter&language=1&name=1&pattern=Solid&theme=Dark)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-f59e0b?style=for-the-badge&logo=github)](https://ferilsunu.github.io/CodeCraft/)
[![Version](https://img.shields.io/badge/Version-2.0.0-38bdf8?style=for-the-badge)](https://github.com/ferilsunu/CodeCraft)
[![License: MIT](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](LICENSE)

<p align="center">
  <b>An ultra-fast, modular in-browser web playground and IDE for HTML5, CSS3, and modern JavaScript.</b><br>
  Equipped with live preview, in-app virtual console, Prettier formatter, responsive device frames, starter templates, CDN package injector, compressed URL sharing, and 1-click ZIP export.
</p>

[**Explore Live Demo**](https://ferilsunu.github.io/CodeCraft/) | [**Report Bug**](https://github.com/ferilsunu/CodeCraft/issues) | [**Request Feature**](https://github.com/ferilsunu/CodeCraft/issues)

</div>

---

## Architecture & File Structure

```text
CodeCraft/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD to GitHub Pages
├── public/
│   └── favicon.svg             # Vector brand icon
├── src/
│   ├── config/
│   │   ├── cdns.js             # CDN packages catalog and scripts registry
│   │   └── templates.js        # Starter blueprints (Tailwind, React, Three.js, Canvas)
│   ├── core/
│   │   ├── editor.js           # Ace Editor controller, themes and line stats
│   │   ├── layout.js           # Split.js multi-column / multi-row / tab engine
│   │   ├── project.js          # Project manager, template loader and auto-save
│   │   ├── runner.js           # Live preview compiler and sandbox isolator
│   │   └── state.js            # Central reactive store and event bus
│   ├── modules/
│   │   ├── console.js          # In-app virtual DevTools console and REPL
│   │   ├── exporter.js         # ZIP archive builder and standalone HTML bundler
│   │   ├── formatter.js        # Prettier in-browser code beautifier
│   │   ├── share.js            # LZ-String URL hash compressor and confetti
│   │   └── storage.js          # LocalStorage persistence and preferences
│   ├── styles/
│   │   ├── base.css            # CSS reset and core utilities
│   │   ├── console.css         # Virtual console and REPL theme
│   │   ├── editor.css          # Ace editor panels and tab controls
│   │   ├── layout.css          # Split.js gutters and responsive layout
│   │   ├── main.css            # Master stylesheet index
│   │   ├── modals.css          # Modals, drawer and library injector grid
│   │   ├── navbar.css          # Top navigation and control deck
│   │   ├── preview.css         # Device simulation frame and toolbar
│   │   ├── toast.css           # Animated toast notifications
│   │   └── variables.css       # Design tokens and color palette
│   ├── ui/
│   │   ├── drawer.js           # Saved projects drawer manager
│   │   ├── modals.js           # Templates and CDN settings dialogs
│   │   ├── shortcuts.js        # Keyboard shortcut listeners
│   │   └── toast.js            # Global toast dispatcher
│   └── main.js                 # Application bootstrap entry point
├── index.html                  # Semantic HTML5 shell loading ES Modules
├── package.json                # Modern build scripts and dependencies
├── vite.config.js              # High-performance Vite build config
├── .gitignore                  # Git ignore rules
└── README.md                   # Comprehensive documentation
```

---

## Features

### 1. Flexible Split-Pane Workspace
- **Multi-Layout Modes**: Seamlessly toggle between **Single-Tab View** (default), **Side-by-Side (Columns)**, or **Top-Bottom (Rows)**.
- **Smooth Dragging**: Powered by [Split.js](https://split.js.org/) for resizable panels.
- **Ace Editor Integration**: Syntax highlighting, auto-closing brackets, line numbering, customizable font size, and multiple themes (*Twilight, Dracula, Monokai, One Dark, Nord, Chrome, GitHub*).

### 2. Instant Live Sandbox & Auto-Reload
- Real-time debounced auto-reload as you type (toggleable on/off).
- Immediate force execution shortcut (`Ctrl + Enter`).
- Safe sandbox iframe isolation for running experimental code securely.

### 3. In-App Virtual DevTools Console & REPL
- **No need to open browser DevTools**: Logs (`console.log`, `console.info`), warnings (`console.warn`), and runtime errors (`window.onerror`) stream directly into the built-in virtual console.
- **Interactive REPL**: Execute JavaScript commands directly against the live sandbox environment.
- **Category Filters**: Filter between *All*, *Logs*, *Warnings*, and *Errors* with real-time error badge counters.

### 4. In-Browser Prettier Code Formatting
- 1-Click code beautifier powered by [Prettier](https://prettier.io/) standalone (`Ctrl + Shift + F`).
- Automatically formats HTML (`parser-html`), CSS (`parser-postcss`), and JavaScript (`parser-babel`).

### 5. Responsive Device Simulator
- Switch between **100% Desktop**, **768px Tablet**, and **375px Mobile** viewport presets to test responsive designs instantly.
- One-click **Fullscreen Mode** for distraction-free presentations.

### 6. 1-Click CDN Package Injector
- Pre-configured quick toggles for popular libraries:
  - **Tailwind CSS 3.x**
  - **React 18 & Babel JSX Transpiler**
  - **Three.js (WebGL 3D)**
  - **Bootstrap 5.3**
  - **GSAP (GreenSock Animation Platform)**
  - **Chart.js 4.x**
  - **FontAwesome 6**
  - **Animate.css**
  - **jQuery 3.7**
- **Custom CDN Support**: Add any external CSS or JS URL from jsDelivr, cdnjs, or unpkg.

### 7. Interactive Starter Templates Gallery
Jumpstart experiments with pre-built blueprints:
1. **Neon Glassmorphic Card** *(Tailwind CSS + FontAwesome)*
2. **React 18 Interactive Counter** *(React Hooks + Tailwind + Babel)*
3. **Rotating 3D Neon Cube** *(Three.js WebGL)*
4. **Interactive Particle Physics** *(Vanilla HTML5 Canvas 2D)*
5. **Clean Minimal Starter** *(Zero-dependency boilerplate)*

### 8. LocalStorage Snippet Manager & URL Hash Sharing
- **Auto-Save**: Changes auto-save silently to your browser.
- **Project Drawer**: Name, save, manage, switch, and delete multiple code snippets.
- **LZ-String Compressed Sharing**: Share full projects with a single compressed URL hash (`#code=...`) without needing a backend server.
- **Celebration Confetti**: Visual feedback upon link sharing and exporting.

### 9. One-Click Project Export
- **Download ZIP Archive**: Bundles clean `index.html`, `style.css`, and `script.js` with linked CDNs via [JSZip](https://stuk.github.io/jszip/) and [FileSaver.js](https://github.com/eligrey/FileSaver.js/).
- **Standalone HTML Export**: Generates a self-contained, single `.html` file ready for sharing or immediate offline hosting.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> (or <kbd>Cmd</kbd> + <kbd>Enter</kbd>) | **Run Code** (Force reload preview) |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | **Format Code** with Prettier |
| <kbd>Ctrl</kbd> + <kbd>`</kbd> | **Toggle Virtual Console** |
| <kbd>Esc</kbd> | **Close Modals & Drawers** |

---

## Tech Stack & Dependencies

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Core Architecture**: Native ES Modules (ESM), Modern CSS Custom Properties & Flexbox/Grid
- **Code Editor**: [Ace Editor](https://ace.c9.io/) (`ace.js`) with Language Tools & Autocompletion
- **Split Panes**: [Split.js](https://split.js.org/)
- **Formatting**: [Prettier Standalone](https://prettier.io/)
- **Archiving**: [JSZip](https://stuk.github.io/jszip/) & [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- **Compression**: [LZ-String](https://github.com/pieroxy/lz-string)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Visuals**: [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## Development & Build Workflow

### 1. Clone & Install
```bash
git clone https://github.com/ferilsunu/CodeCraft.git
cd CodeCraft
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Launches Vite dev server with instant Hot Module Replacement (HMR) at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, minified bundle inside the `dist/` directory ready for deployment.

### 4. Preview Production Build
```bash
npm run preview
```

---

## Contributing

Contributions, issues, and feature requests are welcome.
Feel free to check the [issues page](https://github.com/ferilsunu/CodeCraft/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Built by <a href="https://github.com/ferilsunu">Feril Sunu</a></sub>
</div>
