humhub.module("drawio", function(module, require, $) {});

// First canvas
document
  .getElementById("model-view")
  .appendChild(robox.getRenderer().domElement);

// Second canvas
document
  .getElementById("inset")
  .appendChild(robox.getAxisRenderer().domElement);

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

var render = function() {
  requestAnimationFrame(render);
  robox.getControls().update();

  robox.getAxisCamera().position.copy(robox.getCamera().position);
  robox.getAxisCamera().position.sub(robox.getControls().target);
  robox.getAxisCamera().position.setLength(1);

  robox.getAxisCamera().lookAt(robox.getAxisScene().position);

  robox.getRenderer().render(robox.getScene(), robox.getCamera());
  robox.getAxisRenderer().render(robox.getAxisScene(), robox.getAxisCamera());
};
render();
