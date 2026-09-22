/**
 * Modals & Settings Management (Templates, Libraries, Preferences)
 */

import { state } from '../core/state.js';
import { updateEditorPreferences } from '../core/editor.js';
import { runCode } from '../core/runner.js';
import { applyTemplate, saveActiveProject, updateCdnBadge, renderCustomCdnTags } from '../core/project.js';
import { saveSettings } from '../modules/storage.js';

export function initModals() {
  const btnTemplates = document.getElementById('btn-templates');
  const btnLibraries = document.getElementById('btn-libraries');
  const btnSettings = document.getElementById('btn-settings');

  if (btnTemplates) {
    btnTemplates.addEventListener('click', () => {
      document.getElementById('modal-templates').classList.remove('hidden');
    });
  }

  if (btnLibraries) {
    btnLibraries.addEventListener('click', () => {
      document.getElementById('modal-libraries').classList.remove('hidden');
    });
  }

  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      syncSettingsUI();
      document.getElementById('modal-settings').classList.remove('hidden');
    });
  }

  // Template cards click
  document.querySelectorAll('.template-card[data-template]').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-template');
      applyTemplate(key);
    });
  });

  // CDN Library toggles
  document.querySelectorAll('.lib-toggle-card input[data-lib]').forEach(input => {
    input.addEventListener('change', () => {
      const libKey = input.getAttribute('data-lib');
      state.cdns[libKey] = input.checked;
      updateCdnBadge();
      runCode();
      saveActiveProject();
    });
  });

  // Custom CDN Add
  const btnAddCustom = document.getElementById('btn-add-custom-cdn');
  const inputCustom = document.getElementById('custom-cdn-input');

  if (btnAddCustom && inputCustom) {
    btnAddCustom.addEventListener('click', () => {
      const url = inputCustom.value.trim();
      if (!url) return;
      if (!state.cdns.custom.includes(url)) {
        state.cdns.custom.push(url);
        inputCustom.value = '';
        renderCustomCdnTags();
        updateCdnBadge();
        runCode();
        saveActiveProject();
      }
    });
  }

  // Settings inputs
  bindSettingsInputs();

  // Close modals on data-close or backdrop
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
}

export function closeAllModals() {
  document.querySelectorAll('.modal-backdrop, .drawer-backdrop').forEach(el => el.classList.add('hidden'));
  const exportMenu = document.getElementById('export-menu');
  if (exportMenu) exportMenu.classList.add('hidden');
}

function syncSettingsUI() {
  const settingTheme = document.getElementById('setting-theme');
  const settingFontSize = document.getElementById('setting-font-size');
  const fontSizeLabel = document.getElementById('font-size-label');
  const settingWordWrap = document.getElementById('setting-word-wrap');
  const settingAutocomplete = document.getElementById('setting-autocomplete');
  const settingLineNumbers = document.getElementById('setting-line-numbers');

  if (settingTheme) settingTheme.value = state.theme;
  if (settingFontSize) {
    settingFontSize.value = state.fontSize;
    if (fontSizeLabel) fontSizeLabel.textContent = state.fontSize + 'px';
  }
  if (settingWordWrap) settingWordWrap.checked = state.wordWrap;
  if (settingAutocomplete) settingAutocomplete.checked = state.autocomplete;
  if (settingLineNumbers) settingLineNumbers.checked = state.lineNumbers;
}

function bindSettingsInputs() {
  const settingTheme = document.getElementById('setting-theme');
  const settingFontSize = document.getElementById('setting-font-size');
  const fontSizeLabel = document.getElementById('font-size-label');
  const settingWordWrap = document.getElementById('setting-word-wrap');
  const settingAutocomplete = document.getElementById('setting-autocomplete');
  const settingLineNumbers = document.getElementById('setting-line-numbers');

  if (settingTheme) {
    settingTheme.addEventListener('change', (e) => {
      state.theme = e.target.value;
      updateEditorPreferences();
      saveSettings();
    });
  }

  if (settingFontSize) {
    settingFontSize.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      if (fontSizeLabel) fontSizeLabel.textContent = state.fontSize + 'px';
      updateEditorPreferences();
      saveSettings();
    });
  }

  if (settingWordWrap) {
    settingWordWrap.addEventListener('change', (e) => {
      state.wordWrap = e.target.checked;
      updateEditorPreferences();
      saveSettings();
    });
  }

  if (settingAutocomplete) {
    settingAutocomplete.addEventListener('change', (e) => {
      state.autocomplete = e.target.checked;
      updateEditorPreferences();
      saveSettings();
    });
  }

  if (settingLineNumbers) {
    settingLineNumbers.addEventListener('change', (e) => {
      state.lineNumbers = e.target.checked;
      updateEditorPreferences();
      saveSettings();
    });
  }
}
