export class Shape{
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