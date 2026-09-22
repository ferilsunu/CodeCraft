/**
 * Prettier Standalone Formatter Module
 */

import { getCode, setCode } from '../core/editor.js';
import { showToast } from '../ui/toast.js';

export function formatCode() {
  try {
    if (window.prettier && window.prettierPlugins) {
      const { html, css, js } = getCode();

      const formattedHtml = window.prettier.format(html, {
        parser: "html",
        plugins: window.prettierPlugins,
        tabWidth: 2
      });

      const formattedCss = window.prettier.format(css, {
        parser: "css",
        plugins: window.prettierPlugins,
        tabWidth: 2
      });

      const formattedJs = window.prettier.format(js, {
        parser: "babel",
        plugins: window.prettierPlugins,
        tabWidth: 2,
        semi: true
      });

      setCode({ html: formattedHtml, css: formattedCss, js: formattedJs });
      showToast('Code formatted with Prettier!', 'success');
    } else {
      showToast('Prettier formatter is loading...', 'info');
    }
  } catch (err) {
    showToast('Format notice: ' + err.message, 'error');
  }
}
