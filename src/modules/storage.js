/**
 * LocalStorage Persistence & Snippet Management
 */

import { state } from '../core/state.js';
import { getCode, setCode } from '../core/editor.js';
import { runCode } from '../core/runner.js';
import { syncCdnCheckboxes, updateCdnBadge } from '../ui/modals.js';
import { applyTemplate } from '../ui/modals.js';
import { showToast } from '../ui/toast.js';

let saveDebounceTimer = null;

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

export function triggerAutoSaveDebounce() {
  const saveStatus = document.getElementById('save-status');
  if (saveStatus) {
    saveStatus.className = 'save-status unsaved';
    saveStatus.querySelector('.status-text').textContent = 'Editing...';
  }

  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(() => {
    saveActiveProject();
  }, 1000);
}

export function saveActiveProject() {
  const titleInput = document.getElementById('project-title');
  const title = titleInput ? titleInput.value.trim() : state.title;
  const { html, css, js } = getCode();

  const projectData = {
    id: state.projectId,
    title: title || 'Untitled Craft',
    html,
    css,
    js,
    cdns: state.cdns,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('codecraft_active_project', JSON.stringify(projectData));

  // Update in snippet list
  const allProjects = getAllSavedProjects();
  const existingIdx = allProjects.findIndex(p => p.id === state.projectId);
  if (existingIdx >= 0) {
    allProjects[existingIdx] = projectData;
  } else {
    allProjects.unshift(projectData);
  }
  localStorage.setItem('codecraft_all_projects', JSON.stringify(allProjects));

  const saveStatus = document.getElementById('save-status');
  if (saveStatus) {
    saveStatus.className = 'save-status saved';
    saveStatus.querySelector('.status-text').textContent = 'Saved';
  }
}

export function getAllSavedProjects() {
  try {
    const raw = localStorage.getItem('codecraft_all_projects');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function applyProjectData(data) {
  state.projectId = data.id || ('craft_' + Date.now());
  state.title = data.title || 'Untitled Craft';

  const titleInput = document.getElementById('project-title');
  if (titleInput) titleInput.value = state.title;

  if (data.cdns) {
    state.cdns = Object.assign({ custom: [] }, data.cdns);
    syncCdnCheckboxes();
  }

  setCode({ html: data.html || '', css: data.css || '', js: data.js || '' });
  updateCdnBadge();
  runCode();
}

export function saveSettings() {
  const toSave = {
    theme: state.theme,
    fontSize: state.fontSize,
    wordWrap: state.wordWrap,
    autocomplete: state.autocomplete,
    lineNumbers: state.lineNumbers
  };
  localStorage.setItem('codecraft_settings', JSON.stringify(toSave));
}
