/**
 * Keyboard Shortcuts Manager
 */

import { runCode } from '../core/runner.js';
import { formatCode } from '../modules/formatter.js';
import { closeAllModals } from './modals.js';
import { showToast } from './toast.js';

export function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ctrl + Enter or Cmd + Enter -> Run Code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
      showToast('Code executed', 'info');
    }

    // Ctrl + Shift + F or Alt + Shift + F -> Format
    if (((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'F' || e.key === 'f')) || 
        (e.altKey && e.shiftKey && (e.key === 'F' || e.key === 'f'))) {
      e.preventDefault();
      formatCode();
    }

    // Ctrl + ` -> Toggle Virtual Console
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      const consolePanel = document.getElementById('virtual-console-panel');
      if (consolePanel) consolePanel.classList.toggle('hidden');
    }

    // Escape -> Close Modals
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}
