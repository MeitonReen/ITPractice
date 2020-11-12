import {Ball} from "./ball.js";
import {AbsorbingCircle} from "./absorbing-circle.js";
import {random} from "./others.js";

export class Game {
    constructor(ctx, maxWidth, maxHeight, countBalls, callbackForWin) {
        this.ctx = ctx;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.countBalls = countBalls;
        this.callbackForWin = callbackForWin;
        this.shapes = [];
    }
    start()
    {
        this.generateShapes();

        this.loop();
    }
    generateShapes(){
      while (this.shapes.length < this.countBalls) {
        var ball = new Ball(
          random(0, this.maxWidth),
          random(0, this.maxHeight),
          random(10, 20),
          random(-7, 7),
          random(-7, 7),
          this.ctx,
          this.maxWidth,
          this.maxHeight,
          "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) +")",
        );
        this.shapes.push(ball);
      }
  
      var absorbingCircle = new AbsorbingCircle(
        random(0, this.maxWidth),
        random(0, this.maxHeight),
        random(7, 20),
        random(7, 12),
        random(7, 12),
        this.ctx,
        this.maxWidth,
        this.maxHeight,
        "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) +")",
      );
      
      this.shapes.push(absorbingCircle);
    }
  
    loop() {
      let requestID = requestAnimationFrame(this.loop.bind(this));
  
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
  
      for (var i = 0; i < this.shapes.length; i++) {
        this.shapes[i].collisionDetect(this.shapes);
        if (this.shapes[i] !== undefined)
        {
            this.shapes[i].draw();
            this.shapes[i].update();
        }
      }
  
      if (this.shapes.length === 1) {
        this.shapes.pop();
        cancelAnimationFrame(requestID);
        this.callbackWin();
        return;
      }
    }
  }