/**
 * Central State Store & Event Dispatcher
 */

export const state = {
  projectId: 'default_craft',
  title: 'Untitled Craft',
  autoRun: true,
  layout: 'tabs', // 'tabs' is the default view mode
  activeTab: 'html',
  deviceWidth: '100%',
  theme: 'twilight',
  fontSize: 14,
  wordWrap: true,
  autocomplete: true,
  lineNumbers: true,
  cdns: {
    tailwind: false,
    react: false,
    bootstrap: false,
    threejs: false,
    gsap: false,
    chartjs: false,
    fontawesome: false,
    animatecss: false,
    jquery: false,
    custom: []
  },
  consoleLogs: [],
  consoleFilter: 'all',
  errorCount: 0
};

const listeners = new Map();

export function subscribe(event, callback) {
  if (!listeners.has(event)) {
    listeners.set(event, new Set());
  }
  listeners.get(event).add(callback);
  return () => listeners.get(event).delete(callback);
}

export function emit(event, data) {
  if (listeners.has(event)) {
    listeners.get(event).forEach(cb => cb(data));
  }
}
