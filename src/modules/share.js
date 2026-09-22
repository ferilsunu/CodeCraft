/**
 * Compressed URL Hash Sharing & Confetti Animation
 */

import { state } from '../core/state.js';
import { getCode } from '../core/editor.js';
import { applyProjectData } from '../core/project.js';
import { showToast } from '../ui/toast.js';

export function shareURL() {
  try {
    const titleInput = document.getElementById('project-title');
    const title = titleInput ? titleInput.value.trim() : state.title;
    const { html, css, js } = getCode();

    const payload = {
      title,
      html,
      css,
      js,
      cdns: state.cdns
    };

    if (window.LZString) {
      const compressed = window.LZString.compressToEncodedURIComponent(JSON.stringify(payload));
      const shareableUrl = `${window.location.origin}${window.location.pathname}#code=${compressed}`;

      navigator.clipboard.writeText(shareableUrl).then(() => {
        showToast('Share link copied to clipboard!', 'success');
        triggerConfetti();
      }).catch(() => {
        prompt('Copy your share URL:', shareableUrl);
      });
    }
  } catch (e) {
    showToast('Failed to generate share URL', 'error');
  }
}

export function loadFromHash() {
  try {
    if (window.location.hash && window.location.hash.startsWith('#code=')) {
      const hash = window.location.hash.substring(6);
      if (window.LZString && hash) {
        const decompressed = window.LZString.decompressFromEncodedURIComponent(hash);
        if (decompressed) {
          const data = JSON.parse(decompressed);
          applyProjectData(data);
          showToast(`Loaded shared craft: ${data.title}`, 'success');
          return true;
        }
      }
    }
  } catch (e) {
    console.error('Error loading hash payload', e);
  }
  return false;
}

export function triggerConfetti() {
  if (window.confetti) {
    window.confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 }
    });
  }
}
