var postits = [];
var backgroundColor = new Color(255,255,255);

Run();

function Run(){
  postits.push(new Postit());
  for (var i = 0; i < postits.length; i++) {
    postits[i].draw();
  }
}

function Draw(){

}

/**
 * This method is continually running,
 * put things inhere you want to always keep track of.
 */
function Update(){

}

function Postit(){
  this.text = "Enter your text here";
  this.pos = new Vector(50,70);
  this.zindex = 0;
  this.backgroundColor = new Color(Random(256), Random(256), Random(256));

  this.moveTo = function(newPosition){
    this.pos = newPosition; // Do some animation shit here;
  }

  this.draw = function(){
    var div = document.createElement("div");
        div.className = "postit-container";
        div.style.cssText = "z-index:" + this.zindex + ";top:" + this.pos.y + "px;left:" + this.pos.x + "px;background-color:" + this.backgroundColor.toCSS() + ";";
    document.body.appendChild(div);
  }
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
function Color(r,g,b,a=100){
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;

  this.toCSS = function(){
    return "rgba("+r+","+g+","+b+","+a+")";
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
