var thisDoc = app.documents[0];
var exist = app.documents.length > 0;
var hasPath = thisDoc.pathItems.length > 0;
var origins = [];

// BENCHMARK 30 PASSED:
// SSR(-30, 'Top')
// SSR(30, 'Top')
// SSR(-30, 'Right')
// SSR(30, 'Right')
// SSR(-30, 'Left')
// SSR(30, 'Left')

function SSR(ang, direction){
  if (exist && hasPath) {
    for (i = 0; i < thisDoc.selection.length; i++) {
      calcSSR(ang, direction, thisDoc.selection[i]);
    }
  }
}

function calcSSR(ang, direction, selectedObject) {
  //// If not tagged, record original position as array [x1, y1, x2, y2]
  //// Add tag with direction and angle, push originRect to global array: origins

  // Scale
  AngToRad = toRadians(ang);
  scale2 = Math.cos(AngToRad) * 100;
  selectedObject.resize(100, scale2);

  // Shear
  var im = app.getIdentityMatrix();
  if (direction == 'Top')
    DeltaAngToRad = toRadians(-ang);
  else
    DeltaAngToRad = toRadians(ang);
  im.mValueC = Math.tan(DeltaAngToRad);
  selectedObject.transform(im, true, true, true, true, 1, undefined);

  // Rotate
  if (direction == 'Right') {
    if (ang < 0)
      selectedObject.rotate(3 * ang);
    else
      selectedObject.rotate(ang);
  } else if (direction == 'Left') {
    if (ang > 0)
      selectedObject.rotate(3 * ang);
    else
      selectedObject.rotate(ang);
  } else {
    selectedObject.rotate(ang);
  }
  return selectedObject;
}

function clearOrigins() {
  while(origins.length) {
    origins.pop();
  }
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
