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

// BENCHMARK 10:
// SSR(-10, 'Top')
// SSR(10, 'Top')
// SSR(-10, 'Right')
// SSR(10, 'Right')
// SSR(-10, 'Left')
// SSR(10, 'Left')

// BENCHMARK 40 PASSED:
// SSR(-40, 'Top')
// SSR(40, 'Top')
// SSR(-40, 'Right')
// SSR(40, 'Right')
// SSR(-40, 'Left')
// SSR(40, 'Left')



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

  if ((ang == 10) | (ang == -10)) {
    if ((direction == 'Top') && (ang < 0)) {
      selectedObject.rotate(-90);
      ang = 40;
    } else if (direction == 'Left')
      ang = -10;
      else
      ang = 40;
  }

  if ((ang == 40) | (ang == -40)) {
    if ((direction == 'Top') && (ang > 0)) {
      selectedObject.rotate(90);
      ang = -40;
    } else if (direction == 'Right') {
      ang = 10;
    } else {
      ang = -40;
    }
  }

  // Scale
  AngToRad = toRadians(ang);
  scale2 = Math.cos(AngToRad) * 100;

  if ((ang == 30) | (ang == -30)) {
    console.log('Thirty!');
    scale1 = 100;
  } else {
    scale1 = scale2;
  }
  // scale1 = ((ang == 30) | (ang == -30)) ? 100 : scale2;
  selectedObject.resize(scale1, scale2);

  // Shear
  var im = app.getIdentityMatrix();
  if ((direction == 'Top') && ((ang == 40) | (ang == -40)))
    DeltaAngToRad = toRadians(-ang);
  else
    DeltaAngToRad = toRadians(ang);
  im.mValueC = Math.tan(DeltaAngToRad);
  selectedObject.transform(im, true, true, true, true, 1, undefined);

// Rotate
  switch (direction) {
    case 'Right':
      if (ang == -30)
        selectedObject.rotate(3 * ang);
      else
        selectedObject.rotate(ang);
      break;
    case 'Left':
      if (ang == 30)
        selectedObject.rotate(3 * ang);
      else
        selectedObject.rotate(ang);
      break;
    default:
      selectedObject.rotate(ang);
      break;
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
