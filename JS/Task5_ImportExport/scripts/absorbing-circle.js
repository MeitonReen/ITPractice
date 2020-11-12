import {Shape} from "./shape.js";
import {random} from "./others.js";

export class AbsorbingCircle extends Shape {
  constructor(x, y, size, velX, velY, ctx, maxWidth, maxHeight, borderColor){
    velX = Math.abs(velX);
    velY = Math.abs(velY);
    super(x, y, size, velX, velY, ctx, maxWidth, maxHeight);

    this.borderColor = borderColor;
    this.downUp = false;
    this.downDown = false;
    this.downLeft = false;
    this.downRight = false;
    this.setControls();
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = 6;
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.arc(this.x, this.y, this.size + 3 , 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  setControls() {
    window.onkeydown = (e) => {
      if (e.keyCode === 65 || e.keyCode === 37) {//a, стелка влево
        this.downLeft = true;
      } else if (e.keyCode === 68 || e.keyCode === 39) {//d, стрелка вправо
        this.downRight = true;
      } else if (e.keyCode === 87 || e.keyCode === 38) {//w, стрелка вверх
        this.downUp = true;
      } else if (e.keyCode === 83 || e.keyCode === 40) {//s, стрелка вниз
        this.downDown = true;
      }
    }
    window.onkeyup = (e) => {
      if (e.keyCode === 65 || e.keyCode === 37) {//a, стелка влево
        this.downLeft = false;
      } else if (e.keyCode === 68 || e.keyCode === 39) {//d, стрелка вправо
        this.downRight = false;
      } else if (e.keyCode === 87 || e.keyCode === 38) {//w, стрелка вверх
        this.downUp = false;
      } else if (e.keyCode === 83 || e.keyCode === 40) {//s, стрелка вниз
        this.downDown = false;
      }
    }
  }
  unsetControls() {
    window.onkeydown = null;
    window.onkeyup = null;
  }
  update() {
    if ((this.x + this.size) > this.maxWidth) {
      this.x = this.maxWidth - this.size;
    }
  
    if ((this.x - this.size) < 0) {
      this.x = this.size;
    }
  
    if ((this.y + this.size) > this.maxHeight) {
      this.y = this.maxHeight - this.size;
    }
  
    if ((this.y - this.size) < 0) {
      this.y = this.size;
    }
    
    if (this.downUp) {
      this.y -= this.velY;
    }
    if (this.downDown) {
      this.y += this.velY;
    }
    if (this.downLeft) {
      this.x -= this.velX;
    }
    if (this.downRight) {
      this.x += this.velX;
    }
  }
  setColor(color) {
    this.borderColor = color;
  }
  collisionDetect(shapes) {
    for (var j = 0; j < shapes.length; j++) {
      if (!(this === shapes[j])) {
        var dx = this.x - shapes[j].x;
        var dy = this.y - shapes[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + shapes[j].size) {
          shapes[j].sizeChange(-1);
          shapes[j].speedChange(0.8);

          let newColor = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) +")";
          shapes[j].setColor(newColor);
          this.setColor(newColor);

          this.sizeChange(0.09);
          this.speedChange(0.995);

          if (shapes[j].sizeIsNullOrLess()){
            shapes.splice(j, 1);
          }
        }
      }
    }
  }
}