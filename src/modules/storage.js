/**
 * LocalStorage Persistence & Initializer
 */

import { state } from '../core/state.js';
import { applyProjectData, applyTemplate } from '../core/project.js';

export function initStorage() {
  const rawSettings = localStorage.getItem('codecraft_settings');
  if (rawSettings) {
    try {
      const parsed = JSON.parse(rawSettings);
      Object.assign(state, parsed);
    } catch (e) {}
  }

  // Load project from storage or default
  const rawActive = localStorage.getItem('codecraft_active_project');
  if (rawActive) {
    try {
      const data = JSON.parse(rawActive);
      applyProjectData(data);
      return;
    } catch (e) {}
  }

  // Fallback to blank starter
  applyTemplate('blank');
}

export function saveSettings() {
  const toSave = {
    theme: state.theme,
    fontSize: state.fontSize,
    wordWrap: state.wordWrap,
    autocomplete: state.autocomplete,
    lineNumbers: state.lineNumbers,
    layout: state.layout
  };
  localStorage.setItem('codecraft_settings', JSON.stringify(toSave));
}
