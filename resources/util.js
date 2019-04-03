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
  const cameraDistance = 5;
  let mouse = new THREE.Vector2(-1, 1);
  let isMouseDown = false;
  const raycaster = new THREE.Raycaster();
  const fov = 50;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    premultipliedAlpha: false
  });
  //renderer.setSize(width, height);
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
  rendererAxis.setPixelRatio(window.devicePixelRatio);

  // Axis Scene.
  const sceneAxis = new THREE.Scene();
  // Axis Camera
  const cameraAxis = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 2000);
  cameraAxis.up = camera.up;
  //cameraAxis.position = new THREE.Vector3(3, 0, 2);
  cameraAxis.position.set(0, 0, cameraDistance);
  // cubes as buttons
  addCubesToAxisScene(sceneAxis);

  //Labels?
  /*const front = makeTextSprite("FRENTE");
  front.position.z += 1;

  sceneAxis.add(front);*/
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

    getCameraDistance: () => {
      return cameraDistance;
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

    getMouse: () => {
      return mouse;
    },

    renderGizmo: () => {
      cameraAxis.lookAt(new THREE.Vector3(0, 0, 0));
      raycaster.setFromCamera(mouse, cameraAxis);
      const intersects = raycaster.intersectObjects(sceneAxis.children);
      if (typeof intersects[0] !== "undefined" && isMouseDown) {
        executeCommand(intersects[0].object.userData.command);
      }

      cameraAxis.position.copy(camera.position);
      cameraAxis.position.setLength(cameraDistance);

      rendererAxis.render(sceneAxis, cameraAxis);
    },

    setRendererSize: function(width, height) {
      rendererAxis.setSize(width, height);
    },

    setAspectRatio: (width, height) => {
      console.log("ASPECT: ", width / height);
      camera.aspect = width / height;
      cameraAxis.aspect = width / height;
    },

    setXCoordinate: coordinate => {
      mouse.x = coordinate;
    },

    setYCoordinate: coordinate => {
      mouse.y = coordinate;
    },

    setMouseIsDown: click => {
      isMouseDown = click;
    }
  };
})();

function onTransitionEnd(event) {
  const element = event.target;
  element.remove();
  const container = createMainContainer();
  container.appendChild(robox.getRenderer().domElement);
  createGizmoContainer();
  const toolbar = document.getElementById("topbar-first");
  const top = toolbar.clientHeight;
  const btn = document.getElementById("close-btn");
  btn.style.top = `${top + 50}px`;
  btn.style.display = "block";
}

/*function createCloseButton() {
  const btn = document.createElement("button");
  btn.id = "btn-close-canvas";
  btn.innerHTML = "Return";
  btn.onclick = window.history.back();
  btn.style.zIndex = "1000000";
  btn.style.position = "absolute";
  btn.style.left = "0px";
  const top = toolbar.clientHeight;
  btn.style.top = `${top + 10}px`;
  return btn;
}*/

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

/*enum VIEWS = {
  FRONT: 0,
  BACK: 1,
  RIGHT: 2,
  LEFT: 3,
  TOP: 4,
  BOTTOM: 5
}; */

function addCubesToAxisScene(scene) {
  const rightRedCube = createCube(0x9c4c4c);
  rightRedCube.position.x += 1;
  rightRedCube.userData = { command: 2 };

  const leftRedCube = createCube(0x926d6d);
  leftRedCube.position.x -= 1;
  leftRedCube.userData = { command: 3 };

  const frontBlueCube = createCube(0x0000ff);
  frontBlueCube.position.z += 1;
  frontBlueCube.userData = { command: 0 };

  const backBlueCube = createCube(0x4c74c5);
  backBlueCube.position.z -= 1;
  backBlueCube.userData = { command: 1 };

  const topGreenCube = createCube(0x00ff00);
  topGreenCube.position.y += 1;
  topGreenCube.userData = { command: 4 };

  const bottomGreenCube = createCube(0xc6f5c6);
  bottomGreenCube.position.y -= 1;
  bottomGreenCube.userData = { command: 5 };

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
  console.log(parentNode.clientWidth, parentNode.clientHeight);
  robox.getRenderer().setSize(parentNode.clientWidth, parentNode.clientHeight);
  return mainContainer;
}

