// Toggle Night Mode with Local Storage Persistence
const nightModeSwitch = document.getElementById('night-mode-switch');
const nightModeIcon = nightModeSwitch.querySelector('i');
const isNightMode = localStorage.getItem('nightMode') === 'enabled';

if (isNightMode) {
    document.body.classList.add('dark-mode');
    nightModeIcon.classList.remove('fa-moon');
    nightModeIcon.classList.add('fa-sun');
}

nightModeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isEnabled = document.body.classList.contains('dark-mode');

    // Change icon based on the mode
    if (isEnabled) {
        nightModeIcon.classList.remove('fa-moon');
        nightModeIcon.classList.add('fa-sun');
        localStorage.setItem('nightMode', 'enabled');
    } else {
        nightModeIcon.classList.remove('fa-sun');
        nightModeIcon.classList.add('fa-moon');
        localStorage.setItem('nightMode', 'disabled');
    }
});

// Initialize AOS for scroll animations
AOS.init({
    duration: 1000,
    once: true
});

// WebGL Background Effects
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-background'),
    alpha: true,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add objects to the scene
const geometry = new THREE.IcosahedronGeometry(10, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    wireframe: true,
    emissive: 0x0,
    metalness: 0.5,
    roughness: 0.1,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);

// Camera position
camera.position.z = 30;

// Animation function
let lastFrameTime = Date.now();
function animate() {
    requestAnimationFrame(animate);

    const now = Date.now();
    const delta = now - lastFrameTime;
    
    if (delta > 16) {
        lastFrameTime = now;

        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;

        renderer.render(scene, camera);
    }
}

animate();

// Handle window resize for responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }, 100);
});
