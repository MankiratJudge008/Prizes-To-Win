class Board {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);

    this.width = width;
    this.height = height;
    
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: this.image = loadImage("./assets/ballon.png");
              break;
      case 2: this.image = loadImage("./assets/makeup.png");
              break;
      case 3: this.image = loadImage("./assets/bag.png");
              break;
      case 4: this.image = loadImage("./assets/book.png");
              break;
      case 5: this.image = loadImage("./assets/teddybear.png");
              break;
      default: break;
    }

    World.add(world, this.body);
  }
setImage(img){
        this.image = img
}
  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }

}
