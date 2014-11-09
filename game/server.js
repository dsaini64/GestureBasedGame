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
var orangeshots = [];

var playersConnected = 0;

var obstacles = [];

var bluenexus = [];
var orangenexus = [];


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

    playerdata.cooldown = 0;
    orangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130 - i * 80;
    playerdata.position.y = 1900;

    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    minionsblueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450 + i*80;
    playerdata.position.y = 540;

    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    minionsorangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130 - i * 80;
    playerdata.position.y = 1900 + i * 80;

    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    minionsblueteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450 + i * 80;
    playerdata.position.y = 540 - i * 80

    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    minionsorangeteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 130;
    playerdata.position.y = 1900 + i * 80;

    playerdata.cooldown = 0;
    // playerdata.keysDown = {};
    minionsblueteam3[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2450;
    playerdata.position.y = 540 - i * 80;

    playerdata.cooldown = 0;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
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
    playerdata.health = 10;
    // playerdata.keysDown = {};
    orangetowers[i] = playerdata;

    }
}

for (i = 0; i < 1; i++) {

    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 500;
    playerdata.position.y = 1990;
    playerdata.health = 10;
    // playerdata.keysDown = {};
    orangenexus[i] = playerdata;

}
for (i = 0; i < 1; i++) {

    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 2300;
    playerdata.position.y = 1750;
    playerdata.health = 10;
    
    // playerdata.keysDown = {};
    bluenexus[i] = playerdata;

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
    playerdata.position.x = 1900;
    playerdata.position.y = 1200;

    obstacles[i] = playerdata;

    }
    if (i == 3) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1700;
    playerdata.position.y = 1300;

    obstacles[i] = playerdata;

    }

    if (i == 4) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1500;
    playerdata.position.y = 1600;

    obstacles[i] = playerdata;
    }
}








// console.log(blueteam[0]);

//handle client request
io.sockets.on('connection', function (socket) {
    //console.log("connect");
    socket.on('firstConnect', function (data) {
        playersConnected++;
        if(playersConnected <= 3)
        {
            socket.emit('firstClientID', {team: 0, number: playersConnected});
        }
        else
        {
            socket.emit('firstClientID', {team: 1, number: playersConnected-3});
        }
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
        data2.orangeshots = orangeshots;
        // console.log(data2.blueshots);

        data2.orangetowers = orangetowers;
        data2.obstacles = obstacles;
        data2.bluenexus = bluenexus;
        data2.orangenexus = orangenexus;


        socket.emit('information', data2);

        // console.log(client.position);

        // console.log(data2.minionsorangeteam[0].position.x);

        // console.log("client " + client.keysDown);
    });
});


function isInside(x, y, z1, z2, z3, z4) {
    x1 = Math.min(z1, z3);
    x2 = Math.max(z1, z3);
    y1 = Math.min(z2, z4);
    y2 = Math.max(z2, z4);
    if ((x1 <= x ) && ( x <= x2) && (y1 <= y) && (y <= y2))
    {
        console.log(x1 + "," + x + "," + x2);
        console.log(y1 + "," + y + "," + y2);
        return true;
    }
    else
    {
        return false;
    };
};



