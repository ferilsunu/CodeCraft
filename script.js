/**
 * CodeCraft — Modern Cloud Web IDE & Playground Engine
 * Author: ferilsunu
 * License: MIT
 */

(function () {
  'use strict';

  // State Management
  const STATE = {
    projectId: 'default_craft',
    title: 'Untitled Craft',
    autoRun: true,
    layout: 'columns', // 'columns' | 'rows' | 'tabs'
    activeTab: 'html',
    deviceWidth: '100%',
    theme: 'twilight',
    fontSize: 14,
    wordWrap: true,
    autocomplete: true,
    lineNumbers: true,
    cdns: {
      tailwind: false,
      react: false,
      bootstrap: false,
      threejs: false,
      gsap: false,
      chartjs: false,
      fontawesome: false,
      animatecss: false,
      jquery: false,
      custom: []
    },
    consoleLogs: [],
    consoleFilter: 'all',
    errorCount: 0
  };

  const CDN_DEFS = {
    tailwind: { type: 'js', url: 'https://cdn.tailwindcss.com' },
    react: [
      { type: 'js', url: 'https://unpkg.com/react@18/umd/react.development.js' },
      { type: 'js', url: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js' },
      { type: 'js', url: 'https://unpkg.com/@babel/standalone/babel.min.js' }
    ],
    bootstrap: [
      { type: 'css', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
      { type: 'js', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' }
    ],
    threejs: { type: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' },
    gsap: { type: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
    chartjs: { type: 'js', url: 'https://cdn.jsdelivr.net/npm/chart.js' },
    fontawesome: { type: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
    animatecss: { type: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
    jquery: { type: 'js', url: 'https://code.jquery.com/jquery-3.7.1.min.js' }
  };

  // Starter Templates
  const TEMPLATES = {
    'tailwind-card': {
      title: 'Neon Glassmorphic Card',
      cdns: { tailwind: true, fontawesome: true },
      html: `<div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
  <div class="relative group">
    <!-- Neon Glow Background -->
    <div class="absolute -inset-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
    
    <!-- Frosted Card -->
    <div class="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">Pro Feature</span>
        <i class="fa-solid fa-bolt text-amber-400"></i>
      </div>
      
      <h3 class="text-2xl font-bold tracking-tight text-white">CodeCraft Studio</h3>
      <p class="text-slate-400 text-sm leading-relaxed">
        Ultra-fast in-browser IDE with live preview, virtual console, Prettier formatter, and zero configuration.
      </p>

      <div class="pt-2 flex items-center justify-between">
        <button id="btn-glow" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition duration-200 shadow-lg shadow-amber-500/25 active:scale-95">
          Get Started
        </button>
        <span class="text-xs text-slate-500 font-mono">v2.0 Ready</span>
      </div>
    </div>
  </div>
</div>`,
      css: `/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.group {
  animation: float 4s ease-in-out infinite;
}`,
      js: `// Button click handler
document.getElementById('btn-glow').addEventListener('click', () => {
  console.log('✨ Neon button clicked! Launching CodeCraft experiment...');
  alert('Welcome to CodeCraft 2.0!');
});`
    },

    'react-counter': {
      title: 'React 18 Interactive Counter',
      cdns: { react: true, tailwind: true },
      html: `<div id="root"></div>`,
      css: `body {
  margin: 0;
  background-color: #0b0f17;
  font-family: system-ui, -apple-system, sans-serif;
}`,
      js: `// React 18 Counter Demo
const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full backdrop-blur-md">
        <div className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">React 18 Hooks</div>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 my-4 font-mono">
          {count}
        </h1>
        <p className="text-slate-400 text-sm mb-6">State preserved in real-time</p>
        
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => { setCount(c => c - 1); console.log('Decremented:', count - 1); }}
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-lg active:scale-95 transition"
          >
            -
          </button>
          <button 
            onClick={() => { setCount(0); console.log('Reset counter'); }}
            className="px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition"
          >
            Reset
          </button>
          <button 
            onClick={() => { setCount(c => c + 1); console.log('Incremented:', count + 1); }}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-lg active:scale-95 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`
    },

    'threejs-cube': {
      title: 'Rotating 3D Neon Cube',
      cdns: { threejs: true },
      html: `<div id="canvas-container"></div>
<div class="overlay">
  <h2>Three.js WebGL Engine</h2>
  <p>Move mouse to adjust orbit perspective</p>
</div>`,
      css: `body {
  margin: 0;
  overflow: hidden;
  background-color: #030712;
  font-family: sans-serif;
}
#canvas-container {
  width: 100vw;
  height: 100vh;
}
.overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  pointer-events: none;
}
.overlay h2 { margin: 0; font-size: 18px; color: #a855f7; }
.overlay p { margin: 4px 0 0; font-size: 12px; color: #9ca3af; }`,
      js: `// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Glowing Wireframe Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x9333ea,
  wireframe: true,
  emissive: 0x6b21a8,
  emissiveIntensity: 0.8
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights
const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

camera.position.z = 4;

console.log('🚀 Three.js WebGL Scene initialized successfully!');

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});`
    },

    'canvas-particles': {
      title: 'Interactive Particle Physics',
      cdns: {},
      html: `<canvas id="canvas"></canvas>
<div class="instructions">Move mouse over the canvas to attract particles</div>`,
      css: `body {
  margin: 0;
  overflow: hidden;
  background: #090d16;
  font-family: sans-serif;
}
canvas {
  display: block;
}
.instructions {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #f59e0b;
  font-size: 13px;
  background: rgba(0,0,0,0.6);
  padding: 6px 14px;
  border-radius: 20px;
  pointer-events: none;
}`,
      js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const mouse = { x: null, y: null, radius: 120 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.5 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.color = '#fbbf24';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;

    // Mouse attraction
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        this.x += dx * 0.03;
        this.y += dy * 0.03;
      }
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 80 }, () => new Particle());

function animate() {
  ctx.fillStyle = 'rgba(9, 13, 22, 0.2)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = \`rgba(251, 191, 36, \${1 - dist / 100})\`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});`
    },

    'blank': {
      title: 'Minimal Starter',
      cdns: {},
      html: `<div class="container">
  <h1>Hello from CodeCraft! 🚀</h1>
  <p>Start writing HTML, CSS, and JavaScript with instant live preview.</p>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  text-align: center;
}

.container {
  padding: 2rem;
  background: #1e293b;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

h1 {
  margin-top: 0;
  color: #f59e0b;
}`,
      js: `console.log('Craft loaded smoothly!');`
    }
  };

  // Ace Editors references
  let htmlEditor, cssEditor, jsEditor;
  let splitMain = null;
  let splitEditors = null;
  let autoRunTimer = null;

  // DOM Elements
  const DOM = {
    projectTitle: document.getElementById('project-title'),
    saveStatus: document.getElementById('save-status'),
    btnRun: document.getElementById('btn-run'),
    toggleAutoRun: document.getElementById('toggle-autorun'),
    btnFormat: document.getElementById('btn-format'),
    btnTemplates: document.getElementById('btn-templates'),
    btnLibraries: document.getElementById('btn-libraries'),
    libraryBadge: document.getElementById('library-count-badge'),
    btnShare: document.getElementById('btn-share'),
    btnExportDropdown: document.getElementById('btn-export-dropdown'),
    exportMenu: document.getElementById('export-menu'),
    btnExportZip: document.getElementById('btn-export-zip'),
    btnExportHtml: document.getElementById('btn-export-html'),
    btnProjects: document.getElementById('btn-projects'),
    btnSettings: document.getElementById('btn-settings'),

    // Layout
    workspaceContainer: document.getElementById('workspace-container'),
    editorsPane: document.getElementById('editors-pane'),
    previewPane: document.getElementById('preview-pane'),
    editorsWrapper: document.getElementById('editors-wrapper'),
    editorTabsBar: document.getElementById('editor-tabs-bar'),
    panelHtml: document.getElementById('panel-html'),
    panelCss: document.getElementById('panel-css'),
    panelJs: document.getElementById('panel-js'),
    btnLayoutColumns: document.getElementById('btn-layout-columns'),
    btnLayoutRows: document.getElementById('btn-layout-rows'),
    btnLayoutTabs: document.getElementById('btn-layout-tabs'),

    // Stats & Copy/Clear
    htmlStats: document.getElementById('html-stats'),
    cssStats: document.getElementById('css-stats'),
    jsStats: document.getElementById('js-stats'),
    btnCopyHtml: document.getElementById('btn-copy-html'),
    btnClearHtml: document.getElementById('btn-clear-html'),
    btnCopyCss: document.getElementById('btn-copy-css'),
    btnClearCss: document.getElementById('btn-clear-css'),
    btnCopyJs: document.getElementById('btn-copy-js'),
    btnClearJs: document.getElementById('btn-clear-js'),

    // Preview
    deviceFrameContainer: document.getElementById('device-frame-container'),
    outputIframe: document.getElementById('output-iframe'),
    btnRefreshPreview: document.getElementById('btn-refresh-preview'),
    btnToggleConsole: document.getElementById('btn-toggle-console'),
    consoleBadge: document.getElementById('console-badge'),
    btnFullscreenPreview: document.getElementById('btn-fullscreen-preview'),

    // Console
    virtualConsolePanel: document.getElementById('virtual-console-panel'),
    consoleLogsList: document.getElementById('console-logs-list'),
    btnClearConsole: document.getElementById('btn-clear-console'),
    btnCloseConsole: document.getElementById('btn-close-console'),
    consoleReplForm: document.getElementById('console-repl-form'),
    consoleReplInput: document.getElementById('console-repl-input'),

    // Modals
    modalTemplates: document.getElementById('modal-templates'),
    modalLibraries: document.getElementById('modal-libraries'),
    drawerProjects: document.getElementById('drawer-projects'),
    modalSettings: document.getElementById('modal-settings'),
    toastContainer: document.getElementById('toast-container'),

    // CDNs & Projects
    customCdnInput: document.getElementById('custom-cdn-input'),
    btnAddCustomCdn: document.getElementById('btn-add-custom-cdn'),
    customCdnsList: document.getElementById('custom-cdns-list'),
    projectsList: document.getElementById('projects-list'),
    btnSaveNewProject: document.getElementById('btn-save-new-project'),

    // Settings inputs
    settingTheme: document.getElementById('setting-theme'),
    settingFontSize: document.getElementById('setting-font-size'),
    fontSizeLabel: document.getElementById('font-size-label'),
    settingWordWrap: document.getElementById('setting-word-wrap'),
    settingAutocomplete: document.getElementById('setting-autocomplete'),
    settingLineNumbers: document.getElementById('setting-line-numbers')
  };

  // Initialize Application
  function init() {
    loadSettings();
    initAceEditors();
    initSplitPanes();
    bindEvents();
    bindConsoleReceiver();
    
    // Check if loading from URL Hash or LocalStorage
    if (window.location.hash && window.location.hash.startsWith('#code=')) {
      loadFromHash();
    } else {
      loadActiveProject();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // Ace Editors Setup
  // --------------------------------------------------------------------------
  function initAceEditors() {
    ace.require("ace/ext/language_tools");

    // HTML Editor
    htmlEditor = ace.edit("html-editor");
    configureAce(htmlEditor, "ace/mode/html");

    // CSS Editor
    cssEditor = ace.edit("css-editor");
    configureAce(cssEditor, "ace/mode/css");

    // JS Editor
    jsEditor = ace.edit("js-editor");
    configureAce(jsEditor, "ace/mode/javascript");

    // Listeners for line count stats and auto-run
    [htmlEditor, cssEditor, jsEditor].forEach((editor, idx) => {
      editor.getSession().on('change', () => {
        updateStats();
        triggerAutoSaveDebounce();
        if (STATE.autoRun) {
          triggerAutoRunDebounce();
        }
      });
    });
  }

  function configureAce(editor, mode) {
    editor.setTheme("ace/theme/" + STATE.theme);
    editor.getSession().setMode(mode);
    editor.setFontSize(STATE.fontSize + "px");
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(STATE.lineNumbers);
    editor.getSession().setUseWrapMode(STATE.wordWrap);
    editor.setOptions({
      enableBasicAutocompletion: STATE.autocomplete,
      enableLiveAutocompletion: STATE.autocomplete,
      enableSnippets: true,
      tabSize: 2,
      useSoftTabs: true,
      scrollPastEnd: 0.1
    });
  }

  function updateStats() {
    if (DOM.htmlStats) DOM.htmlStats.textContent = `${htmlEditor.session.getLength()} lines`;
    if (DOM.cssStats) DOM.cssStats.textContent = `${cssEditor.session.getLength()} lines`;
    if (DOM.jsStats) DOM.jsStats.textContent = `${jsEditor.session.getLength()} lines`;
  }

  // --------------------------------------------------------------------------
  // Split.js Panes
  // --------------------------------------------------------------------------
  function initSplitPanes() {
    destroySplits();

    if (STATE.layout === 'columns') {
      DOM.workspaceContainer.className = '';
      DOM.editorTabsBar.classList.add('hidden');
      [DOM.panelHtml, DOM.panelCss, DOM.panelJs].forEach(p => {
        p.style.display = 'flex';
        p.style.width = '';
        p.style.height = '';
      });

      splitMain = Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [250, 250],
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeAceInstances
      });

      splitEditors = Split(['#panel-html', '#panel-css', '#panel-js'], {
        sizes: [33.33, 33.33, 33.33],
        minSize: 80,
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeAceInstances
      });
    } else if (STATE.layout === 'rows') {
      DOM.workspaceContainer.className = 'layout-rows';
      DOM.editorTabsBar.classList.add('hidden');
      [DOM.panelHtml, DOM.panelCss, DOM.panelJs].forEach(p => {
        p.style.display = 'flex';
        p.style.width = '';
        p.style.height = '';
      });

      splitMain = Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [180, 180],
        gutterSize: 6,
        direction: 'vertical',
        onDragEnd: resizeAceInstances
      });

      splitEditors = Split(['#panel-html', '#panel-css', '#panel-js'], {
        sizes: [33.33, 33.33, 33.33],
        minSize: 80,
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeAceInstances
      });
    } else if (STATE.layout === 'tabs') {
      DOM.workspaceContainer.className = '';
      DOM.editorTabsBar.classList.remove('hidden');

      splitMain = Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [250, 250],
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeAceInstances
      });

      switchTab(STATE.activeTab);
    }

    resizeAceInstances();
  }

  function destroySplits() {
    if (splitMain) {
      splitMain.destroy();
      splitMain = null;
    }
    if (splitEditors) {
      splitEditors.destroy();
      splitEditors = null;
    }
  }

  function switchTab(tabKey) {
    STATE.activeTab = tabKey;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-editor') === tabKey);
    });

    DOM.panelHtml.style.display = tabKey === 'html' ? 'flex' : 'none';
    DOM.panelCss.style.display = tabKey === 'css' ? 'flex' : 'none';
    DOM.panelJs.style.display = tabKey === 'js' ? 'flex' : 'none';

    DOM.panelHtml.style.width = tabKey === 'html' ? '100%' : '0%';
    DOM.panelCss.style.width = tabKey === 'css' ? '100%' : '0%';
    DOM.panelJs.style.width = tabKey === 'js' ? '100%' : '0%';

    resizeAceInstances();
  }

  function resizeAceInstances() {
    setTimeout(() => {
      if (htmlEditor) htmlEditor.resize();
      if (cssEditor) cssEditor.resize();
      if (jsEditor) jsEditor.resize();
    }, 50);
  }

  // --------------------------------------------------------------------------
  // Live Preview Engine & Virtual Console Interceptor
  // --------------------------------------------------------------------------
  function buildPreviewHTML() {
    const htmlCode = htmlEditor ? htmlEditor.getValue() : '';
    const cssCode = cssEditor ? cssEditor.getValue() : '';
    const jsCode = jsEditor ? jsEditor.getValue() : '';

    // Build CDN tags
    let cdnTags = '';
    Object.keys(STATE.cdns).forEach(key => {
      if (key === 'custom') {
        STATE.cdns.custom.forEach(url => {
          if (url.endsWith('.css') || url.includes('/css')) {
            cdnTags += `<link rel="stylesheet" href="${url}">\n`;
          } else {
            cdnTags += `<script src="${url}"><\/script>\n`;
          }
        });
      } else if (STATE.cdns[key]) {
        const def = CDN_DEFS[key];
        if (Array.isArray(def)) {
          def.forEach(d => {
            if (d.type === 'css') cdnTags += `<link rel="stylesheet" href="${d.url}">\n`;
            if (d.type === 'js') cdnTags += `<script src="${d.url}"><\/script>\n`;
          });
        } else if (def) {
          if (def.type === 'css') cdnTags += `<link rel="stylesheet" href="${def.url}">\n`;
          if (def.type === 'js') cdnTags += `<script src="${def.url}"><\/script>\n`;
        }
      }
    });

    // Virtual Console Interception Script
    const consoleInterceptor = `
<script>
(function() {
  function serialize(obj) {
    try {
      if (obj === null) return 'null';
      if (obj === undefined) return 'undefined';
      if (typeof obj === 'function') return obj.toString();
      if (typeof obj === 'object') return JSON.stringify(obj, null, 2);
      return String(obj);
    } catch (e) {
      return Object.prototype.toString.call(obj);
    }
  }

  function sendLog(type, args) {
    var serialized = Array.from(args).map(serialize).join(' ');
    window.parent.postMessage({
      source: 'codecraft_preview_console',
      type: type,
      content: serialized,
      timestamp: new Date().toLocaleTimeString()
    }, '*');
  }

  var originalLog = console.log;
  var originalWarn = console.warn;
  var originalError = console.error;
  var originalInfo = console.info;

  console.log = function() { sendLog('log', arguments); originalLog.apply(console, arguments); };
  console.warn = function() { sendLog('warn', arguments); originalWarn.apply(console, arguments); };
  console.error = function() { sendLog('error', arguments); originalError.apply(console, arguments); };
  console.info = function() { sendLog('info', arguments); originalInfo.apply(console, arguments); };

  window.onerror = function(message, source, lineno, colno, error) {
    var errText = message + (lineno ? ' (line ' + lineno + ')' : '');
    sendLog('error', [errText]);
    return false;
  };

  // REPL receiver
  window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'eval_repl') {
      try {
        var result = eval(event.data.code);
        sendLog('log', ['➜ ' + serialize(result)]);
      } catch (err) {
        sendLog('error', ['➜ ' + err.message]);
      }
    }
  });
})();
<\/script>`;

    // If React is active with Babel, wrap script in type="text/babel"
    const scriptType = (STATE.cdns.react) ? 'text/babel' : 'text/javascript';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${cdnTags}
  <style>
    ${cssCode}
  </style>
  ${consoleInterceptor}
</head>
<body>
  ${htmlCode}
  <script type="${scriptType}">
    ${jsCode}
  <\/script>
</body>
</html>`;
  }

  function runCode() {
    clearConsole();
    const previewContent = buildPreviewHTML();
    const iframe = DOM.outputIframe;
    
    // Inject via srcdoc or document.write
    if ('srcdoc' in iframe) {
      iframe.srcdoc = previewContent;
    } else {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(previewContent);
      doc.close();
    }
  }

  function triggerAutoRunDebounce() {
    clearTimeout(autoRunTimer);
    autoRunTimer = setTimeout(runCode, 500);
  }

  // --------------------------------------------------------------------------
  // Virtual Console Messages
  // --------------------------------------------------------------------------
  function bindConsoleReceiver() {
    window.addEventListener('message', (event) => {
      if (event.data && event.data.source === 'codecraft_preview_console') {
        const { type, content, timestamp } = event.data;
        addConsoleEntry(type, content, timestamp);
      }
    });
  }

  function addConsoleEntry(type, content, timestamp) {
    STATE.consoleLogs.push({ type, content, timestamp });
    
    if (type === 'error') {
      STATE.errorCount++;
      updateConsoleBadge();
    }

    renderConsoleLogs();
  }

  function renderConsoleLogs() {
    const list = DOM.consoleLogsList;
    if (!list) return;

    const filtered = STATE.consoleLogs.filter(item => {
      if (STATE.consoleFilter === 'all') return true;
      return item.type === STATE.consoleFilter;
    });

    if (filtered.length === 0) {
      list.innerHTML = `<div class="console-empty-msg">Console is clear. Output from console.log() and runtime errors will appear here.</div>`;
      return;
    }

    list.innerHTML = filtered.map(item => {
      let icon = 'chevron-right';
      if (item.type === 'warn') icon = 'alert-triangle';
      if (item.type === 'error') icon = 'x-circle';
      if (item.type === 'info') icon = 'info';

      return `
        <div class="console-entry ${item.type}">
          <span class="console-entry-time">${item.timestamp}</span>
          <i data-lucide="${icon}" class="console-entry-icon"></i>
          <span class="console-entry-content">${escapeHTML(item.content)}</span>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
    list.scrollTop = list.scrollHeight;
  }

  function clearConsole() {
    STATE.consoleLogs = [];
    STATE.errorCount = 0;
    updateConsoleBadge();
    renderConsoleLogs();
  }

  function updateConsoleBadge() {
    if (STATE.errorCount > 0) {
      DOM.consoleBadge.textContent = STATE.errorCount;
      DOM.consoleBadge.classList.remove('hidden');
    } else {
      DOM.consoleBadge.classList.add('hidden');
    }
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // --------------------------------------------------------------------------
  // Prettier Code Formatter
  // --------------------------------------------------------------------------
  function formatAllCode() {
    try {
      if (window.prettier && window.prettierPlugins) {
        const htmlVal = htmlEditor.getValue();
        const cssVal = cssEditor.getValue();
        const jsVal = jsEditor.getValue();

        const formattedHtml = window.prettier.format(htmlVal, {
          parser: "html",
          plugins: window.prettierPlugins,
          tabWidth: 2
        });

        const formattedCss = window.prettier.format(cssVal, {
          parser: "css",
          plugins: window.prettierPlugins,
          tabWidth: 2
        });

        const formattedJs = window.prettier.format(jsVal, {
          parser: "babel",
          plugins: window.prettierPlugins,
          tabWidth: 2,
          semi: true
        });

        htmlEditor.setValue(formattedHtml, -1);
        cssEditor.setValue(formattedCss, -1);
        jsEditor.setValue(formattedJs, -1);

        showToast('Code successfully formatted with Prettier!', 'success');
      } else {
        showToast('Prettier formatter is loading...', 'info');
      }
    } catch (err) {
      showToast('Prettier format notice: ' + err.message, 'error');
    }
  }

  // --------------------------------------------------------------------------
  // Project Management & LocalStorage
  // --------------------------------------------------------------------------
  let saveDebounceTimer = null;
  function triggerAutoSaveDebounce() {
    if (DOM.saveStatus) {
      DOM.saveStatus.className = 'save-status unsaved';
      DOM.saveStatus.querySelector('.status-text').textContent = 'Editing...';
    }
    clearTimeout(saveDebounceTimer);
    saveDebounceTimer = setTimeout(() => {
      saveActiveProject();
    }, 1000);
  }

  function saveActiveProject() {
    const projectData = {
      id: STATE.projectId,
      title: DOM.projectTitle.value.trim() || 'Untitled Craft',
      html: htmlEditor.getValue(),
      css: cssEditor.getValue(),
      js: jsEditor.getValue(),
      cdns: STATE.cdns,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('codecraft_active_project', JSON.stringify(projectData));

    // Also update in all projects list
    const allProjects = getAllSavedProjects();
    const existingIdx = allProjects.findIndex(p => p.id === STATE.projectId);
    if (existingIdx >= 0) {
      allProjects[existingIdx] = projectData;
    } else {
      allProjects.unshift(projectData);
    }
    localStorage.setItem('codecraft_all_projects', JSON.stringify(allProjects));

    if (DOM.saveStatus) {
      DOM.saveStatus.className = 'save-status saved';
      DOM.saveStatus.querySelector('.status-text').textContent = 'Saved';
    }
  }

  function loadActiveProject() {
    const raw = localStorage.getItem('codecraft_active_project');
    if (raw) {
      try {
        const data = JSON.parse(raw);
        applyProjectData(data);
        return;
      } catch (e) {
        console.error('Failed to parse active project', e);
      }
    }
    // Load default template
    applyTemplate('blank');
  }

  function getAllSavedProjects() {
    try {
      const raw = localStorage.getItem('codecraft_all_projects');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function applyProjectData(data) {
    STATE.projectId = data.id || ('craft_' + Date.now());
    STATE.title = data.title || 'Untitled Craft';
    DOM.projectTitle.value = STATE.title;

    if (data.cdns) {
      STATE.cdns = Object.assign({ custom: [] }, data.cdns);
      syncCdnCheckboxes();
    }

    if (htmlEditor) htmlEditor.setValue(data.html || '', -1);
    if (cssEditor) cssEditor.setValue(data.css || '', -1);
    if (jsEditor) jsEditor.setValue(data.js || '', -1);

    updateStats();
    updateCdnBadge();
    runCode();
  }

  function renderSavedProjectsList() {
    const projects = getAllSavedProjects();
    const container = DOM.projectsList;
    if (!container) return;

    if (projects.length === 0) {
      container.innerHTML = `<div class="console-empty-msg">No saved projects yet. Click above to save one!</div>`;
      return;
    }

    container.innerHTML = projects.map(p => `
      <div class="project-card" data-id="${p.id}">
        <div class="project-card-info">
          <span class="project-card-title">${escapeHTML(p.title)}</span>
          <span class="project-card-date">${new Date(p.updatedAt).toLocaleDateString()} ${new Date(p.updatedAt).toLocaleTimeString()}</span>
        </div>
        <div class="project-card-actions">
          <button class="btn-mini btn-load-proj" data-id="${p.id}" title="Open Snippet">
            <i data-lucide="folder-open"></i>
          </button>
          <button class="btn-mini btn-delete-proj text-rose" data-id="${p.id}" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Bind item click
    container.querySelectorAll('.btn-load-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj) {
          applyProjectData(proj);
          closeAllModals();
          showToast(`Opened "${proj.title}"`, 'success');
        }
      });
    });

    container.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        if (confirm('Delete this saved project?')) {
          const updated = projects.filter(p => p.id !== id);
          localStorage.setItem('codecraft_all_projects', JSON.stringify(updated));
          renderSavedProjectsList();
          showToast('Project deleted', 'info');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // URL Hash Sharing & Confetti
  // --------------------------------------------------------------------------
  function shareURL() {
    try {
      const payload = {
        title: DOM.projectTitle.value.trim(),
        html: htmlEditor.getValue(),
        css: cssEditor.getValue(),
        js: jsEditor.getValue(),
        cdns: STATE.cdns
      };

      if (window.LZString) {
        const compressed = window.LZString.compressToEncodedURIComponent(JSON.stringify(payload));
        const shareableUrl = `${window.location.origin}${window.location.pathname}#code=${compressed}`;
        
        navigator.clipboard.writeText(shareableUrl).then(() => {
          showToast('🔗 Share link copied to clipboard!', 'success');
          triggerConfetti();
        }).catch(() => {
          prompt('Copy your share URL:', shareableUrl);
        });
      }
    } catch (e) {
      showToast('Failed to generate share URL', 'error');
    }
  }

  function loadFromHash() {
    try {
      const hash = window.location.hash.substring(6); // remove '#code='
      if (window.LZString && hash) {
        const decompressed = window.LZString.decompressFromEncodedURIComponent(hash);
        if (decompressed) {
          const data = JSON.parse(decompressed);
          applyProjectData(data);
          showToast(`Loaded shared craft: ${data.title}`, 'success');
          return;
        }
      }
    } catch (e) {
      console.error('Error loading hash payload', e);
    }
    loadActiveProject();
  }

  function triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 }
      });
    }
  }

  // --------------------------------------------------------------------------
  // Export ZIP & Standalone HTML
  // --------------------------------------------------------------------------
  function exportZIP() {
    try {
      if (!window.JSZip || !window.saveAs) {
        showToast('ZIP export library is loading...', 'info');
        return;
      }

      const zip = new window.JSZip();
      const title = (DOM.projectTitle.value.trim() || 'codecraft-project').toLowerCase().replace(/[^a-z0-9]/g, '-');
      
      const htmlCode = htmlEditor.getValue();
      const cssCode = cssEditor.getValue();
      const jsCode = jsEditor.getValue();

      // Build standalone index.html linking style.css and script.js
      let cdnTags = '';
      Object.keys(STATE.cdns).forEach(key => {
        if (key === 'custom') {
          STATE.cdns.custom.forEach(url => {
            if (url.endsWith('.css') || url.includes('/css')) cdnTags += `  <link rel="stylesheet" href="${url}">\n`;
            else cdnTags += `  <script src="${url}"><\/script>\n`;
          });
        } else if (STATE.cdns[key]) {
          const def = CDN_DEFS[key];
          if (Array.isArray(def)) {
            def.forEach(d => {
              if (d.type === 'css') cdnTags += `  <link rel="stylesheet" href="${d.url}">\n`;
              if (d.type === 'js') cdnTags += `  <script src="${d.url}"><\/script>\n`;
            });
          } else if (def) {
            if (def.type === 'css') cdnTags += `  <link rel="stylesheet" href="${def.url}">\n`;
            if (def.type === 'js') cdnTags += `  <script src="${def.url}"><\/script>\n`;
          }
        }
      });

      const packagedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(DOM.projectTitle.value)}</title>
${cdnTags}  <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlCode}
  <script src="script.js"><\/script>
