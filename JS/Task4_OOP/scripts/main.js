class Shape{
  constructor(x, y, size, velX, velY, ctx, maxWidth, maxHeight){
    this.x = x;
    this.y = y;
    this.size = size;
    this.velX = velX;
    this.velY = velY;

    Shape.prototype.ctx = ctx;
    Shape.prototype.maxWidth = maxWidth;
    Shape.prototype.maxHeight = maxHeight;
  }
  sizeChange(n)
  {
    this.size += n;
  }
  speedChange(n){
    this.velX *= n;
    this.velY *= n;
  }
}
class Ball extends Shape {
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
class AbsorbingCircle extends Shape {
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

const canvas = document.querySelector("canvas");
const ctx2 = canvas.getContext("2d");

const maxWidth = canvas.width = window.innerWidth;
const maxHeight = canvas.height = window.innerHeight;

const winBack = document.querySelector(".win-back");
const winButton = document.querySelector(".win-button");

winButton.addEventListener("click", () => {
  winBack.style.visibility = "hidden";
  gameStart(ctx2, maxWidth, maxHeight, () => win(winBack));
});

gameStart(ctx2, maxWidth, maxHeight, () => win(winBack));


function gameStart(ctx2, maxWidth, maxHeight, callbackWin)
{
  var shapes = generateShapes(ctx2, maxWidth, maxHeight);

  loop(shapes, ctx2, maxWidth, maxHeight, callbackWin);
}
function win(winBack) {
  winBack.style.visibility = "visible";
}
function generateShapes(ctx, maxWidth, maxHeight){
  var shapes = [];

  while (shapes.length < 25) {
    var ball = new Ball(
      random(0, maxWidth),
      random(0, maxHeight),
      random(10, 20),
      random(-7, 7),
      random(-7, 7),
      ctx,
      maxWidth,
      maxHeight,
      "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) +")",
    );
    shapes.push(ball);
  }

  var absorbingCircle = new AbsorbingCircle(
    random(0, maxWidth),
    random(0, maxHeight),
    random(7, 20),
    random(7, 12),
    random(7, 12),
    ctx,
    maxWidth,
    maxHeight,
    "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) +")",
  );
  shapes.push(absorbingCircle);

  return shapes;
}
function loop(shapes, ctx, maxWidth, maxHeight, callbackWin) {
  let requestID = requestAnimationFrame(() => loop(shapes, ctx2, maxWidth, maxHeight, callbackWin));

  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, maxWidth, maxHeight);

  for (var i = 0; i < shapes.length; i++) {
    shapes[i].collisionDetect(shapes);
    if (shapes[i] !== undefined)
    {
      shapes[i].draw();
      shapes[i].update();
    }
  }

  if (shapes.length === 1) {
    shapes.pop();
    cancelAnimationFrame(requestID);
    callbackWin();
    return;
  }
  //loop.bind.loop(shapes, ctx, maxWidth, maxHeight);
}
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}