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

var playersConnected = 0;

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 50;
    playerdata.position.y = 1800 + i * 20;
    playerdata.keysDown = {};
    blueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    playerdata.keysDown = {};
    orangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 550;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsblueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsorangeteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 550;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsblueteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsorangeteam2[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 550;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsblueteam3[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    minionsorangeteam3[i] = playerdata;
}
for(var i = 0; i < 4; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
}

for(var i = 0; i < 6; i++)
{
    if (i = 0) {
    //bottom left most tower
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 70;
    playerdata.position.y = 1990;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
 } 

    if (i = 1) {
    //bottom right most tower
     var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 1400;
    playerdata.position.y = 1990;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;

    }

    if (i = 2) {
    //top left most tower
     var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 500;
    playerdata.position.y = 666;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;
        
    }

    if (i = 3) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 10;
    playerdata.position.y = 1332;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;  
    }

    if (i = 4) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;   
    }

    if (i = 5) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;   
    }

    if (i = 6) {
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    // playerdata.keysDown = {};
    bluetowers[i] = playerdata;   
    }

}








console.log(blueteam[0]);

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

        socket.emit('information', data2);

        // console.log(data2.minionsorangeteam[0].position.x);

        // console.log("client " + client.keysDown);
    });
});






//update function! :o
var update = function(delta) {


    for(var i = 0; i < 5; i++)
    {
        if(blueteam[i].keysDown.left == true)
        {
            if(blueteam[i].position.x > 50)
            {
                blueteam[i].position.x -= 80;
            }
        }
        if(blueteam[i].keysDown.right == true)
        {
            if(blueteam[i].position.x < 2400)
            {
                blueteam[i].position.x += 80;
            }
        }
        if(blueteam[i].keysDown.up == true)
        {
            if(blueteam[i].position.y < 1950)
            {
                blueteam[i].position.y += 80;
            }
        }
        if(blueteam[i].keysDown.down == true)
        {
            if(blueteam[i].position.y > 550)
            {
                blueteam[i].position.y -= 80;
            }
        }



        // minionsorangeteam[i].position.x += 6;
    }

    // minionsblueteam[i].position.x += 6;
    //     minionsblueteam3[i].position.y += 6;
    //     minionsblueteam2[i].position.x += 3;
    //     minionsblueteam2[i].position.y += 3;


    // for(loop through towers)
    // {
    //     for(minions1)
    //     {
    //         if(colliding)
    //         {
    //             //shoot the bullet
    //         }
    //     }
    //     for()
    // }


  // console.log("hay");
}


// begin the loop !
gameLoop()