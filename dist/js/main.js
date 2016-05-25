const HSB = "hsb",
      RGB = "rgb";

var postits = [];

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
function Run(){
    postits.push(new Postit());
    for (var i = 0; i < postits.length; i++) {
        postits[i].draw();
    }
    createEvenetListeners();
}

function createEvenetListeners(){
    var notes = document.getElementsByClassName("postit-handle");
    
    for (var i = 0; i < notes; i++) {
        notes[i].addEventListener('click', test, false);
    }
}

var test = function(){
    alert('test');
}

function Postit(){
    this.text='';
    this.pos = new Vector(10,10);
    this.zindex = 0;
    this.backgroundColor = new Color(Random(100), 100, 75);
    this.HTML;
    this.isActive = true;

    this.moveTo = function(newPosition){
        this.pos = newPosition; // Do some animation shit here;
    }

    this.draw = function(){
        if(typeof this.HTML === 'undefined')
            this.HTML = new PostitHTMLObject(this);
        
        document.body.appendChild(this.HTML);
    }
}

function PostitHTMLObject(postitObject){
    var container = document.createElement("div");
    container.className = "postit-container";

    if(postitObject.isActive){
        container.className += " active";
    }

    container.id = "p"+postits.length;
    container.style.cssText = "z-index:" + postitObject.zindex + ";top:" + postitObject.pos.y + "%;left:" + postitObject.pos.x + "%;background-color:" + postitObject.backgroundColor.toCSS() + ";";

    var handle = document.createElement("div");
    handle.className = "postit-handle";
    container.appendChild(handle);

    var body = document.createElement("div");
    body.className = "postit-body";
    body.innerHTML = "<textarea placeholder='Enter your text here'>"+postitObject.text+"</textarea>";
    container.appendChild(body);

    return container;
}

/**
 * Create a vector point
 * @param {integer} x x-coordinate
 * @param {integer} y y-coordinate
 */
function Vector(x,y){
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
function Color(r,g,b,alpha=100){
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;

    this.toCSS = function(){
        switch (colorMethod) {
            case HSB:

                return "hsla("+r+", "+g+"%,"+b+"%, "+alpha+")";
                break;
            case RGB:
                return "rgba("+r+","+g+","+b+","+alpha+")";
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
    function Random(min,max){
        var a = min,
            b = max;

        /**
         * Check if max value has been set, if it hasn't
         * then set min value to 0, and max value to the parsed integer
         * @param  {integer} typeof max           === 'undefined' Check if max was parsed
         * @return {void}
         */
        if(typeof max === 'undefined'){
            a = 0,
            b = min;
        }

        return ~~(Math.random() * (b - a + 1)) + a;
    }
    