/**
 * Split Panes & Workspace Layout Manager
 */

import { state } from './state.js';
import { resizeEditors } from './editor.js';

let splitMain = null;
let splitEditors = null;

export function initLayout() {
  destroySplits();

  const container = document.getElementById('workspace-container');
  const tabsBar = document.getElementById('editor-tabs-bar');
  const panelHtml = document.getElementById('panel-html');
  const panelCss = document.getElementById('panel-css');
  const panelJs = document.getElementById('panel-js');

  if (state.layout === 'columns') {
    container.className = '';
    tabsBar.classList.add('hidden');
    [panelHtml, panelCss, panelJs].forEach(p => {
      p.style.display = 'flex';
      p.style.width = '';
      p.style.height = '';
    });

    if (window.Split) {
      splitMain = window.Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [250, 250],
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeEditors
      });

      splitEditors = window.Split(['#panel-html', '#panel-css', '#panel-js'], {
        sizes: [33.33, 33.33, 33.33],
        minSize: 80,
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeEditors
      });
    }
  } else if (state.layout === 'rows') {
    container.className = 'layout-rows';
    tabsBar.classList.add('hidden');
    [panelHtml, panelCss, panelJs].forEach(p => {
      p.style.display = 'flex';
      p.style.width = '';
      p.style.height = '';
    });

    if (window.Split) {
      splitMain = window.Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [180, 180],
        gutterSize: 6,
        direction: 'vertical',
        onDragEnd: resizeEditors
      });

      splitEditors = window.Split(['#panel-html', '#panel-css', '#panel-js'], {
        sizes: [33.33, 33.33, 33.33],
        minSize: 80,
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeEditors
      });
    }
  } else if (state.layout === 'tabs') {
    container.className = '';
    tabsBar.classList.remove('hidden');

    if (window.Split) {
      splitMain = window.Split(['#editors-pane', '#preview-pane'], {
        sizes: [50, 50],
        minSize: [250, 250],
        gutterSize: 6,
        direction: 'horizontal',
        onDragEnd: resizeEditors
      });
    }

    switchTab(state.activeTab);
  }

  resizeEditors();
}

export function destroySplits() {
  if (splitMain) {
    splitMain.destroy();
    splitMain = null;
  }
  if (splitEditors) {
    splitEditors.destroy();
    splitEditors = null;
  }
}

export function switchTab(tabKey) {
  state.activeTab = tabKey;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-editor') === tabKey);
  });

  const panelHtml = document.getElementById('panel-html');
  const panelCss = document.getElementById('panel-css');
  const panelJs = document.getElementById('panel-js');

  panelHtml.style.display = tabKey === 'html' ? 'flex' : 'none';
  panelCss.style.display = tabKey === 'css' ? 'flex' : 'none';
  panelJs.style.display = tabKey === 'js' ? 'flex' : 'none';

  panelHtml.style.width = tabKey === 'html' ? '100%' : '0%';
  panelCss.style.width = tabKey === 'css' ? '100%' : '0%';
  panelJs.style.width = tabKey === 'js' ? '100%' : '0%';

  resizeEditors();
}
