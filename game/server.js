var fs = require("fs");
var host = "172.16.1.160";
var port = 5000;
var express = require("express");
var app = express();
//app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "")); //use static files in ROOT/public folder
app.get("/", function(request, response){ //root dir
    response.send("Hello!!");
});
var io = require('socket.io').listen(app.listen(process.env.PORT || port));


var tickLengthMs = 1000 / 20

/* gameLoop related variables */
// timestamp of each loop
var previousTick = Date.now();
// number of times gameLoop gets called
var actualTicks = 0;

var gameLoop = function () {
  var now = Date.now();

  actualTicks++;
  if (previousTick + tickLengthMs <= now)
  {
    var delta = (now - previousTick) / 1000;
    previousTick = now;

    update(delta);

    // console.log('delta', delta, '(target: ' + tickLengthMs +' ms)', 'node ticks', actualTicks)
    actualTicks = 0;
  }

  if (Date.now() - previousTick < tickLengthMs - 16)
  {
    setTimeout(gameLoop);
  }
  else
  {
    setImmediate(gameLoop)
  }
}









//now here is where the code is fun. enjoy!









//global vars
var blueteam = [];
var orangeteam = [];

var bluetowers = [];
var orangetowers = [];

var minionsblueteam = [];
var minionsorangeteam = [];

var minionsblueteam2 = [];
var minionsorangeteam2 = [];

var minionsblueteam3 = [];
var minionsorangeteam3 = [];

var blueshots = [];

var playersConnected = 0;

var obstacles = [];


for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130;
    playerdata.position.y = 1900;
    playerdata.keysDown = {};
    // playerdata.
    playerdata.cooldown = 0;
    blueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450;
    playerdata.position.y = 540;
    playerdata.keysDown = {};
    orangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130 - i * 80;
    playerdata.position.y = 1900;
    // playerdata.keysDown = {};
    minionsblueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450 + i*80;
    playerdata.position.y = 540;
    // playerdata.keysDown = {};
    minionsorangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130 - i * 80;
    playerdata.position.y = 1900 + i * 80;
    // playerdata.keysDown = {};
    minionsblueteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450 + i * 80;
    playerdata.position.y = 540 - i * 80
    // playerdata.keysDown = {};
    minionsorangeteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130;
    playerdata.position.y = 1900 + i * 80;
    // playerdata.keysDown = {};
    minionsblueteam3[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450;
    playerdata.position.y = 540 - i * 80;
    // playerdata.keysDown = {};
    minionsorangeteam3[i] = playerdata;
}
// for(var i = 0; i < 4; i++)
// {
//     var playerdata = {};
//     playerdata.position = {};
//     playerdata.position.x = 850;
//     playerdata.position.y = 1800 + i * 20;
//     // playerdata.keysDown = {};
//     bluetowers[i] = playerdata;
// }

for(var i = 0; i < 6; i++)
{
    if (i == 0) {
    //bottom left most tower
    var playerdata = {};
    playerdata.position = {};
    // playerdata.position.x = 70;
    // playerdata.position.y = 1990;
     playerdata.position.x = 1800;
     playerdata.cooldown = 0;
    playerdata.position.y = 1750;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
 }

    if (i == 1) {
    //bottom right most tower
     var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1200;
    playerdata.position.y = 1750;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;

    }

    if (i == 2) {
    //top left most tower
     var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 260;
    playerdata.position.y = 1500;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;

    }

    if (i == 3) {
    //top right most tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 260;
    playerdata.position.y = 1000;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
    }

    if (i == 4) {
    //mid left most tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 700;
    playerdata.position.y = 1500;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
    }

    if (i == 5) {
    //mid right most tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 4000;
    playerdata.position.y = 4000;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
    }

}

