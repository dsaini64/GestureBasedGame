//helper things to initiate
var socket = io.connect('172.16.1.160:5000');
// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x3498db,true);

// create a renderer instance
var renderer = new PIXI.autoDetectRenderer(1000, 600);

// add the renderer view element to the DOM
document.getElementById("gameView").appendChild(renderer.view);

requestAnimFrame( animate );








//global variables
var playerid = {team: 0, number: 0};

var keysDown = {
    left: false,
    right: false,
    up: false,
    down: false
};

var blueteamdata = [];

var orangeteamdata = [];

var blueteam = [];

var orangeteam = [];

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("player.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    blueteam.push(bunny);
}


for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("orange.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    orangeteam.push(bunny);
}

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("player.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0;
    bunny.scale.y = 0;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    blueteamdata.push(bunny);
}

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("orange.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0;
    bunny.scale.y = 0;

    // move the sprite to the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    orangeteamdata.push(bunny);
}

var minionsblueteamdata = [];

var minionsorangeteamdata = [];

var minionsblueteam = [];

var minionsorangeteam = [];

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("player.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0;
    bunny.scale.y = 0;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    minionsblueteamdata.push(bunny);
}

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("orange.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0;
    bunny.scale.y = 0;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    minionsorangeteamdata.push(bunny);
}

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("player.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0.5;
    bunny.scale.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    minionsblueteam.push(bunny);
}

for(var i = 0; i < 5; i++)
{
    // create a texture from an image path
    var texture = PIXI.Texture.fromImage("orange.png");
    // create a new Sprite using the texture
    var bunny = new PIXI.Sprite(texture);

    // center the sprites anchor point
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    bunny.scale.x = 0.5;
    bunny.scale.y = 0.5;

    // move the sprite t the center of the screen
    bunny.position.x = 200;
    bunny.position.y = 150;

    stage.addChild(bunny);

    minionsorangeteam.push(bunny);
}

var rectangletexture = PIXI.Texture.fromImage("images/map.jpg");

var topRect = new PIXI.Sprite(rectangletexture);
topRect.anchor.x = 0;
topRect.anchor.y = 0;
topRect.scale.x = 500;
topRect.scale.y = 500;
topRect.position.x = 0;
topRect.position.y = 0;
stage.addChild(topRect);

var botRect = new PIXI.Sprite(rectangletexture);
botRect.anchor.x = 0;
botRect.anchor.y = 0;
botRect.scale.x = 500;
botRect.scale.y = 500;
botRect.position.x = 0;
botRect.position.y = 500;
stage.addChild(botRect);

var leftRect = new PIXI.Sprite(rectangletexture);
leftRect.rotation = 90 * (Math.PI/180);
leftRect.anchor.x = 0;
leftRect.anchor.y = 0;
leftRect.scale.x = 500;
leftRect.scale.y = 500;
leftRect.position.x = 0;
leftRect.position.y = 0;
stage.addChild(leftRect);

var rightRect = new PIXI.Sprite(rectangletexture);
rightRect.rotation = 90 * (Math.PI/180);
rightRect.anchor.x = 0;
rightRect.anchor.y = 0;
rightRect.scale.x = 500;
rightRect.scale.y = 500;
rightRect.position.x = 500;
rightRect.position.y = 0;
stage.addChild(rightRect);





//SOCKET CALLBACKS (data = dict with stuff from the server)
socket.on('information', function (data)
{
    for(var i = 0; i < 5; i++)
    {
        blueteamdata[i].position = new PIXI.Point(data.blueteam[i].position.x,data.blueteam[i].position.y);
        orangeteamdata[i].position = new PIXI.Point(data.orangeteam[i].position.x,data.orangeteam[i].position.y);

        minionsblueteamdata[i].position = new PIXI.Point(data.minionsblueteam[i].position.x,data.minionsblueteam[i].position.y);
        minionsorangeteamdata[i].position = new PIXI.Point(data.minionsorangeteam[i].position.x,data.minionsorangeteam[i].position.y);
    }
});

socket.on('firstClientID', function (data)
{
    playerid.team = data.team;
    playerid.number = data.number;
});






//game start
socket.emit("firstConnect",{});


















//update
function animate() {

    requestAnimFrame( animate );

    // tell the server what keys im putting down

    socket.emit("clientKeys",{client:playerid, keys:keysDown});

    //find players data stuff
    var player;
    if(playerid.team == 0)
    {
        player = blueteamdata[playerid.number];
    }
    else if(playerid.team == 1)
    {
        player = orangeteamdata[playerid.number];
    }



    //SCROLLING THINGS
    for(var i = 0; i < 5; i++)
    {
        blueteam[i].position = new PIXI.Point(blueteamdata[i].position.x - (player.position.x - 500),blueteamdata[i].position.y - (player.position.y - 300));
        orangeteam[i].position = new PIXI.Point(orangeteamdata[i].position.x - (player.position.x - 500),orangeteamdata[i].position.y - (player.position.y - 300));

        minionsblueteam[i].position = new PIXI.Point(minionsblueteamdata[i].position.x - (player.position.x - 500),minionsblueteamdata[i].position.y - (player.position.y - 300));
        minionsorangeteam[i].position = new PIXI.Point(minionsorangeteamdata[i].position.x - (player.position.x - 500),minionsorangeteamdata[i].position.y - (player.position.y - 300));
    }

    topRect.position = new PIXI.Point(0 - (player.position.x - 500), 0 - (player.position.y - 300));
    botRect.position = new PIXI.Point(0 - (player.position.x - 500), 10 - (player.position.y - 300));
    leftRect.position = new PIXI.Point(0 - (player.position.x - 500), 0 - (player.position.y - 300));
    rightRect.position = new PIXI.Point(10 - (player.position.x - 500), 0 - (player.position.y - 300));






    // render the stage
    renderer.render(stage);
}



// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
    keysDown.right = false;
    keysDown.left = false;
    keysDown.up = false;
    keysDown.down = false;



    // console.log("ddd");

  if (frame.gestures.length > 0) {

    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];

      console.log("adsas");

      if (gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  console.log('leap right')
                  keysDown.right = true;

              } else {
                  swipeDirection = "left";
                  console.log('leap left');
                  keysDown.left = true;
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  console.log('leap up');
                  keysDown.up = true;
              } else {
                  swipeDirection = "down";
                  console.log('leap down');
                  keysDown.down = true;
              }
          }
       }
     }
  }

})




//helper functions

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 37) {
        keysDown.left = true;
        // console.log("left");
    }
    if(event.keyCode == 39) {
        keysDown.right = true;
    }
    if(event.keyCode == 40) {
        keysDown.up = true;
    }
    if(event.keyCode == 38) {
        keysDown.down = true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 37) {
        keysDown.left = false;
    }
    if(event.keyCode == 39) {
        keysDown.right = false;
    }
    if(event.keyCode == 40) {
        keysDown.up = false;
    }
    if(event.keyCode == 38) {
        keysDown.down = false;
    }
});