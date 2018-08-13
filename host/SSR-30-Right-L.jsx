#target Illustrator#targetengine main//  Left View;// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -var ang = 30; // define rotation angle// Check that a document is open and that at least 1 pathItem is selectedif ( app.documents.length > 0 && app.activeDocument.pathItems.length > 0 ){    // Assign a variable as the active document    thisDoc = app.activeDocument;    // Cycle through all selected objects in the active document    for ( i = 0; i < thisDoc.selection.length; i++ ){    // Assign each objects    selectedObject=thisDoc.selection[i];    // Scale Y    AngToRad = toRadians(ang);    scale2 = Math.cos(AngToRad)*100;    selectedObject.resize(100,scale2);    // selectedObject.resize(100,86.602);    // Shear    var im = app.getIdentityMatrix();    //im.mValueB = .5; // skew y 50%    DeltaAngToRad  = toRadians(30);    im.mValueC = Math.tan(DeltaAngToRad);    // im.mValueC = .57735; // skew x 57.735% == 30°deg    selectedObject.transform (im, true, true, true, true, 1, undefined);    // Rotate    selectedObject.rotate(ang);    }}function toDegrees (angle) {  return angle * (180 / Math.PI);}function toRadians (angle) {  return angle * (Math.PI / 180);}