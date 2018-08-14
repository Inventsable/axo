function mainfunc() {
    var ang = -40; // define rotation angle
    if (app.documents.length > 0 && app.activeDocument.pathItems.length > 0) {
        thisDoc = app.activeDocument;
        for (i = 0; i < thisDoc.selection.length; i++) {
            selectedObject = thisDoc.selection[i];
            selectedObject.rotate(90);

            // Scale Y
            AngToRad = toRadians(ang);
            scale1 = Math.cos(AngToRad) * 100;
            scale2 = Math.cos(AngToRad) * 100;

            selectedObject.resize(scale1, scale2);

            // Shear

            var im = app.getIdentityMatrix();

            //im.mValueB = .5; // skew y 50%
            DeltaAngToRad = toRadians(40);
            im.mValueC = Math.tan(DeltaAngToRad);
            // im.mValueC = .57735026919; // skew x 57.735% == 30°deg

            selectedObject.transform(im, true, true, true, true, 1, undefined);

            // Rotate

            selectedObject.rotate(ang);

        }
    }
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

mainfunc();
