/**
 * Settings file
 * change global variables
 * don't touch constants
 */

const HSB = "hsv";
const RGB = "rgb";
const HEX = "hex";

/**
 * Use HSB for Hue Saturation Brigthness color codes
 * Use RGB for Red Green Blue color codes
 * use HEX for hex color codes
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