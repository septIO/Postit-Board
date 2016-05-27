var postits = [];
var currentActive;
Run();

/**
 * Initialize the app and draw the default / saved postits
 */
function Run() {

    savedPostits = Load('postits');
    if (!savedPostits || savedPostits.length == 0) {
        postits.push(new Postit());
    }
    else {
        for (var i = 0; i < savedPostits.length; i++) {
            postits.push(savedPostits[i]);
        }
    }

    
    
    // Set the first postit to be the current one
    currentActive = postits[0];
    currentActive.isActive = true;
    _.map(postits, function (obj, key) { return Draw(obj) });

    $('#color-picker').spectrum({
        color: toCSS(_.findWhere(postits, { isActive: true }).background, HSB),
        preferredFormat: "rgb",
        localStorageKey: "color",
        showInput: true,
        chooseText: "Done",
        showPalette: true,
        showSelectionPalette: true,
        maxSelectionSize: 10
    });

}




