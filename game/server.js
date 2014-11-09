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
var minionsblueteam = [];
var minionsorangeteam = [];

var playersConnected = 0;

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 550;
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
    playerdata.keysDown = {};
    minionsblueteam[i] = playerdata;
}

for(var i = 0; i < 5; i++)
{
    var playerdata = {};
    playerdata.position = {};
    playerdata.position.x = 850;
    playerdata.position.y = 1800 + i * 20;
    playerdata.keysDown = {};
    minionsorangeteam[i] = playerdata;
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
            if(blueteam[i].position.x > 500)
            {
                blueteam[i].position.x -= 80;
            }
        }
        if(blueteam[i].keysDown.right == true)
        {
            if(blueteam[i].position.x < 3000)
            {
                blueteam[i].position.x += 80;
            }
        }
        if(blueteam[i].keysDown.up == true)
        {
            if(blueteam[i].position.y < 3000)
            {
                blueteam[i].position.y += 80;
            }
        }
        if(blueteam[i].keysDown.down == true)
        {
            if(blueteam[i].position.x > 500)
            {
                blueteam[i].position.y -= 80;
            }
        }

        minionsblueteam[i].position.x -= 6;

        minionsorangeteam[i].position.x += 6;
    }


  // console.log("hay");
}


// begin the loop !
gameLoop()