const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];


function preload() {
  backgroundImg = loadImage("./assets/background.jpg");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(90, playerBase.position.y -160, 420, 230, options);
  World.add(world, player)

  playerArcher = new PlayerArcher(340, playerBase.position.y -70, 420, 230);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,420,230)

  playerArcher.display();
    for (var i = 0; i < playerArrows.length; i++) {
      if (playerArrows[i] !== undefined) {
        playerArrows[i].display();
      }
    }

  // Título
  fill("brown");
  textAlign("center");
  textSize(40);
  text("ARQUEIRO ÉPICO", width / 2, 100);
}

 function keyPressed() {
   if (keyCode === 32) {
     var posX = playerArcher.body.position.x;
     var posY = playerArcher.body.position.y;
     var angle = playerArcher.body.angle;
     var arrow = new PlayerArrow(posX+15, posY, 120, 50, angle);
     Matter.Body.setAngle(arrow.body, angle);
     playerArrows.push(arrow);
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
