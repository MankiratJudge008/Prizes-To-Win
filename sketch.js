const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2;
var numberOfArrows = 10;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/circusbackground.jpg");
  image1 = loadImage("./assets/bag.png");
  image2 = loadImage("./assets/ballon.png");
  image3 = loadImage("./assets/makeup.png");
  image4 = loadImage("./assets/book.png");
  image5 = loadImage("./assets/teddybear.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 200, 280);
  playerArcher = new PlayerArcher(350,playerBase.body.position.y - 210,180,180
  );

  board1 = new Board(width - 300, 330, 120, 120);
  board2 = new Board(width - 550, height - 300, 120, 120);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();

  board1.display();
  board2.display();

  for (var i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var board1Collision = Matter.SAT.collides(
        board1.body,
        playerArrows[i].body
      );

      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

      // if (board1Collision || board2Collision) {
      //   score += 5;
      // }

      // if (board1Collision.collided && board2Collision.collided) {
      //    score += 5;
      //  }*/

       if (board1Collision.collided || board2Collision.collided) {
         score += 5;
            
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1:  board1.setImage(image1)
              break;
      case 2:  board1.setImage(image2)
              break;
      case 3:  board1.setImage(image3)
              break;
      case 4: board1.setImage(image4)
              break;
      case 5:  board1.setImage(image5)
              break;

      default: break;
    }

       }

      // if (board1Collision.collided || board2Collision.collided) {
      //   score = 5;
      // }

      
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }

  // Title
  fill("#000000");
  textAlign("center");
  textSize(40);
  text("Prizes To Win!", width / 2, 100);

  // Score
  fill("#000000");
  textAlign("center");
  textSize(30);
  text("Score " + score, width - 200, 100);

  // Arrow Count
  fill("#000000");
  textAlign("center");
  textSize(30);
  text(" Bullets : " + numberOfArrows, 200, 100);

  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

  if (numberOfArrows == 0) {
    gameOver();
  }

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

