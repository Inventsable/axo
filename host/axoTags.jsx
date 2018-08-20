var thisDoc = app.documents[0];
var exist = app.documents.length > 0;
var hasPath = thisDoc.pathItems.length > 0;

// alert(readSelection());

function readSelection() {
  thisDoc = app.documents[0];
  var hasSelection = thisDoc.selection.length > 0;
  var result;
  if (hasSelection) {
    result = thisDoc.selection.length;
  } else {
    result = 0;
  }
  return result;
}




// readTags('TopCW')
// alert(readTags());

// var directions = ['Top', 'Left', 'Right'];
// tagSSR('Right');

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
