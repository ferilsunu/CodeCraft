/**
 * Project Management & Template Loader
 */

import { state } from './state.js';
import { TEMPLATES } from '../config/templates.js';
import { setCode, updateStats } from './editor.js';
import { runCode } from './runner.js';
import { showToast } from '../ui/toast.js';

let saveDebounceTimer = null;

export function applyTemplate(tplKey) {
  const tpl = TEMPLATES[tplKey];
  if (!tpl) return;

  state.projectId = 'craft_' + Date.now();
  state.title = tpl.title;
  
  const titleInput = document.getElementById('project-title');
  if (titleInput) titleInput.value = tpl.title;

  state.cdns = Object.assign({
    tailwind: false, react: false, bootstrap: false, threejs: false,
    gsap: false, chartjs: false, fontawesome: false, animatecss: false,
    jquery: false, custom: []
  }, tpl.cdns || {});

  syncCdnCheckboxes();
  updateCdnBadge();
  setCode({ html: tpl.html || '', css: tpl.css || '', js: tpl.js || '' });

  updateStats();
  runCode();
  saveActiveProject();
  closeAllModals();
  showToast(`Loaded template: ${tpl.title}`, 'success');
}

export function applyProjectData(data) {
  state.projectId = data.id || ('craft_' + Date.now());
  state.title = data.title || 'Untitled Craft';

  const titleInput = document.getElementById('project-title');
  if (titleInput) titleInput.value = state.title;

  if (data.cdns) {
    state.cdns = Object.assign({
      tailwind: false, react: false, bootstrap: false, threejs: false,
      gsap: false, chartjs: false, fontawesome: false, animatecss: false,
      jquery: false, custom: []
    }, data.cdns);
    syncCdnCheckboxes();
  }

  setCode({ html: data.html || '', css: data.css || '', js: data.js || '' });
  updateCdnBadge();
  updateStats();
  runCode();
}

export function triggerAutoSaveDebounce() {
  const saveStatus = document.getElementById('save-status');
  if (saveStatus) {
    saveStatus.className = 'save-status unsaved';
    const statusText = saveStatus.querySelector('.status-text');
    if (statusText) statusText.textContent = 'Editing...';
  }

  clearTimeout(saveDebounceTimer);
  saveDebounceTimer = setTimeout(() => {
    saveActiveProject();
  }, 800);
}

export function saveActiveProject() {
  const titleInput = document.getElementById('project-title');
  const title = titleInput ? titleInput.value.trim() : state.title;
  const { html, css, js } = (typeof window.getCodeExport === 'function') 
    ? window.getCodeExport() 
    : { html: '', css: '', js: '' };

  const projectData = {
    id: state.projectId,
    title: title || 'Untitled Craft',
    html,
    css,
    js,
    cdns: state.cdns,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem('codecraft_active_project', JSON.stringify(projectData));

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
      const statusText = saveStatus.querySelector('.status-text');
      if (statusText) statusText.textContent = 'Saved';
    }
  } catch (e) {
    console.warn('LocalStorage save error', e);
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

export function syncCdnCheckboxes() {
  document.querySelectorAll('.lib-toggle-card input[data-lib]').forEach(input => {
    const libKey = input.getAttribute('data-lib');
    input.checked = !!state.cdns[libKey];
  });
  renderCustomCdnTags();
}

export function renderCustomCdnTags() {
  const container = document.getElementById('custom-cdns-list');
  if (!container) return;

  container.innerHTML = (state.cdns.custom || []).map((url, idx) => `
    <span class="cdn-tag">
      <span>${url.split('/').pop() || url}</span>
      <i data-lucide="x" class="cdn-tag-delete" data-index="${idx}"></i>
    </span>
  `).join('');

  if (window.lucide) window.lucide.createIcons();

  container.querySelectorAll('.cdn-tag-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      state.cdns.custom.splice(idx, 1);
      renderCustomCdnTags();
      updateCdnBadge();
      runCode();
      saveActiveProject();
    });
  });
}

export function updateCdnBadge() {
  let count = Object.keys(state.cdns).filter(k => k !== 'custom' && state.cdns[k]).length;
  count += (state.cdns.custom || []).length;

  const badge = document.getElementById('library-count-badge');
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop, .drawer-backdrop').forEach(el => el.classList.add('hidden'));
  const exportMenu = document.getElementById('export-menu');
  if (exportMenu) exportMenu.classList.add('hidden');
}
