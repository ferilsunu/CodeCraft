/**
 * Starter Templates Blueprints
 */

export const TEMPLATES = {
  'tailwind-card': {
    title: 'Neon Glassmorphic Card',
    cdns: { tailwind: true, fontawesome: true },
    html: `<div class="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white font-sans">
  <div class="relative group">
    <!-- Neon Glow Background -->
    <div class="absolute -inset-1 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
    
    <!-- Frosted Card -->
    <div class="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">Pro Feature</span>
        <i class="fa-solid fa-bolt text-amber-400"></i>
      </div>
      
      <h3 class="text-2xl font-bold tracking-tight text-white">CodeCraft Studio</h3>
      <p class="text-slate-400 text-sm leading-relaxed">
        Ultra-fast in-browser IDE with live preview, virtual console, Prettier formatter, and zero configuration.
      </p>

      <div class="pt-2 flex items-center justify-between">
        <button id="btn-glow" class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm rounded-xl transition duration-200 shadow-lg shadow-amber-500/25 active:scale-95">
          Get Started
        </button>
        <span class="text-xs text-slate-500 font-mono">v2.0 Ready</span>
      </div>
    </div>
  </div>
</div>`,
    css: `/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

.group {
  animation: float 4s ease-in-out infinite;
}`,
    js: `// Button click handler
document.getElementById('btn-glow').addEventListener('click', () => {
  console.log('✨ Neon button clicked! Launching CodeCraft experiment...');
  alert('Welcome to CodeCraft 2.0!');
});`
  },

  'react-counter': {
    title: 'React 18 Interactive Counter',
    cdns: { react: true, tailwind: true },
    html: `<div id="root"></div>`,
    css: `body {
  margin: 0;
  background-color: #0b0f17;
  font-family: system-ui, -apple-system, sans-serif;
}`,
    js: `// React 18 Counter Demo
const { useState } = React;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="bg-slate-800/80 border border-slate-700/60 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full backdrop-blur-md">
        <div className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">React 18 Hooks</div>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 my-4 font-mono">
          {count}
        </h1>
        <p className="text-slate-400 text-sm mb-6">State preserved in real-time</p>
        
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => { setCount(c => c - 1); console.log('Decremented:', count - 1); }}
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-lg active:scale-95 transition"
          >
            -
          </button>
          <button 
            onClick={() => { setCount(0); console.log('Reset counter'); }}
            className="px-4 py-2.5 bg-slate-700/40 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 transition"
          >
            Reset
          </button>
          <button 
            onClick={() => { setCount(c => c + 1); console.log('Incremented:', count + 1); }}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold text-lg active:scale-95 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`
  },

  'threejs-cube': {
    title: 'Rotating 3D Neon Cube',
    cdns: { threejs: true },
    html: `<div id="canvas-container"></div>
<div class="overlay">
  <h2>Three.js WebGL Engine</h2>
  <p>Move mouse to adjust orbit perspective</p>
</div>`,
    css: `body {
  margin: 0;
  overflow: hidden;
  background-color: #030712;
  font-family: sans-serif;
}
#canvas-container {
  width: 100vw;
  height: 100vh;
}
.overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #fff;
  pointer-events: none;
}
.overlay h2 { margin: 0; font-size: 18px; color: #a855f7; }
.overlay p { margin: 4px 0 0; font-size: 12px; color: #9ca3af; }`,
    js: `// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Glowing Wireframe Cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshStandardMaterial({ 
  color: 0x9333ea,
  wireframe: true,
  emissive: 0x6b21a8,
  emissiveIntensity: 0.8
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights
const pointLight = new THREE.PointLight(0x38bdf8, 2, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

camera.position.z = 4;

console.log('🚀 Three.js WebGL Scene initialized successfully!');

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.015;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});`
  },

  'canvas-particles': {
    title: 'Interactive Particle Physics',
    cdns: {},
    html: `<canvas id="canvas"></canvas>
<div class="instructions">Move mouse over the canvas to attract particles</div>`,
    css: `body {
  margin: 0;
  overflow: hidden;
  background: #090d16;
  font-family: sans-serif;
}
canvas {
  display: block;
}
.instructions {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #f59e0b;
  font-size: 13px;
  background: rgba(0,0,0,0.6);
  padding: 6px 14px;
  border-radius: 20px;
  pointer-events: none;
}`,
    js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const mouse = { x: null, y: null, radius: 120 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.5 + 1;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = (Math.random() - 0.5) * 1.5;
    this.color = '#fbbf24';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;

    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        this.x += dx * 0.03;
        this.y += dy * 0.03;
      }
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 80 }, () => new Particle());

function animate() {
  ctx.fillStyle = 'rgba(9, 13, 22, 0.2)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = \`rgba(251, 191, 36, \${1 - dist / 100})\`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});`
  },

  'blank': {
    title: 'Minimal Starter',
    cdns: {},
    html: `<div class="container">
  <h1>Hello from CodeCraft! 🚀</h1>
  <p>Start writing HTML, CSS, and JavaScript with instant live preview.</p>
</div>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  text-align: center;
}

.container {
  padding: 2rem;
  background: #1e293b;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

h1 {
  margin-top: 0;
  color: #f59e0b;
}`,
    js: `console.log('Craft loaded smoothly!');`
  }
};
