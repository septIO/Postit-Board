const HSB = "hsb",
      RGB = "rgb";

postits = [];

/**
 * How should colors be used?
 * RGB for rgb(r, g, b, alpha)
 * HSB for hsla(h, s, l, alpha)
 */
var colorMethod = HSB;

Run();

/**
 * Initialize the app and draw the default / saved postits
 */
function Run() {
    postits.push(new Postit());
    for (var i = 0; i < postits.length; i++) {
        postits[i].draw();
    }
}

function Postit() {
    this.text = '';
    this.pos = new Vector(10, 10);
    this.background = new Color(Random(128), 75, 85, 100);
    this.isActive = false;
    this.id = 

    this.draw = function () {
        // Create main element
        $el = $('<div class="postit-container"></div>');
        $el.css({
            "background-color": this.background.toCSS(),
            "left": this.pos.x + "%",
            "top": this.pos.y + "%"
        });
        $el.append('<div class="postit-handle"></div>');

        // Create body element
        $body = $('<div class="postit-body"></div>');
        $body.append('<textarea placeholder="Enter your text here">' + this.text + '</textarea>');

        // Create main element in the DOM
        $el.append($body);
        $('body').append($el);
    }
}

/**
 * Create a vector point
 * @param {integer} x x-coordinate
 * @param {integer} y y-coordinate
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;
}

/**
 * Create a color object with the specified color ranges
 * @param {integer} r     Red channel value (0-255)
 * @param {integer} g     Green channel value (0-255)
 * @param {integer} b     Blue channel value (0-255)
 * @param {integer} a=100 Alpha channel value (0-100)
 */
function Color(r, g, b, alpha) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha || 100

    this.toCSS = function () {
        switch (colorMethod) {
            case HSB:

                return "hsla(" + r + ", " + g + "%," + b + "%, " + alpha + ")";
                break;
            case RGB:
                return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
                break;
        }

    }
}

/**
 * Generate a random number between min (inclusive) and max (exclusive)
 * second parameter can be omitted to generate a random value between 0 and X
 * @param {integer} min min value, or max value if second parameter is not used
 * @param {integer} max max value
 */
function Random(min, max) {
    var a = min,
        b = max;

    /**
     * Check if max value has been set, if it hasn't
     * then set min value to 0, and max value to the parsed integer
     * @param  {integer} typeof max           === 'undefined' Check if max was parsed
     * @return {void}
     */
    if (typeof max === 'undefined') {
        a = 0,
        b = min;
    }

    return ~~(Math.random() * (b - a + 1)) + a;
}
