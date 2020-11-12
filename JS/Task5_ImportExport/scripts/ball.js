import {Shape} from "./shape.js";
import {random} from "./others.js";

export class Ball extends Shape {
  constructor(x, y, size, velX, velY, ctx, maxWidth, maxHeight, backgroundColor){
    super(x, y, size, velX, velY, ctx, maxWidth, maxHeight);
    
    this.backgroundColor = backgroundColor;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  sizeIsNullOrLess()
  {
    if (this.size <= 0){
      return true;
    } else {
      return false;
    }
  }
  update() {
    if ((this.x + this.size) >= this.maxWidth) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= this.maxHeight) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  setColor(color) {
    this.backgroundColor = color;
  }
  collisionDetect(shapes) {
    for (var j = 0; j < shapes.length; j++) {
      if (!(this === shapes[j])) {
        var dx = this.x - shapes[j].x;
        var dy = this.y - shapes[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + shapes[j].size) {
          let newColor = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) +")";
          shapes[j].setColor(newColor);
          this.setColor(newColor);
        }
      }
    }
  }
}