</body>
</html>`;

      zip.file("index.html", packagedHtml);
      zip.file("style.css", cssCode);
      zip.file("script.js", jsCode);
      zip.file("README.md", `# ${DOM.projectTitle.value}\n\nExported from [CodeCraft IDE](https://ferilsunu.github.io/CodeCraft/).`);

      zip.generateAsync({ type: "blob" }).then(content => {
        window.saveAs(content, `${title}.zip`);
        showToast('Downloaded project ZIP archive!', 'success');
        triggerConfetti();
      });
    } catch (e) {
      showToast('Export error: ' + e.message, 'error');
    }
  }

  function exportStandaloneHTML() {
    try {
      const fullHtml = buildPreviewHTML();
      const title = (DOM.projectTitle.value.trim() || 'codecraft-bundle').toLowerCase().replace(/[^a-z0-9]/g, '-');
      const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
      window.saveAs(blob, `${title}.html`);
      showToast('Downloaded standalone HTML file!', 'success');
      triggerConfetti();
    } catch (e) {
      showToast('Export error: ' + e.message, 'error');
    }
  }

  // --------------------------------------------------------------------------
  // Templates Engine
  // --------------------------------------------------------------------------
  function applyTemplate(tplKey) {
    const tpl = TEMPLATES[tplKey];
    if (!tpl) return;

    STATE.projectId = 'craft_' + Date.now();
    STATE.title = tpl.title;
    DOM.projectTitle.value = tpl.title;

    STATE.cdns = Object.assign({
      tailwind: false, react: false, bootstrap: false, threejs: false,
      gsap: false, chartjs: false, fontawesome: false, animatecss: false,
      jquery: false, custom: []
    }, tpl.cdns || {});

    syncCdnCheckboxes();
    updateCdnBadge();

    if (htmlEditor) htmlEditor.setValue(tpl.html || '', -1);
    if (cssEditor) cssEditor.setValue(tpl.css || '', -1);
    if (jsEditor) jsEditor.setValue(tpl.js || '', -1);

    updateStats();
    runCode();
    saveActiveProject();
    closeAllModals();
    showToast(`Loaded template: ${tpl.title}`, 'success');
  }

  // --------------------------------------------------------------------------
  // CDN Management
  // --------------------------------------------------------------------------
  function syncCdnCheckboxes() {
    document.querySelectorAll('.lib-toggle-card input[data-lib]').forEach(input => {
      const libKey = input.getAttribute('data-lib');
      input.checked = !!STATE.cdns[libKey];
    });
    renderCustomCdnTags();
  }

  function renderCustomCdnTags() {
    if (!DOM.customCdnsList) return;
    DOM.customCdnsList.innerHTML = STATE.cdns.custom.map((url, idx) => `
      <span class="cdn-tag">
        <span>${url.split('/').pop() || url}</span>
        <i data-lucide="x" class="cdn-tag-delete" data-index="${idx}"></i>
      </span>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    DOM.customCdnsList.querySelectorAll('.cdn-tag-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        STATE.cdns.custom.splice(idx, 1);
        renderCustomCdnTags();
        updateCdnBadge();
        runCode();
        saveActiveProject();
      });
    });
  }

  function updateCdnBadge() {
    let count = Object.keys(STATE.cdns).filter(k => k !== 'custom' && STATE.cdns[k]).length;
    count += (STATE.cdns.custom || []).length;

    if (DOM.libraryBadge) {
      if (count > 0) {
        DOM.libraryBadge.textContent = count;
        DOM.libraryBadge.classList.remove('hidden');
      } else {
        DOM.libraryBadge.classList.add('hidden');
      }
    }
  }

  // --------------------------------------------------------------------------
  // Settings & Preferences
  // --------------------------------------------------------------------------
  function loadSettings() {
    const raw = localStorage.getItem('codecraft_settings');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        Object.assign(STATE, parsed);
      } catch (e) {}
    }

    if (DOM.settingTheme) DOM.settingTheme.value = STATE.theme;
    if (DOM.settingFontSize) {
      DOM.settingFontSize.value = STATE.fontSize;
      DOM.fontSizeLabel.textContent = STATE.fontSize + 'px';
    }
    if (DOM.settingWordWrap) DOM.settingWordWrap.checked = STATE.wordWrap;
    if (DOM.settingAutocomplete) DOM.settingAutocomplete.checked = STATE.autocomplete;
    if (DOM.settingLineNumbers) DOM.settingLineNumbers.checked = STATE.lineNumbers;
  }

  function saveSettings() {
    const toSave = {
      theme: STATE.theme,
      fontSize: STATE.fontSize,
      wordWrap: STATE.wordWrap,
      autocomplete: STATE.autocomplete,
      lineNumbers: STATE.lineNumbers
    };
    localStorage.setItem('codecraft_settings', JSON.stringify(toSave));

    // Update active ace editors
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
      if (!editor) return;
      editor.setTheme("ace/theme/" + STATE.theme);
      editor.setFontSize(STATE.fontSize + "px");
      editor.getSession().setUseWrapMode(STATE.wordWrap);
      editor.renderer.setShowGutter(STATE.lineNumbers);
      editor.setOptions({
        enableBasicAutocompletion: STATE.autocomplete,
        enableLiveAutocompletion: STATE.autocomplete
      });
    });
  }

  // --------------------------------------------------------------------------
  // UI Helpers & Modals
  // --------------------------------------------------------------------------
  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop, .drawer-backdrop').forEach(el => el.classList.add('hidden'));
    if (DOM.exportMenu) DOM.exportMenu.classList.add('hidden');
  }

  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-msg">${escapeHTML(msg)}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 3000);
  }

  // --------------------------------------------------------------------------
  // Event Bindings
  // --------------------------------------------------------------------------
  function bindEvents() {
    // Run button
    DOM.btnRun.addEventListener('click', runCode);

    // Auto-Run Toggle
    DOM.toggleAutoRun.addEventListener('change', (e) => {
      STATE.autoRun = e.target.checked;
      showToast(`Auto-run ${STATE.autoRun ? 'enabled' : 'disabled'}`, 'info');
    });

    // Format Code
    DOM.btnFormat.addEventListener('click', formatAllCode);

    // Layout Mode Switcher
    DOM.btnLayoutColumns.addEventListener('click', () => {
      STATE.layout = 'columns';
      DOM.btnLayoutColumns.classList.add('active');
      DOM.btnLayoutRows.classList.remove('active');
      DOM.btnLayoutTabs.classList.remove('active');
      initSplitPanes();
    });

    DOM.btnLayoutRows.addEventListener('click', () => {
      STATE.layout = 'rows';
      DOM.btnLayoutRows.classList.add('active');
      DOM.btnLayoutColumns.classList.remove('active');
      DOM.btnLayoutTabs.classList.remove('active');
      initSplitPanes();
    });

    DOM.btnLayoutTabs.addEventListener('click', () => {
      STATE.layout = 'tabs';
      DOM.btnLayoutTabs.classList.add('active');
      DOM.btnLayoutColumns.classList.remove('active');
      DOM.btnLayoutRows.classList.remove('active');
      initSplitPanes();
    });

    // Editor Tab Buttons (Tab Mode)
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ed = btn.getAttribute('data-editor');
        switchTab(ed);
      });
    });

    // Project Name Editing
    DOM.projectTitle.addEventListener('input', () => {
      STATE.title = DOM.projectTitle.value;
      triggerAutoSaveDebounce();
    });

    // Copy & Clear Panel Buttons
    DOM.btnCopyHtml.addEventListener('click', () => {
      navigator.clipboard.writeText(htmlEditor.getValue());
      showToast('Copied HTML to clipboard!', 'info');
    });
    DOM.btnClearHtml.addEventListener('click', () => {
      if (confirm('Clear all HTML code?')) { htmlEditor.setValue('', -1); runCode(); }
    });

    DOM.btnCopyCss.addEventListener('click', () => {
      navigator.clipboard.writeText(cssEditor.getValue());
      showToast('Copied CSS to clipboard!', 'info');
    });
    DOM.btnClearCss.addEventListener('click', () => {
      if (confirm('Clear all CSS code?')) { cssEditor.setValue('', -1); runCode(); }
    });

    DOM.btnCopyJs.addEventListener('click', () => {
      navigator.clipboard.writeText(jsEditor.getValue());
      showToast('Copied JavaScript to clipboard!', 'info');
    });
    DOM.btnClearJs.addEventListener('click', () => {
      if (confirm('Clear all JavaScript code?')) { jsEditor.setValue('', -1); runCode(); }
    });

    // Device Viewport Preset Switcher
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const width = btn.getAttribute('data-width');
        DOM.deviceFrameContainer.style.width = width;
      });
    });

    // Preview Toolbar
    DOM.btnRefreshPreview.addEventListener('click', runCode);

    DOM.btnToggleConsole.addEventListener('click', () => {
      DOM.virtualConsolePanel.classList.toggle('hidden');
    });

    DOM.btnCloseConsole.addEventListener('click', () => {
      DOM.virtualConsolePanel.classList.add('hidden');
    });

    DOM.btnClearConsole.addEventListener('click', clearConsole);

    // Console Filters
    document.querySelectorAll('.console-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.console-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.consoleFilter = btn.getAttribute('data-filter');
        renderConsoleLogs();
      });
    });

    // Console REPL
    DOM.consoleReplForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = DOM.consoleReplInput.value.trim();
      if (!code) return;
      DOM.consoleReplInput.value = '';

      // Send to iframe
      const iframe = DOM.outputIframe;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'eval_repl', code }, '*');
      }
    });

    // Fullscreen Preview
    DOM.btnFullscreenPreview.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        DOM.previewPane.requestFullscreen().catch(err => alert(err.message));
      } else {
        document.exitFullscreen();
      }
    });

    // Modals Open Triggers
    DOM.btnTemplates.addEventListener('click', () => DOM.modalTemplates.classList.remove('hidden'));
    DOM.btnLibraries.addEventListener('click', () => DOM.modalLibraries.classList.remove('hidden'));
    DOM.btnProjects.addEventListener('click', () => {
      renderSavedProjectsList();
      DOM.drawerProjects.classList.remove('hidden');
    });
    DOM.btnSettings.addEventListener('click', () => DOM.modalSettings.classList.remove('hidden'));

    // Modal Close buttons & Backdrop Clicks
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        const target = document.getElementById(targetId);
        if (target) target.classList.add('hidden');
      });
    });

    document.querySelectorAll('.modal-backdrop, .drawer-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.add('hidden');
      });
    });

    // Export Dropdown
    DOM.btnExportDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.exportMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (DOM.exportMenu && !DOM.btnExportDropdown.contains(e.target)) {
        DOM.exportMenu.classList.add('hidden');
      }
    });

    DOM.btnExportZip.addEventListener('click', () => {
      DOM.exportMenu.classList.add('hidden');
      exportZIP();
    });

    DOM.btnExportHtml.addEventListener('click', () => {
      DOM.exportMenu.classList.add('hidden');
      exportStandaloneHTML();
    });

    // Share Button
    DOM.btnShare.addEventListener('click', shareURL);

    // Save as New Project in Drawer
    DOM.btnSaveNewProject.addEventListener('click', () => {
      STATE.projectId = 'craft_' + Date.now();
      saveActiveProject();
      renderSavedProjectsList();
      showToast('Saved as new project snippet!', 'success');
    });

    // Starter Template Selection
    document.querySelectorAll('.template-card[data-template]').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-template');
        applyTemplate(key);
      });
    });

    // CDN Library Toggles
    document.querySelectorAll('.lib-toggle-card input[data-lib]').forEach(input => {
      input.addEventListener('change', () => {
        const libKey = input.getAttribute('data-lib');
        STATE.cdns[libKey] = input.checked;
        updateCdnBadge();
        runCode();
        saveActiveProject();
      });
    });

    // Add Custom CDN
    DOM.btnAddCustomCdn.addEventListener('click', () => {
      const url = DOM.customCdnInput.value.trim();
      if (!url) return;
      if (!STATE.cdns.custom.includes(url)) {
        STATE.cdns.custom.push(url);
        DOM.customCdnInput.value = '';
        renderCustomCdnTags();
        updateCdnBadge();
        runCode();
        saveActiveProject();
      }
    });

    // Settings Form Handlers
    DOM.settingTheme.addEventListener('change', (e) => {
      STATE.theme = e.target.value;
      saveSettings();
    });

    DOM.settingFontSize.addEventListener('input', (e) => {
      STATE.fontSize = parseInt(e.target.value, 10);
      DOM.fontSizeLabel.textContent = STATE.fontSize + 'px';
      saveSettings();
    });

    DOM.settingWordWrap.addEventListener('change', (e) => {
      STATE.wordWrap = e.target.checked;
      saveSettings();
    });

    DOM.settingAutocomplete.addEventListener('change', (e) => {
      STATE.autocomplete = e.target.checked;
      saveSettings();
    });

    DOM.settingLineNumbers.addEventListener('change', (e) => {
      STATE.lineNumbers = e.target.checked;
      saveSettings();
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ctrl + Enter -> Run Code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
        showToast('Code executed', 'info');
      }

      // Ctrl + Shift + F or Alt + Shift + F -> Format
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'F' || e.key === 'f')) || (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f'))) {
        e.preventDefault();
        formatAllCode();
      }

      // Ctrl + ` -> Toggle Console
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        DOM.virtualConsolePanel.classList.toggle('hidden');
      }

      // Escape -> Close Modals
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  // DOM ready check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();