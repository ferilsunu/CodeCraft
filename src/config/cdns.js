/**
 * External CDN packages catalog and definitions
 */

export const CDN_DEFS = {
  tailwind: { type: 'js', url: 'https://cdn.tailwindcss.com' },
  react: [
    { type: 'js', url: 'https://unpkg.com/react@18/umd/react.development.js' },
    { type: 'js', url: 'https://unpkg.com/react-dom@18/umd/react-dom.development.js' },
    { type: 'js', url: 'https://unpkg.com/@babel/standalone/babel.min.js' }
  ],
  bootstrap: [
    { type: 'css', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
    { type: 'js', url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js' }
  ],
  threejs: { type: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' },
  gsap: { type: 'js', url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js' },
  chartjs: { type: 'js', url: 'https://cdn.jsdelivr.net/npm/chart.js' },
  fontawesome: { type: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' },
  animatecss: { type: 'css', url: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
  jquery: { type: 'js', url: 'https://code.jquery.com/jquery-3.7.1.min.js' }
};
