function Unicorn() {
   this.y = height / 2;
   this.x = width / 4;
   this.w = 40;
   this.h = 40;
   this.gravity = 0.6;
   this.lift = -13;
   this.velocity = 0;
   this.image = loadImage("unicorn.png");

   this.show = function () {
      // fill("yellow");
      // stroke("orange");
      // strokeWeight(5);
      // ellipse(this.x, this.y, 32, 32);
      image(this.image, this.x, this.y, this.w * 2, this.h * 2);
   }

   this.up = function () {
      this.velocity += this.lift;
   }

   this.update = function () {
      this.velocity += this.gravity;
      this.velocity *= 0.9;
      this.y += this.velocity;

      if (this.y > height) {
         this.y = height;
         this.velocity = 0;
      }

      if (this.y < 0) {
         this.y = 0;
         this.velocity = 0;
      }

   }

}