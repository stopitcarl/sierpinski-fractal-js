/*
* By: stopitcarl - https://github.com/stopitcarl
 */

// Canvas variables
var canvas_scale = 0.8;
var is_fullscreen = false; // Browser wont fullscreen as default due to permissions
var fps = 60;

// time vars
var time;
var time_running = true;

// triangle variables
var stroke_weight = 3;
var triangle_scale = 0.6;
var fade_out = 10;
var recursion = 2;
var angle; 
var co;
var si;
var len;

// triangle Constants
var MAX_RECURRENCE = 9;
var MIN_RECURRENCE = 0;

// frame variables (modified every frame)
var cos_t, sin_t;


function setup() {
  createCanvas(displayWidth*canvas_scale, displayHeight*canvas_scale);   
  strokeWeight(stroke_weight);
  noFill(); 

  angle = PI/3;
  co = cos(angle);
  si = sin(angle);

  len = displayWidth*canvas_scale*triangle_scale;
  frameRate(fps)
}

function draw() {
  background(0, 0, 0, fade_out);

  x = width / 2;
  y = (height - (len*si))/2; 

  stroke(255, 204, 0);
  triangle(x, y, x + len*co, y + len*si, x - len*co, y + len*si);



  time = millis()*0.0006;
  stroke(255*noise(time*0.35+100), 255*noise(time*0.25+200), 255*noise(time*0.15+400));  

  cos_t = cos(time);
  sin_t = sin(time);

  tri(x + (cos_t- sin(time*2))*0.2*len, y+len*si-cos(sin_t*2)*0.2*len, len/2, 1);
  //print(time)
}



function tri(x1, y1, l, c) {
  if (c > recursion) {
    return;
  }
  // Calculante all angles required
  x2 = x1 + l * co;
  y2 = y1 - l * si;
  x3 = x1 - l * co;
  y3 = y1 - l * si; 


  triangle(x1, y1, x2, y2, x3, y3);

  // top
  tri(x1+cos_t*sin_t*0.2*l, y2+(cos_t+sin_t)*0.2*l, l/2, c+1);
  // left
  tri(x1-l/2 + cos_t*0.2*l, y1+sin_t*0.2*l, l/2, c+1);
  // right
  tri(x1 + l/2 + sin_t*0.2*l, y1 + cos_t*0.2*l, l/2, c+1);
}

function keyPressed() {
  switch(keyCode) {
  case 76: // L
    recursion += recursion < MAX_RECURRENCE ? 1 : 0;
    break;
  case 75: // K
    recursion -= recursion > MIN_RECURRENCE ? 1 : 0;
    break;
  case 73: // I
    canvas_scale += canvas_scale < 1 ? 0.05 : 0;
    resizeCanvas(displayWidth * canvas_scale, displayHeight * canvas_scale);
    background(0)
    break;
  case 85: // U
    canvas_scale -= canvas_scale > 0.5 ? 0.05 : 0;
    resizeCanvas(displayWidth * canvas_scale, displayHeight * canvas_scale);
    background(0)
    break;
  case 70: // F    
    fullscreen( !fullscreen() );
    resizeCanvas(displayWidth, displayHeight);
    background(0)    
    break;
  case 84: // T
    stroke_weight += 0.5;
    strokeWeight(stroke_weight);
    break;
  case 89: // Y
    stroke_weight -= stroke_weight > 1 ? 0.5 : 0;
    strokeWeight(stroke_weight);
    break;
  case 71: // G
    triangle_scale += triangle_scale < 1 ? 0.1 : 0;
    len = displayWidth * canvas_scale * triangle_scale;
    break;
  case 72: // H
    triangle_scale -= triangle_scale > 0.2 ? 0.1 : 0;
    len = displayWidth * canvas_scale * triangle_scale;
    break;  
  case 86: // V
    fade_out += fade_out < 250 ? 5 : 0;
    break;  
  case 66: // B
    fade_out -= fade_out > 4 ? 5 : 0;
    break;
  }
}


// Dead code : enables individual colors to triangles
//     ( requires changes in draw function )
/*
 
 function Triangle (x1, y1, x2, y2, x3, y3) {
 
 this.x1 = x1;
 this.y1 = y1;
 this.x2 = x2;
 this.y2 = y2;
 this.x3 = x3;
 this.y3 = y3;  
 this.opacity = 200;
 }
 
 Triangle.prototype.draw = function() {
 // print(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3)
 this.color = color(100, 100, 230, this.oppacity);
 stroke(this.color);
 triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
 };
 
 
 */