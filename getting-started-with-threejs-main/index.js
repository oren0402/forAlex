// Import Three.js library if using a module (optional)
import * as THREE from 'three';
import {GLTFLoader} from "https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js"

let model;
function loadModel(url, position, rotation) {
    const loader = new GLTFLoader();
    loader.load(url, function (glb) {
        model = glb.scene;
        model.scale.set(200,200,200);
        model.position.set(position[0], position[1], position[2]);
        model.rotation.set(rotation[0], rotation[1], rotation[2]);
        console.log(model);
        scene.add(model);
    });
}
function movePlayer() {
    model.position.x += 0.01;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground (Repeating Texture)

const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('./ground.png');
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(3, 10);

const groundGeometry = new THREE.PlaneGeometry(10, 50);
const groundMaterial = new THREE.MeshStandardMaterial({ map: groundTexture });
const me1 = new THREE.MeshStandardMaterial({
    map: groundTexture,
});
const ground = new THREE.Mesh(groundGeometry, me1);
ground.rotation.x = -Math.PI / 2; // Rotate to make it vertical
ground.position.set(0, 0, -10);
scene.add(ground);

// Obstacles
const obstacleGeometry = new THREE.BoxGeometry(1, 2, 1);
loadModel('./assest/playerModel.glb', [0, 3.5, 0], [0, 0, 0]);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const obstacles = [];
for (let i = 0; i < 5; i++) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set((Math.random() - 0.5) * 6, 1, -5 - i * 5);
    scene.add(obstacle);
    obstacles.push(obstacle);
}

// Buildings
const buildingGeometry = new THREE.BoxGeometry(2, 6, 2);
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
for (let i = 0; i < 10; i++) {
    const leftBuilding = new THREE.Mesh(buildingGeometry, buildingMaterial);
    leftBuilding.position.set(-4, 3, -10 - i * 20);
    scene.add(leftBuilding);

    const rightBuilding = new THREE.Mesh(buildingGeometry, buildingMaterial);
    rightBuilding.position.set(4, 3, -10 - i * 20);
    scene.add(rightBuilding);
}

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 0);
scene.add(directionalLight);

// Camera Position
camera.position.set(0, 8, 5);
camera.rotation.x = -0.4;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    movePlayer();
    // Move ground texture
    groundTexture.offset.y += 0.02;
    // Move obstacles
    obstacles.forEach(obstacle => {
        obstacle.position.z += 0.1;
        if (obstacle.position.z > 5) {
            obstacle.position.z = -20; // Reset position
            obstacle.position.x = (Math.random() - 0.5) * 6; // Randomize lane
        }
    });

    // Render the scene
    renderer.render(scene, camera);
}

animate();
