// Enums for rotation models

let VIEWS = {
  FRONT: 0,
  BACK: 1,
  RIGHT: 2,
  LEFT: 3,
  TOP: 4,
  BOTTOM: 5
};

function loadModel(path, scene, controls, camera) {
  const len = scene.children.length;
  for (let i = len - 1; i > 0; i--) scene.remove(scene.children[i]);

  const loadingManager = new THREE.LoadingManager(() => {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.classList.add("fade-out");
    loadingScreen.addEventListener("transitionend", onTransitionEnd);
  });

  const loader = new THREE.GLTF2Loader(loadingManager);

  loader.load(
    path,
    gltf => {
      if (gltf.animations && gltf.animations.length > 0) {
        const animations = gltf.animations;
        this._mixer = new THREE.AnimationMixer(gltf.scene);

        for (var i = 0; i < animations.length; i++) {
          var animation = animations[i];
          this._mixer.clipAction(animation).play();
        }
      }

      // camara config
      gltf.scene.updateMatrixWorld();
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
      controls.reset();
      gltf.scene.position.x += gltf.scene.position.x - center.x;
      gltf.scene.position.y += gltf.scene.position.y - center.y;
      gltf.scene.position.z += gltf.scene.position.z - center.z;
      controls.maxDistance = size * 10;
      camera.near = size / 100;
      camera.far = size * 100;
      camera.updateProjectionMatrix();

      camera.position.copy(center);
      camera.position.x += size / 2.0;
      camera.position.y += size / 5.0;
      camera.position.z += size / 2.0;
      camera.lookAt(center);

      controls.saveState();

      // Add model
      scene.add(gltf.scene);
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
}
// Main object
var robox = (function() {
  const fov = 60;
  const width = document.getElementById("canvas-container").clientWidth;
  const height = document.getElementById("canvas-container").clientWidth;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    premultipliedAlpha: false
  });
  renderer.setSize(width, height);
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Axis Renderer
  const rendererAxis = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    premultipliedAlpha: false
  });
  /*rendererAxis.setSize(80, 80);
  rendererAxis.setClearColor(0xd4d4bf, 1);*/
  const helper = new THREE.AxesHelper(2);
  // Axis Scene.
  const sceneAxis = new THREE.Scene();
  sceneAxis.add(helper);
  // Axis Camera
  const cameraAxis = new THREE.PerspectiveCamera(
    fov,
    width / height,
    0.1,
    1000
  );
  cameraAxis.up = camera.up;
  //cameraAxis.position = new THREE.Vector3(3, 0, 2);
  cameraAxis.position.set(0, 0, 6);
  // cubes as buttons
  addCubesToAxisScene(sceneAxis);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  // ambientLight.position.set(0, 1, 0);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0.5, 0, 0.866);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = false;
  controls.autoRotateSpeed = -10;
  controls.screenSpacePanning = true;

  return {
    getScene: function() {
      return scene;
    },
    getCamera: function() {
      return camera;
    },
    getRenderer: function() {
      return renderer;
    },
    getControls: function() {
      return controls;
    },
    configCamera: function() {
      camera.add(ambientLight);
      camera.add(directionalLight);
      //scene.add(hemiLight);
      scene.add(camera);

      sceneAxis.add(cameraAxis);
    },

    // Render axis gizmo
    getAxisRenderer: function() {
      return rendererAxis;
    },
    getAxisScene: function() {
      return sceneAxis;
    },
    getAxisCamera: function() {
      return cameraAxis;
    },

    setRendererSize: function(width, height) {
      rendererAxis.setSize(width, height);
    }
  };
})();

function onTransitionEnd(event) {
  const element = event.target;
  element.remove();
  const container = createMainContainer();
  container.appendChild(robox.getRenderer().domElement);
  createGizmoContainer();
}

function createCube(color) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color
  });
  const mesh = new THREE.Mesh(geometry, material);
  const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xababab,
    linewidth: 2.5
  });
  const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  return mesh.add(edgesMesh);
}

function addCubesToAxisScene(scene) {
  const rightRedCube = createCube(0x9c4c4c);
  rightRedCube.position.x += 1;
  rightRedCube.userData = { command: VIEWS.RIGHT };
  const leftRedCube = createCube(0x926d6d);
  leftRedCube.position.x -= 1;
  leftRedCube.userData = { command: VIEWS.LEFT };

  const frontBlueCube = createCube(0x0000ff);
  frontBlueCube.position.z += 1;
  frontBlueCube.userData = { command: VIEWS.FRONT };

  const backBlueCube = createCube(0x4c74c5);
  backBlueCube.position.z -= 1;
  backBlueCube.userData = { command: VIEWS.BACK };

  const topGreenCube = createCube(0x00ff00);
  topGreenCube.position.y += 1;
  topGreenCube.userData = { command: VIEWS.TOP };

  const bottomGreenCube = createCube(0xc6f5c6);
  bottomGreenCube.position.y -= 1;
  bottomGreenCube.userData = { command: VIEWS.BOTTOM };

  scene.add(
    rightRedCube,
    leftRedCube,
    frontBlueCube,
    backBlueCube,
    topGreenCube,
    bottomGreenCube
  );
}

function createMainContainer() {
  const parentNode = document.getElementById("canvas-container");
  const mainContainer = document.createElement("div");
  mainContainer.id = "model-view";
  mainContainer.style.width = parentNode.clientWidth;
  mainContainer.style.height = parentNode.clientHeight;
  parentNode.appendChild(mainContainer);
  return mainContainer;
}

function createGizmoContainer() {
  const parentNode = document.getElementById("canvas-container");
  const gizmoContainer = document.createElement("div");
  const mainContainer = document.getElementById("model-view");
  const top = parentNode.clientHeight - mainContainer.clientHeight;
  const right = parentNode.clientWidth - mainContainer.clientWidth;
  const mainRect = mainContainer.getBoundingClientRect();
  gizmoContainer.id = "gizmo";
  gizmoContainer.style.position = "absolute";
  gizmoContainer.style.width = "20%";
  gizmoContainer.style.height = "20%";
  gizmoContainer.style.margin = "5px";
  gizmoContainer.style.right = `${right.toString()}px`;
  gizmoContainer.style.top = `${top.toString()}px`;
  parentNode.appendChild(gizmoContainer);
  const gizmoRect = gizmoContainer.getBoundingClientRect();
  robox.setRendererSize(gizmoRect.width, gizmoRect.height);
  gizmoContainer.appendChild(robox.getAxisRenderer().domElement);
}
