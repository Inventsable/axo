var thisDoc = app.documents[0];
var exist = app.documents.length > 0;
var hasPath = thisDoc.pathItems.length > 0;

// BENCHMARK 30 PASSED:
// SSR(-30, 'Top')
// SSR(30, 'Top')
// SSR(-30, 'Right')
// SSR(30, 'Right')
// SSR(-30, 'Left')
// SSR(30, 'Left')

// var j = "0";
//     j = prompt("Mode ? 0-5",j,"");
// switch (j) {
//       case ("0"): SSR(-30, 'Top'); break;
//       case ("1"): SSR(30, 'Top'); break;
//       case ("2"): SSR(-30, 'Right'); break;
//       case ("3"): SSR(30, 'Right'); break;
//       case ("4"): SSR(-30, 'Left');break;
//       case ("5"): SSR(30, 'Left');
//
//       }


function readSelection() {
  thisDoc = app.documents[0];
  var hasSelection = thisDoc.selection.length > 0;
  var result = [];
  if (hasSelection) {
    for (n = 0; n < thisDoc.pageItems.length; n++) {
      var thisItem = thisDoc.pageItems[n];
      if (thisItem.selected) {
        result.push(n);
      }
    }
  } else {
    result = false;
  }
  return result;
}

// readTags('LeftACW');

function readTags() {
  var result;
  var seek = [];
  if (exist && hasPath) {
    for (n = 0; n < thisDoc.pageItems.length; n++) {
      var thisItem = thisDoc.pageItems[n];
      if (thisItem.selected) {
        for (i = 0; i < thisItem.tags.length; i++) {
          var thisTag = thisItem.tags[i];
          if (isTagged(thisTag)) {
            // alert(thisTag.value)
            seek.push(n + ";" + thisTag.value)
          }
        }
        if (arguments.length > 0)
          addTag(thisDoc.pageItems[n].tags, 'SSR', arguments[0])
      }
    }
      if (seek.length) {
        result = seek;
      } else {
        result = 0;
      }
  }
  if (result === 'undefined')
    alert('undefined')
  return result;
}

function addTag(tagList, name, value) {
  var tempTag = tagList.add();
  tempTag.name = name;
  tempTag.value = value;
  return tempTag;
}

function isTagged(tag) {
  if (tag.name == 'SSR')
  return true;
  else
  return false;
}


function SSR(ang, direction){
  if (exist && hasPath) {
    for (i = 0; i < thisDoc.selection.length; i++) {
      calcSSR(ang, direction, thisDoc.selection[i]);
    }
  }
}

function calcSSR(ang, direction, selectedObject) {
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
  if ((direction == 'Right') && (ang < 0))
    selectedObject.rotate(3 * ang);
  else if ((direction == 'Left') && (ang > 0))
    selectedObject.rotate(3 * ang);
  else
    selectedObject.rotate(ang);

  return selectedObject;
}


function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
