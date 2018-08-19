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

var directions = ['Top', 'Left', 'Right'];
tagSSR('Right');

function tagSSR(direction) {
  var seek = [];
  if (exist && hasPath) {
    for (n = 0; n < thisDoc.pageItems.length; n++) {
      var thisItem = thisDoc.pageItems[n];
      if (thisItem.selected) {
        for (i = 0; i < thisItem.tags.length; i++) {
          var thisTag = thisItem.tags[i];
          if (isTagged(thisTag)) {
            seek.push(thisTag.value)
          }
        }
        // addTag(thisDoc.pageItems[n].tags, 'SSR', direction)
      }
    }
    if (seek.length) {
      alert(seek.length + ' tags total')
    } else {
      alert('No tags found in these objects')
    }
    // alert(seek.length)
  }

  function addTag(tagList, name, value) {
    var tempTag = tagList.add();
    tempTag.name = name;
    tempTag.value = value;
    return tempTag;
  }

  function isTagged(tag) {
    // var match = false;
    if (tag.name == 'SSR') {
      return true;
      // for (i = 0; i < directions.length; i++) {
      //   if (tag.value == directions[i]) {
      //     match = directions[i];
      //     // alert('Match at ' + directions[i])
      //   }
      // }
    } else {
      return false;
    }
    // return match;
  }
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
