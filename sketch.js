var bananaImage,obstacleImage,obstacle_group,bg,score,invisibleGround,score=0,count=0,jumpHeight=320;
var bananaGroup, obstacleGroup;


function preload() {
  backImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation('Monkey_01.png','Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png','Monkey_06.png','Monkey_07.png','Monkey_08.png','Monkey_09.png','Monkey_10.png');
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(200,200,12,12);
  bg.addImage("bg",backImage);
  bg.scale = 0.6;
  monkey = createSprite(50,200,10,10);
  monkey.addAnimation("monkey", player_running);
  monkey.scale = 0.1;
      invisibleGround = createSprite(200,358,400,5);
invisibleGround.visible = false; 
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  background(220);
    //console.log(bg.x);
  bg.velocityX = -2;
  if (bg.x < 95) {
   bg.x = 300; 
  }
  spawnBananas();
  spawnObstacles();
 count = count + round(World.frameRate/60); 
  //console.log(monkey.y);  
 if(keyDown("space") && monkey.y >= jumpHeight){
  
      monkey.velocityY = -14;
      //playSound("jump.mp3");
    } 
monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(invisibleGround);

  if(bananaGroup.collide(monkey,removeBanana)){ 
    score = score+2; 
  } 
  
  if(obstacleGroup.collide(monkey,handleCollition)){
    //console.log("touching");
    monkey.scale = 0.1;  
  }
  
                 
  drawSprites();
    stroke("red");
  textSize(20);
  fill("white");
  text("Score "+score,300,30);
  
  switch(score){
    case 10: 
      monkey.scale=0.12;
      break;
      case 20: 
      monkey.scale=0.14;
      jumpHeight = 310;
      //monkey.velocityY = -12;
      //monkey.velocityY = monkey.velocityY + 0.8;   
      break;
      case 30: 
      monkey.scale=0.16;
      jumpHeight = 300;
      break;
      case 40: monkey.scale=0.18; 
      break;
      default: break;         
  }
}

function handleCollition(spriteA,spriteB){
  spriteA.remove();
  
}
function removeBanana(spriteA, spriteB) {
  spriteA.remove();
}
function spawnBananas() {
  if(World.frameCount % 80 === 0) {
    var rand = random(300,200);
    var banana = createSprite(374,rand,1,1);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 134;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,330,10,40);                     
    obstacle.velocityX = -3;
    
    //generate random obstacles
    var rand = random(1,2);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.setCollider("circle",5,5,5);
    obstacleGroup.add(obstacle);      
    
    //assign scale and lifetime to the obstacle           
   
     obstacle.lifetime = 138;
  
    
  }
}