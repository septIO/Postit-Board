/**
 * Settings file
 * change global variables
 * don't touch constants
 */

const HSB = 1;
const RGB = 2;

/**
 * Use HSB for Hue Saturation Brigthness color codes
 * Use RGB for Red Green Blue color codes
 * 
 * @default: HSB
 */
var colorMode = HSB;

/**
 * whether or not the postits can only be dragged
 * on the visible part of the screen
 * 
 * if set to false, users can drag elements offscreen
 * 
 * @default: true
 */
var confinePostitsToScreen = true;