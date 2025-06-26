import * as THREE from 'https://cdn.skypack.dev/three';

const uploadBtn = document.getElementById('uploadBtn');
const uploadInput = document.getElementById('upload');
const viewer = document.getElementById('viewer');

// Trigger file input on button click
uploadBtn.addEventListener('click', () => {
  uploadInput.click();
});

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  console.log('File uploaded:', file.name);

  document.querySelector('.upload-container').style.display = 'none';
  viewer.style.display = 'block';

  initViewer();
});

function initViewer() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas: viewer });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(light);

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x1976d2 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
}
