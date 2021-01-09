var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, enemyGroup, fruit, fruitGroup;
var swordImage, microbeImage, gameoverImage, fruit1, fruit2, fruit3, fruit4;


function preload()
{

        swordImage = loadImage("sword.png");

        microbeImage = loadAnimation("alien1.png","alien2.png");

        fruit1 = loadImage("fruit1.png");
        fruit2 = loadImage("fruit2.png");
        fruit3 = loadImage("fruit3.png");
        fruit4 = loadImage("fruit4.png");

        gameoverImage = loadImage("gameover.png");

        sound1 = loadSound("knifeSwooshSound.mp3");
        sound2 = loadSound("gameover.mp3");
}

function setup()
{
        createCanvas(400,400);

        sword = createSprite(40,200,20,20);
        sword.addImage(swordImage);
        sword.scale = 0.7;
        sword.setCollider("rectangle",0,0,40,40);
        sword.debug = false;


        fruitGroup = createGroup();
        enemyGroup = createGroup();

        score = 0;

}

function draw()
{
  background(0);
  
  if (gameState === PLAY)
  {
    fruits();
    enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
              if (fruitGroup.isTouching(sword))
              {
                fruitGroup.destroyEach();
                sound1.play();
                
                score = score + 2;
              }
    
              else
            {
                
             if (enemyGroup.isTouching(sword))
             {
               gameState = END;
               sound2.play();
               

               fruitGroup.destroyEach();
               enemyGroup.destroyEach();
               
               fruitGroup.setVelocityXEach(0);
               enemyGroup.setVelocityXEach(0);

               sword.addImage(gameoverImage);
               sword.x = 200;
               sword.y = 200;
             }     
            }
   }
  
  drawSprites();
  
  textSize(30)
  fill("yellow");
  text("Fruit Ninja", 20,35);
  
  textSize(20);
  fill("red");
  strokeWeight(3);
  stroke(0);
  text("Score : "+ score,300,390);
  
}

function fruits()
{
    if(World.frameCount % 40 === 0)
    {
      fruit = createSprite(400,200,20,20);
      fruit.scale = 0.2;
      //fruit.debug = true;
      
    var r = Math.round(random(1,4));
    
              if(r === 1)
              {
                fruit.addImage(fruit1);
              }
              else if(r === 2)
              {
                fruit.addImage(fruit2);
              }
              else if(r === 3)
              {
                fruit.addImage(fruit3);
              }
               else
              {
                fruit.addImage(fruit4);
              }

              fruit.y = Math.round(random(50,340));
              
              fruit.velocityX = -10;
              fruit.setLifetime = 100;
      
              fruitGroup.add(fruit); 
    }
}

function enemy()
{
            if(World.frameCount % 300 === 0)
            {
              microbe = createSprite(400,200,20,20);
              microbe.addAnimation("moving",microbeImage);
              microbe.y = Math.round(random(100,300));
              microbe.velocityX = -17;
              microbe.setLifetime = 50;

              enemyGroup.add(microbe);
            }
  
}