for(var i=0; i < 6; i++ ) {
    if(i == 0) {
    //right 1st bottom
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2200;
    playerdata.position.y = 1000;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
    if(i == 1) {

        //right 2nd bottom
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2200;
    playerdata.cooldown = 0;
    playerdata.position.y = 1500;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
    if(i == 2 ){

    //mid 1st tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1970;
    playerdata.position.y = 1000;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
    if(i == 3) {
        //mid 2nd tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 4000;
    playerdata.position.y = 4000;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
    if(i == 4) {

    //top 1st tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1970;
    playerdata.position.y = 540;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
    if(i == 5) {
        //top 1st tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1170;
    playerdata.position.y = 540;
    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
}
for (i = 0; i < 5; i++ ) {

    if (i == 0) {

    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 800;
    playerdata.position.y = 700;

    obstacles[i] = playerdata;

    }
    if (i == 1) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1800;
    playerdata.position.y = 700;

    obstacles[i] = playerdata;

    }
    if (i == 2) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1200;
    playerdata.position.y = 1200;

    obstacles[i] = playerdata;

    }
    if (i == 3) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1400;
    playerdata.position.y = 1300;

    obstacles[i] = playerdata;

    }

    if (i == 4) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1200;
    playerdata.position.y = 1500;

    obstacles[i] = playerdata;
    }
}







// console.log(blueteam[0]);

//handle client request
io.sockets.on('connection', function (socket) {
    //console.log("connect");
    socket.on('firstConnect', function (data) {
        playersConnected++;
        socket.emit('firstClientID', {team: 0, number: playersConnected});
        // console.log("someone connected.");
    });

    socket.on('clientKeys', function (data) {
        // console.log(data.client.number);
        var client;
        if(data.client.team == 0)
        {
            client = blueteam[data.client.number];
            // console.log(client);
        }
        else if(data.client.team == 1)
        {
            client = orangeteam[data.client.number];
        }
        // console.log(client);
        client.keysDown = data.keys;

        var data2 = {};
        data2.blueteam = blueteam;
        data2.orangeteam = orangeteam;
        data2.minionsblueteam = minionsblueteam;
        data2.minionsorangeteam = minionsorangeteam;
        data2.minionsblueteam2 = minionsblueteam2;
        data2.minionsorangeteam2 = minionsorangeteam2;
        data2.minionsblueteam3 = minionsblueteam3;
        data2.minionsorangeteam3 = minionsorangeteam3;
        data2.bluetowers = bluetowers;
        data2.blueshots = blueshots;
        // console.log(data2.blueshots);

        data2.orangetowers = orangetowers;
        data2.obstacles = obstacles;


        socket.emit('information', data2);

        // console.log(client.position);

        // console.log(data2.minionsorangeteam[0].position.x);

        // console.log("client " + client.keysDown);
    });
});






//update function! :o
var update = function(delta) {
    // for(var i = 0)



    for(var i = 0; i < 5; i++)
    {
        blueteam[i].cooldown -= 1;
        if(blueteam[i].keysDown.left == true)
        {
            if(blueteam[i].position.x > 50)
            {
                blueteam[i].position.x -= 8;
            }
        }
        if(blueteam[i].keysDown.right == true)
        {
            if(blueteam[i].position.x < 2400)
            {
                blueteam[i].position.x += 8;
            }
        }
        if(blueteam[i].keysDown.up == true)
        {
            if(blueteam[i].position.y < 1950)
            {
                blueteam[i].position.y += 8;
            }
        }
        if(blueteam[i].keysDown.down == true)
        {
            if(blueteam[i].position.y > 550)
            {
                blueteam[i].position.y -= 8;
            }
        }
        if(blueteam[i].keysDown.q == true)
        {
            // console.log("#fuckitshipit");
            if(blueteam[i].cooldown <= 0)
            {
                // blueteam[i].position.y -= 80;
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = blueteam[i].position.x;
                playerdata.position.y = blueteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = blueteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                blueteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);

            }
        }



        // minionsorangeteam[i].position.x += 6;
    }

    for(var i = 0; i < minionsblueteam.length; i++)
    {
        if(minionsblueteam[i].position.x < 2400)
        {
            minionsblueteam[i].position.x += 6;
        }
        else
        {
            minionsblueteam[i].position.y -= 6;
        }
    }
    for(var i = 0; i < minionsblueteam2.length; i++)
    {
        minionsblueteam2[i].position.x += 5;
        minionsblueteam2[i].position.y -= 3;
    }
    for(var i = 0; i < minionsblueteam3.length; i++)
    {
        if(minionsblueteam3[i].position.y > 550)
        {
            minionsblueteam3[i].position.y -= 6;
        }
        else
        {
            minionsblueteam3[i].position.x += 6;
        }
    }

    for(var i = 0; i < minionsorangeteam.length; i++)
    {
        if(minionsorangeteam[i].position.x > 50)
        {
            minionsorangeteam[i].position.x -= 6;
        }
        else
        {
            minionsorangeteam[i].position.y += 6;
        }
    }
    for(var i = 0; i < minionsblueteam2.length; i++)
    {
        minionsorangeteam2[i].position.x -= 5;
        minionsorangeteam2[i].position.y += 3;
    }
    for(var i = 0; i < minionsorangeteam3.length; i++)
    {
        if(minionsorangeteam3[i].position.y < 1950)
        {
            minionsorangeteam3[i].position.y += 6;
        }
        else
        {
            minionsorangeteam3[i].position.x -= 6;
        }
    }


    for(var i = 0; i < blueshots.length; i++)
    {
        // console.log(blueshots[i]);
        blueshots[i].lifetime -= 1;

        if(blueshots[i].direction == "right")
        {
            blueshots[i].position.x += 30;
        }
        if(blueshots[i].direction == "left")
        {
            blueshots[i].position.x -= 30;
        }
        if(blueshots[i].direction == "up")
        {
            blueshots[i].position.y += 30;
        }
        if(blueshots[i].direction == "down")
        {
            blueshots[i].position.y -= 30;
        }

        if(blueshots[i].lifetime < 0)
        {
            blueshots.splice(i,1);
        }
    }



    for(var i = 0; i < bluetowers.length; i++)
    {
        bluetowers[i].cooldown -= 1;
    }

    var thingsToDelete = [];

    for(var i = 0; i < blueshots.length; i++)
      {
        for(var j = 0; j < minionsorangeteam.length; j++)
        {
            console.log("Asdaishdioasdhas");
            var circle1 = {radius: 100, x: minionsorangeteam[j].position.x, y: minionsorangeteam[j].position.y};
            var circle2 = {radius: 100, x: blueshots[i].position.x, y: blueshots[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // if(i == 0 && j == 0)
            // {
            // console.log(distance);
            // }

            if (distance < circle1.radius + circle2.radius)
            {
                console.log("death");
                // thingsToDelete.push(i);
                // minionsorangeteam[]
                // break;
            }
        }
      }

      // for(var i = 0; i < thingsToDelete.length; i++)
      // {
      //   if(thingsToDelete[i])
      // }





    for(var i = 0; i < bluetowers.length; i++)
    {


         for(var j = 0; j < minionsblueteam.length; j++)
          {
            var circle1 = {radius: 100, x: minionsblueteam[j].position.x, y: minionsblueteam[j].position.y};
            var circle2 = {radius: 100, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);



            if (distance < circle1.radius + circle2.radius) {
                // collision detected! Shoot Bullets!


            }


          }

          for(var j = 0; j < minionsblueteam2.length; j++)
          {
            var circle1 = {radius: 100, x: minionsblueteam2[j].position.x, y: minionsblueteam2[j].position.y};
            var circle2 = {radius: 100, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                // collision detected!
                // console.log("hell yeah!");s
            }
          }

          for(var j = 0; j < minionsblueteam3.length; j++)
          {
            var circle1 = {radius: 100, x: minionsblueteam3[j].position.x, y: minionsblueteam3[j].position.y};
            var circle2 = {radius: 100, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                // collision detected!
                // console.log("hell yeah!");
            }
          }


          for(var j = 0; j < minionsorangeteam.length; j++)
          {
            var circle1 = {radius: 100, x: minionsorangeteam[j].position.x, y: minionsorangeteam[j].position.y};
            var circle2 = {radius: 200, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);



            if (distance < circle1.radius + circle2.radius) {
                // collision detected!
                if(bluetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = bluetowers[i].position.x;
                    playerdata.position.y = bluetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "left";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    blueshots.push(playerdata);
                    cooldown = 3;
                }

            }


          }

          for(var j = 0; j < minionsorangeteam2.length; j++)
          {
            var circle1 = {radius: 100, x: minionsorangeteam2[j].position.x, y: minionsorangeteam2[j].position.y};
            var circle2 = {radius: 200, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                // collision detected!
                // console.log("hell yeah!");

                if(bluetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = bluetowers[i].position.x;
                    playerdata.position.y = bluetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "up";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    blueshots.push(playerdata);
                    cooldown = 3;
                }
            }
          }

          for(var j = 0; j < minionsorangeteam3.length; j++)
          {
            var circle1 = {radius: 100, x: minionsorangeteam3[j].position.x, y: minionsorangeteam3[j].position.y};
            var circle2 = {radius: 200, x: bluetowers[i].position.x, y: bluetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                // collision detected!
                // console.log("hell yeah!");
                if(bluetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = bluetowers[i].position.x;
                    playerdata.position.y = bluetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "down";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    blueshots.push(playerdata);
                    cooldown = 3;
                }
            }
          }


        var circle={x:100,y:290,r:10};
        var rect={x:100,y:100,w:40,h:100};



        // return true if the rectangle and circle are colliding
        function RectCircleColliding(circle,rect){
            var distX = Math.abs(circle.x - rect.x-rect.w/2);
            var distY = Math.abs(circle.y - rect.y-rect.h/2);

            if (distX > (rect.w/2 + circle.r)) { return false; }
            if (distY > (rect.h/2 + circle.r)) { return false; }

            if (distX <= (rect.w/2)) { return true; }
            if (distY <= (rect.h/2)) { return true; }

            var dx=distX-rect.w/2;
            var dy=distY-rect.h/2;
            return (dx*dx+dy*dy<=(circle.r*circle.r));
        }

      }



        //     var blueCircle = {radius: minionsblueteam[j].radius, x: minionsblueteam[j].position.x, y: minionsblueteam.position.y};
        //     var orangeCircle = {radius: minionsorangeteam[j].radius, x: minionsorangeteam[j].position.x, y: minionsorangeteam.position.y};


        //     var dx = blueCircle.x - orangeCircle.x;
        //     var dy = blueCircle.y - orangeCircle.y;
        //     var distance = Math.sqrt(dx * dx + dy * dy);

        //     if (distance < blueCircle.radius + orangeCircle.radius) {
        //         // collision detected!shoot the bullet!
        //     }


        // }

        // }






  // console.log("hay");
}
// begin the loop !
gameLoop();
