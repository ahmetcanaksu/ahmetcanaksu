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

async function introScene() {
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let bottomLight: THREE.DirectionalLight;

  let panIn = false;

  setTimeout(() => {
    panIn = true;
  }, 8000);

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
    controls.screenSpacePanning = true;
    //controls.minDistance = 100;
    //controls.maxDistance = 500;
    //controls.maxPolarAngle = Math.PI / 2;
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

    //const dirLight1 = new THREE.DirectionalLight(0xffffff, 10);
    //dirLight1.position.set(0, 0, 0);
    //scene.add(dirLight1);

    bottomLight = new THREE.DirectionalLight(0xffffff, 10);
    bottomLight.position.set(1, 1, 1);
    scene.add(bottomLight);

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
    scene.fog = new THREE.Fog(0x304463, 0, 500);

    //const ambientLight = new THREE.AmbientLight(0x002288);
    //scene.add(ambientLight);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/audiomass-output.mp3", function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(false);
      sound.setVolume(0.5);
      sound.play();
    });

    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  let camera_rotation_speed = 0.0001;

  //cube.position.z = Math.sin(time * 0.001) * 2;
  function animate(time: DOMHighResTimeStamp) {
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    //camera.position.y = Math.sin(time * 0.001) * 200;

    //camera_rotation_speed += 0.0001;

    if (panIn) {
      camera_rotation_speed = 0.0003;
      camera.position.y -= time * 0.001;
    }

    if (camera.position.y < 20) {
    }

    if (camera.position.y < 20) {
      scene.fog = new THREE.Fog(0x00fff, 1, 0);
      bottomLight.intensity = 0;
      bottomLight.color = new THREE.Color(0x000);
    }

    camera.rotation.z += time * camera_rotation_speed;
    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
}

//introScene();

async function mainScene() {
  //Create h1

  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.display = "flex";
  div.style.justifyContent = "center";
  div.style.flexDirection = "column";
  div.style.alignItems = "center";

  document.body.appendChild(div);

  const h1 = document.createElement("h1");
  h1.innerText = "Start the experience";
  h1.style["textAlign"] = "center";
  div.appendChild(h1);

  //Create button
  const button = document.createElement("button");
  button.style.display = "block";
  button.innerText = "Start";

  button.onclick = () => {
    div.remove();
    introScene();
  };

  div.appendChild(button);

  //warn user about use of audio
  const audioWarning = document.createElement("p");
  audioWarning.innerText = "Works best with headphones, audio will play";
  audioWarning.style["textAlign"] = "center";
  audioWarning.style["marginTop"] = "20px";
  //add backgorund color and rounded corners
  audioWarning.style["backgroundColor"] = "#f4f4f4";
  audioWarning.style["padding"] = "10px";
  audioWarning.style["borderRadius"] = "10px";
  audioWarning.style["boxShadow"] = "0 0 10px rgba(0,0,0,0.1)";
  audioWarning.style["color"] = "#333";
  div.appendChild(audioWarning);
}

mainScene();