/**
 * Multi-Format Project Exporter (ZIP Archive & Standalone HTML)
 */

import { state } from '../core/state.js';
import { getCode } from '../core/editor.js';
import { buildPreviewHTML } from '../core/runner.js';
import { CDN_DEFS } from '../config/cdns.js';
import { triggerConfetti } from './share.js';
import { showToast } from '../ui/toast.js';

export function exportZIP() {
  try {
    if (!window.JSZip || !window.saveAs) {
      showToast('ZIP export library is loading...', 'info');
      return;
    }

    const zip = new window.JSZip();
    const titleInput = document.getElementById('project-title');
    const rawTitle = titleInput ? titleInput.value.trim() : state.title;
    const title = (rawTitle || 'codecraft-project').toLowerCase().replace(/[^a-z0-9]/g, '-');

    const { html, css, js } = getCode();

    let cdnTags = '';
    Object.keys(state.cdns).forEach(key => {
      if (key === 'custom') {
        state.cdns.custom.forEach(url => {
          if (url.endsWith('.css') || url.includes('/css')) cdnTags += `  <link rel="stylesheet" href="${url}">\n`;
          else cdnTags += `  <script src="${url}"><\/script>\n`;
        });
      } else if (state.cdns[key]) {
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
  <title>${escapeHTML(rawTitle)}</title>
${cdnTags}  <link rel="stylesheet" href="style.css">
</head>
<body>
${html}
  <script src="script.js"><\/script>
</body>
</html>`;

    zip.file("index.html", packagedHtml);
    zip.file("style.css", css);
    zip.file("script.js", js);
    zip.file("README.md", `# ${rawTitle}\n\nExported from [CodeCraft IDE](https://ferilsunu.github.io/CodeCraft/).`);

    zip.generateAsync({ type: "blob" }).then(content => {
      window.saveAs(content, `${title}.zip`);
      showToast('Downloaded project ZIP archive!', 'success');
      triggerConfetti();
    });
  } catch (e) {
    showToast('Export error: ' + e.message, 'error');
  }
}

export function exportStandaloneHTML() {
  try {
    const fullHtml = buildPreviewHTML();
    const titleInput = document.getElementById('project-title');
    const rawTitle = titleInput ? titleInput.value.trim() : state.title;
    const title = (rawTitle || 'codecraft-bundle').toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    window.saveAs(blob, `${title}.html`);
    showToast('Downloaded standalone HTML file!', 'success');
    triggerConfetti();
  } catch (e) {
    showToast('Export error: ' + e.message, 'error');
  }
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
