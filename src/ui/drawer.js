/**
 * Saved Projects Drawer Controller
 */

import { state } from '../core/state.js';
import { getAllSavedProjects, saveActiveProject, applyProjectData } from '../modules/storage.js';
import { closeAllModals } from './modals.js';
import { showToast } from './toast.js';

export function initDrawer() {
  const btnProjects = document.getElementById('btn-projects');
  const btnSaveNew = document.getElementById('btn-save-new-project');

  if (btnProjects) {
    btnProjects.addEventListener('click', () => {
      renderSavedProjectsList();
      document.getElementById('drawer-projects').classList.remove('hidden');
    });
  }

  if (btnSaveNew) {
    btnSaveNew.addEventListener('click', () => {
      state.projectId = 'craft_' + Date.now();
      saveActiveProject();
      renderSavedProjectsList();
      showToast('Saved current code as new snippet!', 'success');
    });
  }
}

export function renderSavedProjectsList() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  const projects = getAllSavedProjects();

  if (projects.length === 0) {
    container.innerHTML = `<div class="console-empty-msg">No saved projects yet. Click above to save one!</div>`;
    return;
  }

  container.innerHTML = projects.map(p => `
    <div class="project-card" data-id="${p.id}">
      <div class="project-card-info">
        <span class="project-card-title">${escapeHTML(p.title)}</span>
        <span class="project-card-date">${new Date(p.updatedAt).toLocaleDateString()} ${new Date(p.updatedAt).toLocaleTimeString()}</span>
      </div>
      <div class="project-card-actions">
        <button class="btn-mini btn-load-proj" data-id="${p.id}" title="Open Snippet">
          <i data-lucide="folder-open"></i>
        </button>
        <button class="btn-mini btn-delete-proj text-rose" data-id="${p.id}" title="Delete">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();

  container.querySelectorAll('.btn-load-proj').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const proj = projects.find(p => p.id === id);
      if (proj) {
        applyProjectData(proj);
        closeAllModals();
        showToast(`Opened "${proj.title}"`, 'success');
      }
    });
  });

  container.querySelectorAll('.btn-delete-proj').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this saved project?')) {
        const updated = projects.filter(p => p.id !== id);
        localStorage.setItem('codecraft_all_projects', JSON.stringify(updated));
        renderSavedProjectsList();
        showToast('Project deleted', 'info');
      }
    });
  });
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
