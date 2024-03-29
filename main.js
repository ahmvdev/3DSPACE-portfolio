import './style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


//new scene
const scene= new THREE.Scene();

//new camera (FOV, ASPECT RATIO AND RANGE TO SHOW)
const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//renderer for canvas
const renderer = new THREE.WebGLRenderer(
  {
    canvas:document.querySelector('#bg'),
  }
);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

//Tetrahedron shape making
const octaVideo = document.getElementById('bg-video3');
const octaTexture = new THREE.VideoTexture(octaVideo);
const geometry = new THREE.TetrahedronGeometry(5, 0, 100)
const material = new THREE.MeshBasicMaterial({map: octaTexture});
const octahedron = new THREE.Mesh(geometry, material);
octahedron.position.set(6,0,5);
scene.add(octahedron);

//octahedron
const torusVideo = document.getElementById('bg-video2');
const torusTexture = new THREE.VideoTexture(torusVideo);
const torusGeometry = new THREE.OctahedronGeometry(5,0);
const torusMaterial = new THREE.MeshBasicMaterial({map: torusTexture});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-6,0,16);
scene.add(torus);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);


//icosahedron
const moonVideo = document.getElementById('bg-video2');
const moonTexture = new THREE.VideoTexture(moonVideo);
const moonGeometry = new THREE.IcosahedronGeometry(4,0);
const moonMaterial = new THREE.MeshBasicMaterial({map: moonTexture});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.setZ(-10);
scene.add(moon);

//scroll functionality
camera.position.set(0, 0, 50); 

//function for scrolling
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    
    moon.rotation.y += 0.1;
    torus.rotation.y += 0.1;
    torus.rotation.x += 0.1;

    octahedron.rotation.y += 0.1;
    octahedron.rotation.x += 0.1;

    camera.position.z = Math.max(t * -0.01, 0.92);
    camera.position.x = Math.max(t * -0.0002, 0.0184);
    camera.position.y = Math.max(t * -0.0002, 0.0184);
}


document.body.onscroll = moveCamera;

moveCamera();


//adding stars
const controls = new OrbitControls(camera, renderer.domElement);
function addstar(){
  const geometry = new THREE.SphereGeometry(0.05, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(1500).fill().forEach(addstar);


//recursive function to animate, instead of doing it over n over again
function animate(){
  requestAnimationFrame(animate);
  //octahedron rotation values
  octahedron.rotation.x += 0.001;
  octahedron.rotation.y += 0.001;
  octahedron.rotation.z += 0.001;

  //torus rotation values
  torus.rotation.y += 0.001;
  torus.rotation.x += 0.001;

  //sphere rotation values
  moon.rotation.y += 0.001;

  ///changes for the ui
  controls.update();

  renderer.render(scene, camera);
}

animate();