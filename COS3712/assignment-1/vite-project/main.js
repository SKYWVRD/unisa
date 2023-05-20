import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const rotateButton = document.getElementById("enableRotation");
const reverseButton = document.getElementById("reverseRotation");
const speedSlider = document.getElementById("rotationSpeed");
const zoomSlider = document.getElementById('zoomDistance');

rotateButton.addEventListener("click", enableRotation);
reverseButton.addEventListener("click", reverseRotation);
speedSlider.addEventListener("input", changeRotationSpeed)
zoomSlider.addEventListener("input", changeZoomDistance)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);

camera.position.setY(15);
camera.position.setX(15);
camera.position.setZ(30);

renderer.render(scene, camera);

//General Location Information

const floorLevel = 5;

//Ground Location Information

//Ground geometry information

const geometryground = new THREE.PlaneGeometry(50, 50);
const materialGround = new THREE.MeshStandardMaterial({ color: 0x31cf11 });
const ground = new THREE.Mesh(geometryground, materialGround);

scene.add(ground);
ground.rotation.x = -(Math.PI / 2);

//Barn location Information

const barnX = -15;
const barnBuildingY = floorLevel;
const barnZ = -10;

//Barn Geometry Application

const geometryRoof = new THREE.CylinderGeometry(4, 4, 10, 3);
const materialRoof = new THREE.MeshStandardMaterial({ color: 0xb4642d });
const roof = new THREE.Mesh(geometryRoof, materialRoof);

const geometryBuilding = new THREE.BoxGeometry(7, 8, 10);
const materialBuilding = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const building = new THREE.Mesh(geometryBuilding, materialBuilding);

scene.add(roof);
scene.add(building);

roof.position.setX(barnX);
roof.position.setY(barnBuildingY + 6);
roof.position.setZ(barnZ);
roof.rotation.x = -(Math.PI / 2);

building.position.setY(barnBuildingY);
building.position.setX(barnX);
building.position.setZ(barnZ);

// Pond Information

const pondColor = 0x26b7d8;
const pondShoreColor = 0xb44e09;
const pondX = (-12.5);
const pondZ = (12.5);

// Pond geometry

const geometryPond = new THREE.CylinderGeometry(7, 7, 0.5, 20);
const materialPond = new THREE.MeshStandardMaterial({ color: pondColor });
const pond = new THREE.Mesh(geometryPond, materialPond);

const geometryPondShore = new THREE.CylinderGeometry(7.5, 7.5, 0.4, 20);
const materialPondShore = new THREE.MeshBasicMaterial({ color: pondShoreColor });
const pondShore = new THREE.Mesh(geometryPondShore, materialPondShore);

scene.add(pond);
scene.add(pondShore);

pond.position.setX(pondX);
pond.position.setZ(pondZ);
pondShore.position.setX(pondX);
pondShore.position.setZ(pondZ);

// Water Tower Information

const geometryWaterTower = new THREE.CylinderGeometry(4, 4, 10, 20);
const materialWaterTower = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const waterTower = new THREE.Mesh(geometryWaterTower, materialWaterTower);

scene.add(waterTower);

// Water Tower Geometry

const waterTowerY = floorLevel;
waterTower.position.setY(waterTowerY);
waterTower.position.setX(-barnX);
waterTower.position.setZ(barnZ);

//Light information

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(12.5, 15, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
// scene.add(pointLight);
// scene.add(new THREE.GridHelper(50, 50));

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = 1;
controls.minPolarAngle = 1;
// controls.autoRotate = true

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function enableRotation() {
  controls.autoRotate = !controls.autoRotate;
}

function reverseRotation() {
  controls.autoRotateSpeed *= -1;
}

function changeRotationSpeed() {
  controls.autoRotateSpeed < 0 ? (controls.autoRotateSpeed = speedSlider.value * -1) : (controls.autoRotateSpeed = speedSlider.value);
}

function changeZoomDistance() {
  controls.maxDistance = zoomSlider.value;
  controls.minDistance = zoomSlider.value;
}

function randomLocation() {
  return Math.floor(Math.random() * (24 - 1 + 1) + 0);
}

function generateForest(treeCount) {
  // Tree Information
  const leafColor = 0x049934;
  // Tree Geometry

  for (let i = 0; i < treeCount; ++i) {
    let randomX = randomLocation();
    let randomZ = randomLocation();

    const geometryTree = new THREE.CylinderGeometry(0.5, 0.5, 3, 20);
    const materialTree = new THREE.MeshStandardMaterial({ color: 0xb44e09 });
    const tree = new THREE.Mesh(geometryTree, materialTree);

    const geometryLeavesBottom = new THREE.ConeGeometry(1.5, 4, 32);
    const materialLeavesBottom = new THREE.MeshStandardMaterial({
      color: leafColor,
    });
    const leavesBottom = new THREE.Mesh(
      geometryLeavesBottom,
      materialLeavesBottom
    );

    const geometryLeavesMiddle = new THREE.ConeGeometry(1.5, 3.5, 32);
    const materialLeavesMiddle = new THREE.MeshStandardMaterial({
      color: leafColor,
    });
    const leavesMiddle = new THREE.Mesh(
      geometryLeavesMiddle,
      materialLeavesMiddle
    );

    const geometryLeavesTop = new THREE.ConeGeometry(1.5, 3.0, 32);
    const materialLeavesTop = new THREE.MeshStandardMaterial({ color: leafColor });
    const leavesTop = new THREE.Mesh(geometryLeavesTop, materialLeavesTop);

    scene.add(tree);
    scene.add(leavesBottom);
    scene.add(leavesMiddle);
    scene.add(leavesTop);

    tree.position.setY(1.5);
    tree.position.setX(randomX);
    tree.position.setZ(randomZ);

    leavesBottom.position.setY(5);
    leavesBottom.position.setX(randomX);
    leavesBottom.position.setZ(randomZ);

    leavesMiddle.position.setY(5.5);
    leavesMiddle.position.setX(randomX);
    leavesMiddle.position.setZ(randomZ);

    leavesTop.position.setY(6);
    leavesTop.position.setX(randomX);
    leavesTop.position.setZ(randomZ);
  }
}

generateForest(15);
animate();