//update function! :o
var update = function(delta) {


    console.log(minionsblueteam.length);
    console.log(minionsblueteam2.length);
    console.log(minionsblueteam3.length);

    var topxmod = -400;
    var topymod = -100;
    var botxmod = 400;
    var botymod = 100;
    var towerhealth = 10;
    // for(var i = 0)












 for(var i = 0; i < blueshots.length; i++)
      {
        for(var j = 0; j < orangetowers.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: orangetowers[j].position.x, y: orangetowers[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // if(i == 0 && j == 0)
            // {
            // console.log(distance);
            // }

            if (distance < circle1.radius + circle2.radius)
            {
                orangetowers[j].health = orangetowers[j].health - 1;

                if(orangetowers[j].health == 0) {
                console.log("death");
                // thingsToDelete.push(i);
                blueshots[i].lifetime = 0;
                orangetowers[j].position.x = 8000;
                // break;
            }
            }
        }
    }









for(var i = 0; i < orangeshots.length; i++)
      {
        for(var j = 0; j < bluetowers.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: bluetowers[j].position.x, y: bluetowers[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // if(i == 0 && j == 0)
            // {
            // console.log(distance);
            // }

            if (distance < circle1.radius + circle2.radius)
            {
                bluetowers[j].health = bluetowers[j].health - 1;

                if(bluetowers[i].health == 0) {
                console.log("death");
                // thingsToDelete.push(i);
                orangeshots[i].lifetime = 0;
                bluetowers[j].position.x = 8000;
                // break;
            }
            }
        }
    }




    for(var i = 0; i < orangeshots.length; i++)
      {
        for(var j = 0; j < bluenexus.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: bluenexus[j].position.x, y: bluenexus[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // if(i == 0 && j == 0)
            // {
            // console.log(distance);
            // }

            if (distance < circle1.radius + circle2.radius)
            {
                bluenexus[j].health--;

                if(bluenexus[i].health == 0) {
                console.log("ORANGE TEAM WINS");
                // thingsToDelete.push(i);
                orangeshots[i].lifetime = 0;
                bluenexus[j].position.x = 8000;
                // break;
            }
            }
        }
    }


for(var i = 0; i < blueshots.length; i++)
      {
        for(var j = 0; j < orangenexus.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: orangenexus[j].position.x, y: orangenexus[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            // if(i == 0 && j == 0)
            // {
            // console.log(distance);
            // }

            if (distance < circle1.radius + circle2.radius)
            {
                orangenexus[j].health--;

                if(orangenexus[i].health == 0) {
                console.log("BLUE TEAM WINS");
                // thingsToDelete.push(i);
                blueshots[i].lifetime = 0;
                orangenexus[j].position.x = 8000;
                // break;
            }
            }
        }
    }





















    for(var i = 0; i < blueshots.length; i++)
      {
        for(var j = 0; j < orangeteam.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: orangeteam[j].position.x, y: orangeteam[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

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
                blueshots[i].lifetime = 0;
                orangeteam[j].position.x = 8000;
                // break;
            }
        }
    }















for(var i = 0; i < orangeshots.length; i++)
      {
        for(var j = 0; j < blueteam.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: blueteam[j].position.x, y: blueteam[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

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
                orangeshots[i].lifetime = 0;
                blueteam[j].position.x = 8000;
                blueteam[j].position.y = 8000;
                // break;
            }
        }
    }








    for(var i = 0; i < 5; i++)
    {
        blueteam[i].cooldown -= 1;
        if(blueteam[i].keysDown.left == true)
        {
            if(blueteam[i].position.x > 50)
            {
                var isok = true;
                var tempx = blueteam[i].position.x - 8;
                var tempy = blueteam[i].position.y;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }

                if(isok) {
                blueteam[i].position.x -= 8;
            }
            }

        }
        if(blueteam[i].keysDown.right == true)
        {
            if(blueteam[i].position.x < 2400)
            {
                var isok = true;
                var tempx = blueteam[i].position.x + 8;
                var tempy = blueteam[i].position.y;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        console.log("collided");
                        isok = false;
                    }

                }

                // console.log(isok);

                if(isok)
                {
                    blueteam[i].position.x += 8;
                }
            }
        }
        if(blueteam[i].keysDown.up == true)
        {
            if(blueteam[i].position.y < 1950)
            {
                 var isok = true;
                var tempx = blueteam[i].position.x
                var tempy = blueteam[i].position.y + 8 ;

                // console.log(tempy);

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                   // console.log(tempy);
                   // console.log(tempx + " " + tempy + " " + topx + " " + topy + " " + botx + " " + boty);
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }



                if(isok) {
                blueteam[i].position.y += 8;
            }
            }
        }
        if(blueteam[i].keysDown.down == true)
        {
            if(blueteam[i].position.y > 550)
            {
                 var isok = true;
                var tempx = blueteam[i].position.x;
                var tempy = blueteam[i].position.y - 8;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                   if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }

                if(isok) {
                blueteam[i].position.y -= 8;
            }
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



        orangeteam[i].cooldown -= 1;
        if(orangeteam[i].keysDown.left == true)
        {
            if(orangeteam[i].position.x > 50)
            {
                var isok = true;
                var tempx = orangeteam[i].position.x - 8;
                var tempy = orangeteam[i].position.y;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }

                if(isok) {
                orangeteam[i].position.x -= 8;
            }
            }

        }
        if(orangeteam[i].keysDown.right == true)
        {
            if(orangeteam[i].position.x < 2400)
            {
                var isok = true;
                var tempx = orangeteam[i].position.x + 8;
                var tempy = orangeteam[i].position.y;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        console.log("collided");
                        isok = false;
                    }

                }

                // console.log(isok);

                if(isok)
                {
                    orangeteam[i].position.x += 8;
                }
            }
        }
        if(orangeteam[i].keysDown.up == true)
        {
            if(orangeteam[i].position.y < 1950)
            {
                 var isok = true;
                var tempx = orangeteam[i].position.x
                var tempy = orangeteam[i].position.y + 8 ;

                // console.log(tempy);

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                   // console.log(tempy);
                   // console.log(tempx + " " + tempy + " " + topx + " " + topy + " " + botx + " " + boty);
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }



                if(isok) {
                orangeteam[i].position.y += 8;
            }
            }
        }
        if(orangeteam[i].keysDown.down == true)
        {
            if(orangeteam[i].position.y > 550)
            {
                 var isok = true;
                var tempx = orangeteam[i].position.x;
                var tempy = orangeteam[i].position.y - 8;

                for (var x = 0; x < 5; x++) {
                   var topx = obstacles[x].position.x + topxmod;
                   var topy = obstacles[x].position.y + topymod;
                   //Edit botx and boty to have exact value
                   var botx = obstacles[x].position.x + botxmod;
                   var boty = obstacles[x].position.y + botymod;
                    if(isInside(tempx,tempy,topx,topy,botx,boty))
                    {
                        isok = false;
                    }

                }

                if(isok) {
                orangeteam[i].position.y -= 8;
            }
            }
        }
        if(orangeteam[i].keysDown.q == true)
        {
            // console.log("#fuckitshipit");
            if(orangeteam[i].cooldown <= 0)
            {
                // blueteam[i].position.y -= 80;
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = orangeteam[i].position.x;
                playerdata.position.y = orangeteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

            }
        }



        // minionsorangeteam[i].position.x += 6;
    }

    for(var i = 0; i < minionsblueteam.length; i++)
    {
        minionsblueteam[i].cooldown -= 1;
        if(minionsblueteam[i].position.x < 2400)
        {

            if (MinionCheckForEnemy(minionsblueteam[i].position.x, minionsblueteam[i].position.y, minionsorangeteam3[i].position.x, minionsorangeteam3[i].position.y)) {
                // console.log("Shooting mode");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsblueteam[i].position.x;
                playerdata.position.y = minionsblueteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);
            }
            minionsblueteam[i].position.x += 6;


        }
        else
        {
            if (MinionCheckForEnemy(minionsblueteam[i].position.x, minionsblueteam[i].position.y, minionsorangeteam[i].position.x, minionsorangeteam[i].position.y)) {
                // console.log("Shooting Mode");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsblueteam[i].position.x;
                playerdata.position.y = minionsblueteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);

            }
            minionsblueteam[i].position.y -= 6;
        }
    }
    for(var i = 0; i < minionsblueteam2.length; i++)
    {
        minionsblueteam2[i].cooldown -= 1;

         if (MinionCheckForEnemy(minionsblueteam2[i].position.x, minionsblueteam2[i].position.y, minionsorangeteam2[i].position.x, minionsorangeteam2[i].position.y)) {
            // console.log("Shooting mode");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsblueteam2[i].position.x;
                playerdata.position.y = minionsblueteam2[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "right";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);
            }
        minionsblueteam2[i].position.x += 5;
        minionsblueteam2[i].position.y -= 3;
    }
    for(var i = 0; i < minionsblueteam3.length; i++)
    {
        minionsblueteam3[i].cooldown -= 1;

        if(minionsblueteam3[i].position.y > 550)
        {

            if (MinionCheckForEnemy(minionsblueteam3[i].position.x, minionsblueteam3[i].position.y, minionsorangeteam[i].position.x, minionsorangeteam[i].position.y)) {
               // console.log("Shooting Mode");
               var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsblueteam3[i].position.x;
                playerdata.position.y = minionsblueteam3[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "right";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);

            }
            minionsblueteam3[i].position.y -= 6;
        }
        else
        {
            if (MinionCheckForEnemy(minionsblueteam3[i].position.x, minionsblueteam3[i].position.y, minionsorangeteam[i].position.x, minionsorangeteam[i].position.y)) {
                // console.log("Shooting Mode");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsblueteam3[i].position.x;
                playerdata.position.y = minionsblueteam3[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "right";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                blueshots.push(playerdata);

            }
            minionsblueteam3[i].position.x += 6;
        }
    }

    for(var i = 0; i < minionsorangeteam.length; i++)
    {
        minionsorangeteam[i].cooldown -= 1;

        if(minionsorangeteam[i].position.x > 50)
        {
        if (MinionCheckForEnemy(minionsorangeteam[i].position.x, minionsorangeteam[i].position.y, minionsblueteam3[i].position.x, minionsblueteam3[i].position.y)) {
           // console.log("Shooting Modwse");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsorangeteam[i].position.x;
                playerdata.position.y = minionsorangeteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

        }
        minionsorangeteam[i].position.x -= 6;
        }
        else
        {
        if (MinionCheckForEnemy(minionsorangeteam[i].position.x, minionsorangeteam[i].position.y, minionsblueteam3[i].position.x, minionsblueteam3[i].position.y)) {
            // console.log("Shooting Mode");
            var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsorangeteam[i].position.x;
                playerdata.position.y = minionsorangeteam[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

        }
        minionsorangeteam[i].position.y += 6;
        }
    }
    for(var i = 0; i < minionsorangeteam2.length; i++)
    {
        minionsorangeteam2[i].cooldown -= 1;
    if (MinionCheckForEnemy(minionsorangeteam2[i].position.x, minionsorangeteam2[i].position.y, minionsblueteam2[i].position.x, minionsblueteam2[i].position.y)) {
        // console.log("Shoot Mode");
        var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsorangeteam2[i].position.x;
                playerdata.position.y = minionsorangeteam2[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

    }
    minionsorangeteam2[i].position.x -= 5;
        minionsorangeteam2[i].position.y += 3;
    }
    for(var i = 0; i < minionsorangeteam3.length; i++)
    {
        minionsorangeteam3[i].cooldown -= 1;
        if(minionsorangeteam3[i].position.y < 1950)
        {
            if (MinionCheckForEnemy(minionsorangeteam3[i].position.x, minionsorangeteam3[i].position.y, minionsblueteam[i].position.x, minionsblueteam[i].position.y)) {
                // console.log("Shoot Mode");
                // console.log("");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsorangeteam3[i].position.x;
                playerdata.position.y = minionsorangeteam3[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

            }
            minionsorangeteam3[i].position.y += 6;
        }

        else
        {
            if (MinionCheckForEnemy(minionsorangeteam3[i].position.x, minionsorangeteam3[i].position.y, minionsblueteam[i].position.x, minionsblueteam[i].position.y)) {
                // console.log("Shoot Mode");
                var playerdata = {};
                playerdata.position = {};
                playerdata.position.x = minionsorangeteam3[i].position.x;
                playerdata.position.y = minionsorangeteam3[i].position.y;
                // playerdata.keysDown = {};
                playerdata.direction = "left";//orangeteam[i].keysDown.recent;
                // blueshots[direction] = "right";
                orangeteam[i].cooldown = 10;
                playerdata.lifetime = 8;
                orangeshots.push(playerdata);

            }
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

    for(var i = 0; i < orangeshots.length; i++)
    {
        // console.log(blueshots[i]);
        orangeshots[i].lifetime -= 1;

        if(orangeshots[i].direction == "right")
        {
            orangeshots[i].position.x += 30;
        }
        if(orangeshots[i].direction == "left")
        {
            orangeshots[i].position.x -= 30;
        }
        if(orangeshots[i].direction == "up")
        {
            orangeshots[i].position.y += 30;
        }
        if(orangeshots[i].direction == "down")
        {
            orangeshots[i].position.y -= 30;
        }

        if(orangeshots[i].lifetime < 0)
        {
            orangeshots.splice(i,1);
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
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsorangeteam[j].position.x, y: minionsorangeteam[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

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
                blueshots[i].lifetime = 0;
                minionsorangeteam[j].position.x = 2540;
                minionsorangeteam[j].position.y = 540;
                // break;
            }
        }
        for(var j = 0; j < minionsorangeteam2.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsorangeteam2[j].position.x, y: minionsorangeteam2[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

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
                minionsorangeteam2[j].position.x = 2540;
                minionsorangeteam2[j].position.y = 540;
                // break;
            }
        }
        for(var j = 0; j < minionsorangeteam3.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsorangeteam3[j].position.x, y: minionsorangeteam3[j].position.y};
            var circle2 = {radius: 25, x: blueshots[i].position.x, y: blueshots[i].position.y};

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
                minionsorangeteam3[j].position.x = 2540;
                minionsorangeteam3[j].position.y = 540;
                // break;
            }
        }
      }

      // for(var i = 0; i < thingsToDelete.length; i++)
      // {
      //   if(thingsToDelete[i])
      // }


      for(var i = 0; i < orangeshots.length; i++)
      {
        for(var j = 0; j < minionsblueteam.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsblueteam[j].position.x, y: minionsblueteam[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

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
                orangeshots[i].lifetime = 0;
                minionsblueteam[j].position.x = 130;
                minionsblueteam[j].position.y = 1900;
                // break;
            }
        }
        for(var j = 0; j < minionsblueteam2.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsblueteam2[j].position.x, y: minionsblueteam2[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

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
                orangeshots[i].lifetime = 0;
                minionsblueteam2[j].position.x = 130;
                minionsblueteam2[j].position.y = 1900;
                // break;
            }
        }
        for(var j = 0; j < minionsblueteam3.length; j++)
        {
            // console.log("Asdaishdioasdhas");
            var circle1 = {radius: 25, x: minionsblueteam3[j].position.x, y: minionsblueteam3[j].position.y};
            var circle2 = {radius: 25, x: orangeshots[i].position.x, y: orangeshots[i].position.y};

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
                orangeshots[i].lifetime = 0;
                minionsblueteam3[j].position.x = 130;
                minionsblueteam3[j].position.y = 1900;
                // break;
            }
        }
      }





    for(var i = 0; i < orangetowers.length; i++)
    {


         for(var j = 0; j < minionsblueteam.length; j++)
          {
            var circle1 = {radius: 200, x: minionsblueteam[j].position.x, y: minionsblueteam[j].position.y};
            var circle2 = {radius: 100, x: orangetowers[i].position.x, y: orangetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);



            if (distance < circle1.radius + circle2.radius) {
                if(orangetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = orangetowers[i].position.x;
                    playerdata.position.y = orangetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "right";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    orangeshots.push(playerdata);
                    cooldown = 10;
                }
            }


          }

          for(var j = 0; j < minionsblueteam2.length; j++)
          {
            var circle1 = {radius: 100, x: minionsblueteam2[j].position.x, y: minionsblueteam2[j].position.y};
            var circle2 = {radius: 100, x: orangetowers[i].position.x, y: orangetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                if(orangetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = orangetowers[i].position.x;
                    playerdata.position.y = orangetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "left";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    orangeshots.push(playerdata);
                    cooldown = 10;
                }
            }
          }

          for(var j = 0; j < minionsblueteam3.length; j++)
          {
            var circle1 = {radius: 100, x: minionsblueteam3[j].position.x, y: minionsblueteam3[j].position.y};
            var circle2 = {radius: 100, x: orangetowers[i].position.x, y: orangetowers[i].position.y};

            var dx = circle1.x - circle2.x;
            var dy = circle1.y - circle2.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < circle1.radius + circle2.radius) {
                if(orangetowers[i].cooldown <= 0)
                {
                    var playerdata = {};
                    playerdata.position = {};
                    playerdata.position.x = orangetowers[i].position.x;
                    playerdata.position.y = orangetowers[i].position.y;
                    // playerdata.keysDown = {};
                    playerdata.direction = "left";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    orangeshots.push(playerdata);
                    cooldown = 10;
                }
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
                    cooldown = 10;
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
                    cooldown = 10;
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
                    playerdata.direction = "up";
                    // blueshots[direction] = "right";
                    // blueteam[i].cooldown = 10;
                    playerdata.lifetime = 8;
                    blueshots.push(playerdata);
                    cooldown = 10;
                }
            }
          }



      function MinionCheckForEnemy(minionx, miniony, enemyminionx, enemyminiony) {
        var circleradius = 100;
        var dx = minionx - enemyminiony;
        var dy = miniony - enemyminiony;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circleradius + circleradius) {

            // console.log("WE HAVE A FUCKING MINON DETECTION")

            console.log("WE HAVE A FUCKING MINON DETECTION")
            return true;
        }

      }



      function CheckForBulletHit(playerx, playery, bulletx, bullety) {
        var circleradius = 60;
        var dx = playerx - bullety;
        var dy = playery - bullety;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circleradius + circleradius) {
            console.log("WE HAVE A FUCKING MINON BULLET HIT")

            return true;
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
    }






  // console.log("hay");
}
// begin the loop !
gameLoop();
