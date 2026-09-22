/**
 * In-App Virtual DevTools Console & REPL Engine
 */

import { state } from '../core/state.js';

export function initConsole() {
  window.addEventListener('message', (event) => {
    if (event.data && event.data.source === 'codecraft_preview_console') {
      const { type, content, timestamp } = event.data;
      addConsoleEntry(type, content, timestamp);
    }
  });

  const replForm = document.getElementById('console-repl-form');
  const replInput = document.getElementById('console-repl-input');

  if (replForm && replInput) {
    replForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = replInput.value.trim();
      if (!code) return;
      replInput.value = '';

      const iframe = document.getElementById('output-iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ action: 'eval_repl', code }, '*');
      }
    });
  }

  // Bind category filters
  document.querySelectorAll('.console-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.console-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.consoleFilter = btn.getAttribute('data-filter');
      renderConsoleLogs();
    });
  });

  const btnClear = document.getElementById('btn-clear-console');
  if (btnClear) btnClear.addEventListener('click', clearConsole);

  const btnClose = document.getElementById('btn-close-console');
  if (btnClose) {
    btnClose.addEventListener('click', () => {
      document.getElementById('virtual-console-panel').classList.add('hidden');
    });
  }

  const btnToggle = document.getElementById('btn-toggle-console');
  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      document.getElementById('virtual-console-panel').classList.toggle('hidden');
    });
  }
}

export function addConsoleEntry(type, content, timestamp) {
  state.consoleLogs.push({ type, content, timestamp });

  if (type === 'error') {
    state.errorCount++;
    updateConsoleBadge();
  }

  renderConsoleLogs();
}

export function renderConsoleLogs() {
  const list = document.getElementById('console-logs-list');
  if (!list) return;

  const filtered = state.consoleLogs.filter(item => {
    if (state.consoleFilter === 'all') return true;
    return item.type === state.consoleFilter;
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

export function clearConsole() {
  state.consoleLogs = [];
  state.errorCount = 0;
  updateConsoleBadge();
  renderConsoleLogs();
}

export function updateConsoleBadge() {
  const badge = document.getElementById('console-badge');
  if (!badge) return;

  if (state.errorCount > 0) {
    badge.textContent = state.errorCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
