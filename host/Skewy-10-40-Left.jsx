function mainfunc() {
    var ang = -10; // define rotation angle
    if (app.documents.length > 0 && app.activeDocument.pathItems.length > 0) {
        thisDoc = app.activeDocument;
        for (i = 0; i < thisDoc.selection.length; i++) {
            selectedObject = thisDoc.selection[i];
            //

            // Scale Y
            AngToRad = toRadians(ang);
            scale2 = Math.cos(AngToRad) * 100;
            scale1 = 100;

            selectedObject.resize(scale1, scale2);

            // Shear

            var im = app.getIdentityMatrix();

            //
            DeltaAngToRad = toRadians(ang);
            im.mValueC = Math.tan(DeltaAngToRad);
            //

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
