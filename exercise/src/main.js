import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const btnZoomIn = document.querySelector(".btn-zoomin");
const btnZoomOut = document.querySelector(".btn-zoomout");

let cameraPosition = 3;

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const size = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  1,
  1000
);
camera.position.z = cameraPosition;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(size.width, size.height);

function animate(time) {
  // time is in milliseconds
  const seconds = time * 0.001;

  // Make the cube rotate slowly
  mesh.rotation.x = seconds;
  mesh.rotation.y = seconds;

  // Make it move up and down
  mesh.position.y = Math.sin(seconds) * 0.5;

  // Render the updated frame
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
}

// Initialize animation
requestAnimationFrame(animate);

btnZoomOut.addEventListener("click", () => {
  cameraPosition++;
  camera.position.z = cameraPosition;
});

btnZoomIn.addEventListener("click", () => {
  cameraPosition--;
  camera.position.z = cameraPosition;
});
