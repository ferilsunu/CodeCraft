/**
 * CodeCraft — Modern Cloud Web IDE & Playground Entry Point
 * Author: Feril Sunu
 */

import { state, subscribe } from './core/state.js';
import { initEditors, getCode, setCode } from './core/editor.js';
import { initLayout, switchTab } from './core/layout.js';
import { runCode, triggerAutoRunDebounce } from './core/runner.js';
import { initConsole } from './modules/console.js';
import { formatCode } from './modules/formatter.js';
import { initStorage, triggerAutoSaveDebounce, saveActiveProject } from './modules/storage.js';
import { shareURL, loadFromHash } from './modules/share.js';
import { exportZIP, exportStandaloneHTML } from './modules/exporter.js';
import { initModals, closeAllModals } from './ui/modals.js';
import { initDrawer } from './ui/drawer.js';
import { initShortcuts } from './ui/shortcuts.js';
import { showToast } from './ui/toast.js';

function bootstrap() {
  // Initialize Core Subsystems
  initEditors();
  initLayout();
  initConsole();
  initModals();
  initDrawer();
  initShortcuts();

  // Bind Top Navbar Controls
  bindNavbarEvents();

  // Load state from URL hash or LocalStorage
  const loadedHash = loadFromHash();
  if (!loadedHash) {
    initStorage();
  }

  // Subscribe to editor changes
  subscribe('code:change', () => {
    triggerAutoSaveDebounce();
    if (state.autoRun) {
      triggerAutoRunDebounce();
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function bindNavbarEvents() {
  const btnRun = document.getElementById('btn-run');
  const toggleAutoRun = document.getElementById('toggle-autorun');
  const btnFormat = document.getElementById('btn-format');
  const btnShare = document.getElementById('btn-share');
  const btnExportDropdown = document.getElementById('btn-export-dropdown');
  const exportMenu = document.getElementById('export-menu');
  const btnExportZip = document.getElementById('btn-export-zip');
  const btnExportHtml = document.getElementById('btn-export-html');
  const projectTitle = document.getElementById('project-title');

  // Layout mode buttons
  const btnLayoutCols = document.getElementById('btn-layout-columns');
  const btnLayoutRows = document.getElementById('btn-layout-rows');
  const btnLayoutTabs = document.getElementById('btn-layout-tabs');

  if (btnRun) btnRun.addEventListener('click', runCode);

  if (toggleAutoRun) {
    toggleAutoRun.addEventListener('change', (e) => {
      state.autoRun = e.target.checked;
      showToast(`Auto-run ${state.autoRun ? 'enabled' : 'disabled'}`, 'info');
    });
  }

  if (btnFormat) btnFormat.addEventListener('click', formatCode);
  if (btnShare) btnShare.addEventListener('click', shareURL);

  if (btnExportDropdown && exportMenu) {
    btnExportDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      exportMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!btnExportDropdown.contains(e.target)) {
        exportMenu.classList.add('hidden');
      }
    });
  }

  if (btnExportZip) {
    btnExportZip.addEventListener('click', () => {
      if (exportMenu) exportMenu.classList.add('hidden');
      exportZIP();
    });
  }

  if (btnExportHtml) {
    btnExportHtml.addEventListener('click', () => {
      if (exportMenu) exportMenu.classList.add('hidden');
      exportStandaloneHTML();
    });
  }

  if (projectTitle) {
    projectTitle.addEventListener('input', () => {
      state.title = projectTitle.value;
      triggerAutoSaveDebounce();
    });
  }

  // Layout Switchers
  if (btnLayoutCols) {
    btnLayoutCols.addEventListener('click', () => {
      state.layout = 'columns';
      btnLayoutCols.classList.add('active');
      if (btnLayoutRows) btnLayoutRows.classList.remove('active');
      if (btnLayoutTabs) btnLayoutTabs.classList.remove('active');
      initLayout();
    });
  }

  if (btnLayoutRows) {
    btnLayoutRows.addEventListener('click', () => {
      state.layout = 'rows';
      btnLayoutRows.classList.add('active');
      if (btnLayoutCols) btnLayoutCols.classList.remove('active');
      if (btnLayoutTabs) btnLayoutTabs.classList.remove('active');
      initLayout();
    });
  }

  if (btnLayoutTabs) {
    btnLayoutTabs.addEventListener('click', () => {
      state.layout = 'tabs';
      btnLayoutTabs.classList.add('active');
      if (btnLayoutCols) btnLayoutCols.classList.remove('active');
      if (btnLayoutRows) btnLayoutRows.classList.remove('active');
      initLayout();
    });
  }

  // Tab mode buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ed = btn.getAttribute('data-editor');
      switchTab(ed);
    });
  });

  // Panel copy/clear buttons
  bindPanelButtons();

  // Device switcher
  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const width = btn.getAttribute('data-width');
      const container = document.getElementById('device-frame-container');
      if (container) container.style.width = width;
    });
  });

  // Preview header buttons
  const btnRefresh = document.getElementById('btn-refresh-preview');
  if (btnRefresh) btnRefresh.addEventListener('click', runCode);

  const btnFullscreen = document.getElementById('btn-fullscreen-preview');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      const previewPane = document.getElementById('preview-pane');
      if (!document.fullscreenElement) {
        previewPane.requestFullscreen().catch(err => alert(err.message));
      } else {
        document.exitFullscreen();
      }
    });
  }
}

function bindPanelButtons() {
  const btnCopyHtml = document.getElementById('btn-copy-html');
  const btnClearHtml = document.getElementById('btn-clear-html');
  const btnCopyCss = document.getElementById('btn-copy-css');
  const btnClearCss = document.getElementById('btn-clear-css');
  const btnCopyJs = document.getElementById('btn-copy-js');
  const btnClearJs = document.getElementById('btn-clear-js');

  if (btnCopyHtml) {
    btnCopyHtml.addEventListener('click', () => {
      const { html } = getCode();
      navigator.clipboard.writeText(html);
      showToast('Copied HTML to clipboard!', 'info');
    });
  }
  if (btnClearHtml) {
    btnClearHtml.addEventListener('click', () => {
      if (confirm('Clear all HTML code?')) { setCode({ html: '' }); runCode(); }
    });
  }

  if (btnCopyCss) {
    btnCopyCss.addEventListener('click', () => {
      const { css } = getCode();
      navigator.clipboard.writeText(css);
      showToast('Copied CSS to clipboard!', 'info');
    });
  }
  if (btnClearCss) {
    btnClearCss.addEventListener('click', () => {
      if (confirm('Clear all CSS code?')) { setCode({ css: '' }); runCode(); }
    });
  }

  if (btnCopyJs) {
    btnCopyJs.addEventListener('click', () => {
      const { js } = getCode();
      navigator.clipboard.writeText(js);
      showToast('Copied JavaScript to clipboard!', 'info');
    });
  }
  if (btnClearJs) {
    btnClearJs.addEventListener('click', () => {
      if (confirm('Clear all JavaScript code?')) { setCode({ js: '' }); runCode(); }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
