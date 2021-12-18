var player1, player2;
var island, bullet, ground, islandGroup;
var player2Img,islandImage, bg, bgImage;
var changeDirection;
var bullet, bulletImg, bulletGroup, invsableGround, up, down, left, right;
var keyState = "noState";
var score = 0, frames, z = 0, a = 0;
var c1, c2, c3, x = 510, y = 100, x1 = 510, y1 = 10;

var invisibleground, center, endImage;
var gameState = "notStarted";
//var energy, energyImage, energyGroup;
var energyCount = 5;
var islandGroup;
function preload() {
  endImage = loadImage("gameOver.png");

  player2Img = loadImage("tank.jpg")
  bgImage = loadImage("bg.jpg")
  islandImage = loadImage("islandImage1.png")
  bulletImg = loadImage("bullet1.png")
  up = loadImage("up.png")
  down = loadImage("down.png")
  left = loadImage("left.png")
  right = loadImage("right.png")


  //energyImage = loadImage("energy.png")
}

function setup() {
  createCanvas(600,800);
 invisibleground=createSprite(300,800,800,1);
 invisibleground.visible= true;

  bg = createSprite(300,400);
  bg.addImage(bgImage);
  bg.velocityY = 3;
  bg.scale = 3;

  center = createSprite(300,400,1,1);
  invisibleground.visible= true;

  
  
  var player1_options = {
    isStatic: true
  }
  player1 = createSprite(280,700,20,20,player1_options);
  player1.shapeColor = "yellow";
  player1.addImage(up);
  player1.scale = 0.06

  player2 = createSprite(280,50,20,20);
  player2.shapeColor = "blue";
  
  
  bulletGroup = createGroup();
  //energyGroup = createGroup();
  islandGroup = createGroup();
  score = 0;


}

function draw() {
  
  background(0);
  
  if(score === y) {
    x = x - 15;
    y = y*10;
  }

  if(energyCount === y1) {
    x = x - 15;
  }

 if(gameState === "play") {

  if(frameCount % 125 === 0){
    shootBullet();
  }

  score = score + Math.round(getFrameRate()/60);

  if(player1.collide(invisibleground)) {
    gameState = "end";
  }
 }



  if (player1.x > 600 || player1.x < 0) {
    player1.x = 300;
  }
 




  


  
  if(gameState === "end") {
    center.addImage(endImage);
    islandGroup.setVelocityYEach(0);
    bulletGroup.setVelocityYEach(0);
    island.depth = center.depth;
    center.depth = center.depth + 1;
    bg.velocityY = 0;
    player1.velocityX = 0;

  }
  console.log(player1.x);

  
  player2.x = player1.x;

  
  console.log(energyCount);
  if (bg.y > 600) {
    bg.y = 500;
  }

  

  if(bullet > length) {
    bulletGroup.destroyEach()
  }

  
  player1.velocityY=player1.velocityY+0.8;

  //if(player1.isTouching(energy)){
    //energyGroup.destroyEach();
    //energyCount = energyCount +1;
    //}
    //energySpawn();
    
    

    if(player1.collide(islandGroup)){
      player1.velocityY=0;
      energyCount = 5;
  }

  
  if(player1.collide(bulletGroup)) {
    velocityY = -7;
    player1.depth = player1.depth +1;
    player1.addImage(down);
    gameState = "end";
  }
 


    if(gameState === "notStarted") {
    player1.collide(invisibleground)
    }

    islands();
  drawSprites();
  textSize(20);
  stroke("black");
  text("Score: " + score, x,35);
  text("Jump: " + energyCount, x1, 65);
}

function islands() {
if(gameState != 'end') {
  if (frameCount % 70 === 0) {
  island = createSprite(200,200,5,5);
  island.addImage(islandImage);
  island.scale = 0.25;
  island.velocityY = 4;
  islandGroup.add(island);
  island.y = Math.round(random(1,10));
  island.x = Math.round(random(80,400));
  }
  }
}
function keyPressed() {
  if(gameState != "end") {
  if (keyIsDown(LEFT_ARROW)) {
    player1.velocityX = -5;
    player1.addImage(left);
    player1.scale = 0.06;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player1.velocityX = 5;
    player1.addImage(right);
    player1.scale = 0.06;
  }

  else if (keyIsDown(DOWN_ARROW)) {
    player1.velocityX = 0;
  }

  else if(keyIsDown(UP_ARROW) && player1.y >=100 && energyCount >= 1){
    player1.velocityY = -10;
    energyCount = energyCount -1;
    gameState = "play";
    player1.addImage(up);
    player1.scale = 0.06;
    }
  }
}

function shootBullet(){
if(gameState != "end") {
  bullet= createSprite(150, width/2, 50,20)
  bullet.x= player2.x-20
  bullet.y= player2.y
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityY= 7
  bulletGroup.add(bullet)
}
}
//function energySpawn(){

  //if (frameCount % 70 === 0) {
    //energy= createSprite(150, width/2, 50,20)
    //energy.addImage(energyImage)
    //energy.scale=0.3
    //energy.velocityY= 7
    //energyGroup.add(energy)

    //energy.y = Math.round(random(1,10));
    //energy.x = Math.round(random(50,600));
    //}
    
//}

