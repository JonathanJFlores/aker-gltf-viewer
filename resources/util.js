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
  const width = 600;
  const height = 500;
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
  renderer.setClearColor(0xcccccc, 1);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Axis Renderer
  const rendererAxis = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    premultipliedAlpha: false
  });
  rendererAxis.setSize(80, 80);
  rendererAxis.setClearColor(0xd4d4bf, 1);
  const helper = new THREE.AxesHelper(8);
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
  // Planes as buttons
  const front = createPlane(0xffff00);
  //front.position.x += 1;
  //front.position.y = 5;
  front.position = new THREE.Vector3(0, 0, 0);
  front.userData = { command: "front" };
  sceneAxis.add(front);
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  // ambientLight.position.set(0, 1, 0);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
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
    }
  };
})();

function onTransitionEnd(event) {
  const element = event.target;
  element.remove();
  document.getElementById("model-view").style.display = "flex";
}

function createPlane(color) {
  const geometry = new THREE.PlaneGeometry();
  const material = new THREE.MeshBasicMaterial({
    color
  });
  return new THREE.Mesh(geometry, material);
}
