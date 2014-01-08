var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server),
    gpio    = require('onoff').Gpio;

var button  = new gpio(17, 'in', 'both');

var images  = Array(
                '20130923-190133.jpg',
                '20131011-230203.jpg',
                '20131011-231522.jpg'
              );

server.listen(8080);

app.set('views', __dirname + "/views");
app.set('view engine', 'jade');

app.use(app.router);
app.use(express.static(__dirname + '/public'));
//app.use(app.errorHandler());


/*
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
*/

app.get('/', function(req, res){
  res.render('index', { title: 'PhotoBooth' });
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('countdown ready', function (data) {

    setTimeout(function() {
      var img = images[ Math.floor( Math.random() * images.length ) ];
      socket.emit('new photo', { "photo": img });
    }, 3000);
  });

});


button.watch(function(err, value) {
    if (err) exit();
    button.read(function(err, value) {
      console.log('Button pressed - Value: ' + value);

      if (value == 1) {
        io.sockets.emit('countdown start', { "duration": 5 });

//        var img = images[ Math.floor( Math.random() * images.length ) ];
//        io.sockets.emit('new photo', { "photo": img });
      };
      if (value == 0) {
//        var img = images[ Math.floor( Math.random() * images.length ) ];
//        io.sockets.emit('new photo', { "photo": img });
      };

    });
});

function exit() {
    button.unexport();
    process.exit();
}

process.on('SIGINT', exit);

console.log('Gestartet');
