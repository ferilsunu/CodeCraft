/**
 * Live Sandbox Code Execution & Preview Engine
 */

import { state } from './state.js';
import { getCode } from './editor.js';
import { CDN_DEFS } from '../config/cdns.js';
import { clearConsole } from '../modules/console.js';

let autoRunTimer = null;

export function buildPreviewHTML() {
  const { html, css, js } = (typeof window.getCodeExport === 'function')
    ? window.getCodeExport()
    : getCode();

  // Generate CDN Tags
  let cdnTags = '';
  Object.keys(state.cdns).forEach(key => {
    if (key === 'custom') {
      (state.cdns.custom || []).forEach(url => {
        if (url.endsWith('.css') || url.includes('/css')) {
          cdnTags += `<link rel="stylesheet" href="${url}">\n`;
        } else {
          cdnTags += `<script src="${url}"><\/script>\n`;
        }
      });
    } else if (state.cdns[key]) {
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

  const scriptType = state.cdns.react ? 'text/babel' : 'text/javascript';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${cdnTags}
  <style>
    ${css || ''}
  </style>
  ${consoleInterceptor}
</head>
<body>
  ${html || ''}
  <script type="${scriptType}">
    ${js || ''}
  <\/script>
</body>
</html>`;
}

export function runCode() {
  clearConsole();
  const previewContent = buildPreviewHTML();
  const iframe = document.getElementById('output-iframe');
  if (!iframe) return;

  iframe.srcdoc = previewContent;
}

export function triggerAutoRunDebounce() {
  clearTimeout(autoRunTimer);
  autoRunTimer = setTimeout(runCode, 400);
}
