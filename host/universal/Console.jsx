JSXEvent('Loading...', 'console')

var doc = app.documents[0];
var directory;
var setPath;
var setName;

var thisDoc = app.documents[0];
var activeAB = thisDoc.artboards.getActiveArtboardIndex();
var lastAB = 0;
var lastABOffset, isOrigin, thisAB, absAB, relAB;

function getName(){
  return app.documents[0].name;
}

function setDirectory(path){
  setPath = path;
  var setFolder = new Folder(path);
  setFolder.create();
}

function deleteFolder(path) {
  var thisFolder = Folder(path);
  try {
    thisFolder.remove();
    return true;
  } catch(e){return false;}
}

function verifyFile(name){
  var newFile = File(setPath + "/" + name + ".svg");
  try {newFile.open('r');
    } catch(e){alert(e)};
  var contents = newFile.read();
  return contents;
}

function clearSet(){
  var setFolder = Folder(setPath);
  var setFile = setFolder.getFiles("*.svg");
  if ( !setFile.length ) {
    // alert("No files");
    return;
  } else {
    for (var i = 0; i < setFile.length; i++) {
      setFile[i].remove();
    }
  }
}

function runScript(path) {
  try {
  $.evalFile(path)
  } catch (e) {
    JSXEvent(e.name + "," + e.line + "," + e + "," + e.message, "console")
  }
}

function JSXEvent(payload, eventType) {
  try {
    var xLib = new ExternalObject("lib:\PlugPlugExternalObject");
  } catch (e) {
    JSXEvent(e, 'console')
  }
  if (xLib) {
  var eventObj = new CSXSEvent();
  eventObj.type = eventType;
  eventObj.data = payload;
  eventObj.dispatch();
  }
  return;
}

var console = {
  log : function(data) {JSXEvent(data, 'console')}
};

/// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
