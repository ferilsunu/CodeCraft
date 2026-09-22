/**
 * Ace Editor Instance Management & Stats
 */

import { state, emit } from './state.js';

let htmlEditor = null;
let cssEditor = null;
let jsEditor = null;

export function initEditors() {
  if (window.ace) {
    window.ace.require("ace/ext/language_tools");

    htmlEditor = window.ace.edit("html-editor");
    configureAce(htmlEditor, "ace/mode/html");

    cssEditor = window.ace.edit("css-editor");
    configureAce(cssEditor, "ace/mode/css");

    jsEditor = window.ace.edit("js-editor");
    configureAce(jsEditor, "ace/mode/javascript");

    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
      editor.getSession().on('change', () => {
        updateStats();
        emit('code:change');
      });
    });

    updateStats();
  }
}

export function configureAce(editor, mode) {
  editor.setTheme("ace/theme/" + state.theme);
  editor.getSession().setMode(mode);
  editor.setFontSize(state.fontSize + "px");
  editor.setShowPrintMargin(false);
  editor.renderer.setShowGutter(state.lineNumbers);
  editor.getSession().setUseWrapMode(state.wordWrap);
  editor.setOptions({
    enableBasicAutocompletion: state.autocomplete,
    enableLiveAutocompletion: state.autocomplete,
    enableSnippets: true,
    tabSize: 2,
    useSoftTabs: true,
    scrollPastEnd: 0.1
  });
}

export function getCode() {
  return {
    html: htmlEditor ? htmlEditor.getValue() : '',
    css: cssEditor ? cssEditor.getValue() : '',
    js: jsEditor ? jsEditor.getValue() : ''
  };
}

export function setCode({ html, css, js }) {
  if (html !== undefined && htmlEditor) htmlEditor.setValue(html, -1);
  if (css !== undefined && cssEditor) cssEditor.setValue(css, -1);
  if (js !== undefined && jsEditor) jsEditor.setValue(js, -1);
  updateStats();
}

export function updateStats() {
  const htmlStats = document.getElementById('html-stats');
  const cssStats = document.getElementById('css-stats');
  const jsStats = document.getElementById('js-stats');

  if (htmlStats && htmlEditor) htmlStats.textContent = `${htmlEditor.session.getLength()} lines`;
  if (cssStats && cssEditor) cssStats.textContent = `${cssEditor.session.getLength()} lines`;
  if (jsStats && jsEditor) jsStats.textContent = `${jsEditor.session.getLength()} lines`;
}

export function resizeEditors() {
  setTimeout(() => {
    if (htmlEditor) htmlEditor.resize();
    if (cssEditor) cssEditor.resize();
    if (jsEditor) jsEditor.resize();
  }, 50);
}

export function updateEditorPreferences() {
  [htmlEditor, cssEditor, jsEditor].forEach(editor => {
    if (!editor) return;
    editor.setTheme("ace/theme/" + state.theme);
    editor.setFontSize(state.fontSize + "px");
    editor.getSession().setUseWrapMode(state.wordWrap);
    editor.renderer.setShowGutter(state.lineNumbers);
    editor.setOptions({
      enableBasicAutocompletion: state.autocomplete,
      enableLiveAutocompletion: state.autocomplete
    });
  });
}

export function getEditorInstances() {
  return { htmlEditor, cssEditor, jsEditor };
}
