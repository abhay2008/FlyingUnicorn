function Pipe() {

  var spacing = random(100, height / 2);
  var centery = random(spacing, height - spacing);

  this.top = centery - spacing / 2;
  this.bottom = height - (centery + spacing / 2 + 50);
  this.x = width;
  this.w = 25;
  this.speed = 7;
  this.highlight = false;
  this.imageB = loadImage("pipeB.png");
  this.imageT = loadImage("pipeT.png");

  this.hits = function (bird) {
    if (bird.y < this.top + 20 || bird.y > height - this.bottom - 20) {
      if (bird.x > this.x - 20 && bird.x < this.x + this.w + 20) {
        this.highlight = true;
        return true;
      }
    }
    return false;
  };

  this.show = function () {
    // fill("cyan");
    // stroke("lime");
    // strokeWeight(4);
    // if (this.highlight) {
    //   fill(255, 0, 0);
    // }
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height - this.bottom, this.w, this.bottom);
    image(this.imageT, this.x, 0, this.w * 2, this.top);
    image(this.imageB, this.x, height - this.bottom, this.w * 2, this.bottom);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };

}