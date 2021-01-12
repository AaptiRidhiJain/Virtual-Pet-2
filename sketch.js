var dog, database, foodS, foodStock;
var dogImage, happyDogImage;
var addFood,feed;
var fedTime,lastFed;
var food;
var currentTime;

function preload()
{  
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500);
  
  dog = createSprite(250,290);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    fedTime = data.val();
  });

  food = new Food(200,200,10,10);

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  // fedTime = database.ref('feedTime');
  // fedTime.on("value",function(data){
  //   fedTime = data.val();
  // });
}


function draw() {  
  currentTime = hour();
  background(46,139,87);  
  food.display();
  drawSprites();
  textSize(20);
  fill("white");
  text("Food Remaining: " + foodS,170,100);

  fill(255,255,254);
  textSize(15);
  if(fedTime >= 12){
    text("Last Feed: " + fedTime % 12 + " PM",350,30);
  }
  else if(fedTime == 0){
    text("Last Feed: 12 AM",350,30);
  }
  else{
    text("Last Feed: " + fedTime + " AM",350,30)
  }

 
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodS--;
  if(foodS<=0){
    foodS = 0;
  }
  database.ref('/').update({
    Food:foodS,
  })
  fedTime=hour()
}

function addFoods(){
  dog.addImage(dogImage);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
