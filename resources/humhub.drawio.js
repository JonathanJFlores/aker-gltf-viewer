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

// Configuration and rendering
robox.configCamera();

function resizeCanvas() {
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
  console.log("*/*/**/*//**/*/");
  console.log(mainContainerWidth, mainContainerHeight);
  console.log("/**/*/*/*/*/*/");
  robox.getRenderer().setSize(mainContainerWidth, mainContainerHeight);
  robox.getAxisRenderer().setSize(gizmoContainerWidth, gizmoContainerHeight);
}

// Debounce function to handler resize event
function debounce(ms = 500, f) {
  let timerId;
  return (...params) => {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      f.apply(null, params);
    }, ms);
  };
}

window.addEventListener("resize", debounce(500, resizeCanvas));

var render = function() {
  requestAnimationFrame(render);
  robox.getControls().update();

  //robox.getAxisCamera().position.copy(robox.getCamera().position);
  //robox.getAxisCamera().position.sub(robox.getControls().target);
  //robox.getAxisCamera().position.setLength(6);
  //console.log(robox.getCamera().position);

  robox.getRenderer().render(robox.getScene(), robox.getCamera());
  //robox.getAxisRenderer().render(robox.getAxisScene(), robox.getAxisCamera());
  robox.renderGizmo();
};
render();
