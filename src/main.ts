import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import concreteFloor from "/concreteFloor.jpg";
import * as THREE from "three";
import {
  color,
  float,
  fog,
  normalWorld,
  positionView,
  positionWorld,
  triNoise3D,
  uniform,
} from "three/tsl";

async function main() {
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;

  let panIn = false;

  setTimeout(() => {
    panIn = true;
  }, 2000);

  init();

  function init() {
    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 400, 0);

    //make camera look at the center
    camera.lookAt(0, 0, 0);

    //controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.maxPolarAngle = Math.PI / 2;
    //

    //world
    //const geometry = new THREE.BoxGeometry(1, 1, 1);
    //const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    //const cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    const geometry = new THREE.BoxGeometry(10, 100, 10);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    // custom fog

    const skyColor = color(0xf0f5f5);
    const groundColor = color(0xd0dee7);

    const fogNoiseDistance = positionView.z
      .negate()
      .smoothstep(0, camera.far - 300);

    const distance = fogNoiseDistance.mul(20).max(4);
    const alpha = 0.98;
    const groundFogArea = float(distance)
      .sub(positionWorld.y)
      .div(distance)
      .pow(3)
      .saturate()
      .mul(alpha);

    // a alternative way to create a TimerNode
    const timer = uniform(0).onFrameUpdate((frame) => frame.time);
    const fogNoiseA = triNoise3D(positionWorld.mul(0.005), 0.2, timer);
    const fogNoiseB = triNoise3D(positionWorld.mul(0.01), 0.2, timer.mul(1.2));
    const fogNoise = fogNoiseA.add(fogNoiseB).mul(groundColor);

    // apply custom fog

    scene.fogNode = fog(
      fogNoiseDistance.oneMinus().mix(groundColor, fogNoise),
      groundFogArea
    );
    scene.backgroundNode = normalWorld.y.max(0).mix(groundColor, skyColor);

    // builds

    //load texture for the ground
    material.map = new THREE.TextureLoader().load(concreteFloor);

    for (let i = 0; i < 1200; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = Math.random() * 1000 - 500;
      mesh.position.y = 0;
      mesh.position.z = Math.random() * 1000 - 500;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);
    }

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 10);
    dirLight1.position.set(0, 0, 0);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight2.position.set(1, 1, 1);
    scene.add(dirLight2);

    // ground

    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000,
    });

    const ground = new THREE.Mesh(planeGeometry, planeMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.scale.multiplyScalar(3);
    ground.castShadow = true;
    ground.receiveShadow = true;
    scene.add(ground);

    //add fog
    scene.fog = new THREE.Fog(0x00FFF, 0, 800);

    //const ambientLight = new THREE.AmbientLight(0x002288);
    //scene.add(ambientLight);

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  let camera_rotation_speed = 0.0001;

  function animate(time: DOMHighResTimeStamp) {
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    //cube.position.z = Math.sin(time * 0.001) * 2;

    //camera.position.y = Math.sin(time * 0.001) * 200;

    //camera_rotation_speed += 0.0001;
    
    if (panIn) {
      camera_rotation_speed = 0.0003;
      camera.position.y -= time * 0.001;
    }
    
    camera.rotation.z += time * camera_rotation_speed;
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
}

main();
