/**
 * This file holds a list of utility functions
 * These are general purpose functions that don't
 * care about where you use them.
 * 
 * Please do not make any functions that changes
 * application behaviors here, these should only
 * be used for objects, or return functions.
 * 
 * @author Kasper Laukamp
 */


/**
 * Create a color object with the specified color ranges
 * 
 * @param {integer} r     Red channel value (0-255)
 * @param {integer} g     Green channel value (0-255)
 * @param {integer} b     Blue channel value (0-255)
 * @param {integer} a=100 Alpha channel value (0-100)
 */
function Color(r, g, b, _alpha) {

    // If no alpha was parsed, assume 100%
    alpha = typeof _alpha !== 'undefined' ? _alpha : 100;

    var Return = {
        alpha: alpha,
        red: r,
        green: g,
        blue: b
    }

    return Return;
}

/**
 * Convert a Color object into a useful CSS color code
 * 
 * @param {object}  color       A color object
 * @param {integer} _colorMode  ColorMode (HSB or RGB)
 */
function toCSS(color, _colorMode) {

    return "rgba(" + parseInt(color.red) + "," + parseInt(color.green) + "," + parseInt(color.blue) + "," + parseInt(color.alpha * 100) + ")";

}


/**
 * Generate a random number between min (inclusive) and max (exclusive)
 * second parameter can be omitted to generate a random value between 0 and X
 * 
 * @param {integer} min min value, or max value if second parameter is not used
 * @param {integer} max max value
 */
function Random(min, max) {
    var a = min,
        b = max;

    // Check if max value has been set, if it hasn't
    // then set min value to 0, and max value to the parsed integer
    if (typeof max === 'undefined') {
        a = 0,
        b = min;
    }
    return ~~(Math.random() * (b - a + 1)) + a;
}


/**
 * Generate a new unique identifier
 * 
 * @returns {string}
 */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}


/**
 * Create a vector point
 * 
 * @param {integer} x x-coordinate
 * @param {integer} y y-coordinate
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Save a javascript object into the localstorage
 * 
 * @param {string} objectName The name of the object that should be saved
 * @param {object} object The object that should be saved
 */
function Save(objectName, object) {
    localStorage.setItem(objectName, JSON.stringify(object));
}

/**
 * Retrieves a saved javascript object from the localstorage
 * 
 * @param {string} objectName The name of the object that should be returned
 */
function Load(objectName) {
    var obj = localStorage.getItem(objectName);

    return obj !== null ? JSON.parse(obj) : false;
}

/**
 * Extend jQuery to have a function called hasParent
 * It checks if a child has a parent / ancestor of the given selector
 * 
 * @param   {selector}  pSelector  A jQuery element object
 * @return  {boolean}
 */
jQuery.extend(jQuery.fn, {
    // Name of our method & one argument (the parent selector)
    hasParent: function (pSelector) {
        // Returns a subset of items using jQuery.filter
        return this.filter(function () {
            // Return truthy/falsey based on presence in parent
            return $(this).closest(pSelector).length;
        });
    }
});