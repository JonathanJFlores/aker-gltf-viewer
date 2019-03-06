humhub.module("drawio", function(module, require, $) {});

// First canvas
/*document
  .getElementById("model-view")
  .appendChild(robox.getRenderer().domElement);

// Second canvas
document
  .getElementById("inset")
  .appendChild(robox.getAxisRenderer().domElement);*/

// Loading model
loadModel(
  $("#model")
    .text()
    .trim(),
  robox.getScene(),
  robox.getControls(),
  robox.getCamera()
);
// Windows event:
window.onresize = () => {
  robox.getCamera().aspect = 600 / 500;
  robox.getCamera().updateProjectionMatrix();

  robox.getRenderer().setSize(600, 500);
};

// Configuration and rendering
robox.configCamera();

const resizeCanvas = () => {
  const mainContainerWidth = document.getElementById("model-view").clientWidth;
  const mainContainerHeight = document.getElementById("model-view")
    .clientHeight;

  const gizmoContainerWidth = document.getElementById("gizmo").clientWidth;
  const gizmoContainerHeight = document.getElementById("gizmo").clientHeight;
  // Aspect ratio config
  robox.getCamera().aspect = mainContainerWidth / mainContainerHeight;
  robox.getAxisCamera().aspect = gizmoContainerWidth / gizmoContainerHeight;
  robox.getCamera().updateProjectionMatrix();
  robox.getAxisCamera().updateProjectionMatrix();
  // renderer size
  robox.getRenderer().setSize(mainContainerWidth, mainContainerHeight);
  robox.getAxisRenderer().setSize(gizmoContainerWidth, gizmoContainerHeight);
};

window.addEventListener("resize", resizeCanvas);
var render = function() {
  requestAnimationFrame(render);
  robox.getControls().update();

  //robox.getAxisCamera().position.copy(robox.getCamera().position);
  //robox.getAxisCamera().position.sub(robox.getControls().target);
  //robox.getAxisCamera().position.setLength(6);
  //console.log(robox.getCamera().position);
  robox.getAxisCamera().lookAt(new THREE.Vector3(0, 0, 0));

  robox.getRenderer().render(robox.getScene(), robox.getCamera());
  robox.getAxisRenderer().render(robox.getAxisScene(), robox.getAxisCamera());
};
render();