function createGizmoContainer() {
  const parentNode = document.getElementById("canvas-container");
  const gizmoContainer = document.createElement("div");
  const mainContainer = document.getElementById("model-view");
  const toolbar = document.getElementById("topbar-first");

  const top = toolbar.clientHeight;
  //const right = parentNode.clientWidth - mainContainer.clientWidth;
  gizmoContainer.id = "gizmo";
  gizmoContainer.style.position = "absolute";
  gizmoContainer.style.width = "20%";
  gizmoContainer.style.height = "20%";
  gizmoContainer.style.margin = "5px";
  gizmoContainer.style.right = `0px`;
  gizmoContainer.style.top = `${top + 10}px`;
  const mouseMove = gizmoMouseMove(gizmoContainer);
  const touchStart = onTouchStart(gizmoContainer);
  const touchMove = gizmoTouchMove(gizmoContainer);
  gizmoContainer.addEventListener("mousemove", mouseMove);
  gizmoContainer.addEventListener("mousedown", onMouseDown());
  gizmoContainer.addEventListener("mouseup", onMouseUp());
  gizmoContainer.addEventListener("touchmove", touchMove);
  gizmoContainer.addEventListener("touchstart", touchStart);
  gizmoContainer.addEventListener("touchend", onTouchEnd());
  parentNode.appendChild(gizmoContainer);
  robox.setRendererSize(
    gizmoContainer.clientWidth,
    gizmoContainer.clientHeight
  );
  const gizmoRenderer = robox.getAxisRenderer();
  gizmoRenderer.setSize(
    gizmoContainer.clientWidth,
    gizmoContainer.clientHeight
  );
  gizmoContainer.appendChild(gizmoRenderer.domElement);
}

function executeCommand(command) {
  // reset position
  const gizmoCamera = robox.getAxisCamera();
  const cameraDistance = robox.getCameraDistance();
  const sceneCamera = robox.getCamera();
  // Reset the mouse
  robox.setMouseIsDown(false);
  // Set camera to same reference
  gizmoCamera.position.set(0, 0, cameraDistance);
  sceneCamera.position.set(0, 0, cameraDistance - 2);

  switch (command) {
    case 0:
      break;
    case 1:
      gizmoCamera.position.set(0, 0, -cameraDistance);
      sceneCamera.position.set(0, 0, -cameraDistance + 2);
      break;
    case 2:
      gizmoCamera.position.set(cameraDistance, 0, 0);
      sceneCamera.position.set(cameraDistance - 2, 0, 0);
      break;
    case 3:
      gizmoCamera.position.set(-cameraDistance, 0, 0);
      sceneCamera.position.set(-cameraDistance + 2, 0, 0);
      break;
    case 4:
      gizmoCamera.position.set(0, cameraDistance, 0);
      sceneCamera.position.set(0, cameraDistance - 2, 0);
      break;
    case 5:
      gizmoCamera.position.set(0, -cameraDistance, 0);
      sceneCamera.position.set(0, -cameraDistance + 2, 0);
    default:
      break;
  }
}

/**
 * Listeners for Gizmo
 */

function gizmoMouseMove(gizmoContainer) {
  return event => {
    const gizmoRect = gizmoContainer.getBoundingClientRect();
    robox.setXCoordinate(
      ((event.clientX - gizmoRect.left) / gizmoRect.width) * 2 - 1
    );
    robox.setYCoordinate(
      -((event.clientY - gizmoRect.top) / gizmoRect.height) * 2 + 1
    );
  };
}

function onMouseDown() {
  return () => {
    robox.setMouseIsDown(true);
  };
}

function onMouseUp() {
  return () => {
    robox.setMouseIsDown(false);
  };
}

function gizmoTouchMove(gizmoContainer) {
  return event => {
    const gizmoRect = gizmoContainer.getBoundingClientRect();
    robox.setXCoordinate(
      ((event.touches[0].clientX - gizmoRect.left) / gizmoRect.width) * 2 - 1
    );
    robox.setYCoordinate(
      -((event.touches[0].clientY - gizmoRect.top) / gizmoRect.height) * 2 + 1
    );
  };
}

function onTouchStart(gizmoContainer) {
  return event => {
    const gizmoRect = gizmoContainer.getBoundingClientRect();
    robox.setXCoordinate(
      ((event.touches[0].clientX - gizmoRect.left) / gizmoRect.width) * 2 - 1
    );
    robox.setYCoordinate(
      -((event.touches[0].clientY - gizmoRect.top) / gizmoRect.height) * 2 + 1
    );

    robox.setMouseIsDown(true);
  };
}

function onTouchEnd() {
  return () => {
    robox.setMouseIsDown(false);
  };
}
