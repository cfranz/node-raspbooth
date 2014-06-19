/*
 * RaspBooth - Photobooth on a Raspberry Pi with node.js
 *
 * Download from https://github.com/cfranz/node-raspbooth
 *
 * For additional information see
 * ./README.md
 * ./INSTALL.md
 * ./LICENSE
 *
 */

var base    = __dirname;

var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server),
    gpio    = require('onoff').Gpio,
//    gphoto  = require('gphoto2'),
//    gphoto2 = new gphoto.GPhoto2(),
    spawn   = require("child_process").spawn,
    exec    = require("child_process").exec,
    fs      = require('fs'),
    sleep   = require('sleep'),
    config  = require(base + '/config/config.local.js'),
    moment  = require('moment'),
    mv      = require('mv');

/*
 * ! buttons 18-20 are not implemented yet
 * button17 => take a new photo
 * button18 => show the gallery
 * button19 => send link via email
 * button20 => print image
 */
var button_photo = new gpio(config.gpio_photo, 'in', 'both');

var photo_in_progress = false;
var messages = config.messages;

var current_photo = fs.readFileSync(base + '/config/current_photo','utf8');
var filename = "IMG_PB_" + String("0000" + current_photo).slice(-5) + ".jpg";
var filename_old = filename;


/*
 * for testing purposes, showing a predefined image instead of taking a new one
 */
var images  = Array(
                '20130923-190133.jpg',
                '20131011-230203.jpg',
                '20131011-231522.jpg',
                '20140216-230000.jpg'
              );

/*
 * server listening on tcp port 8080
 */
server.listen(8080);

app.set('views', __dirname + "/views");
app.set('view engine', 'jade');
app.use(app.router);
app.use(express.static(__dirname + '/public'));
//app.use(app.errorHandler());

/*
 * routing of urls
 */
app.get('/', function(req, res){
  res.render('index', {
                        title: config.title,
                        subtitle: config.subtitle
                      });
});


io.sockets.on('connection', function (socket) {

});



/*
 * actions
 */
function step_countdown() {
    console.log("step_countdown() - START");

    for (var c = config.countdown; c>=0; c--) {
        console.log("step_countdown() - VALUE " + c);
        io.sockets.emit('countdown', { "value": c });
        sleep.sleep(1);
    }

//    io.sockets.emit('message', { "value": "Test" });
    io.sockets.emit('message', { "value": messages[ Math.floor( Math.random() * messages.length ) ] });

    console.log("step_countdown() - END");
    step_photo();
};

function step_photo() {
    console.log("step_photo() - START");


//   var filename = "123.jpg"
//   var filename = moment().format("YYMMDD-HHmmss") + ".jpg";

    current_photo++;    
    filename_old = filename;
    filename = "IMG_PB_" + String("0000" + current_photo).slice(-5) + ".jpg";

    console.log("filename_old: " + filename_old);
    console.log("filename: " + filename);

    exec("echo " + current_photo + " > " + base + "/config/current_photo");
//    exec("sudo " + base + "/move_photo.sh >> " + base + "/move_photo.log");

    fs.exists('/opt/raspbooth/public/photo/' + filename_old, function(exists) {
      if (exists) {
        mv('/opt/raspbooth/public/photo/' + filename_old, '/media/usb/photo/' + filename_old, {mkdirp: true});
      }
    });

    var capture = exec("gphoto2 --capture-image-and-download --force-overwrite --filename=" + base + "/public/photo/" + filename,
        function(error, stdout, stderr) {
            io.sockets.emit('photo', { "photo": filename });
            step_ready();
        });

/*
    var capture = spawn("gphoto2", [
                    "--capture-image-and-download",
                    "--force-overwrite",
                    "--filename=/opt/raspbooth/public/photo/" + filename
                  ], {cwd: undefined});
    io.sockets.emit('photo', { "photo": filename });
*/

/*
    // testing only
    sleep.sleep(5);
    var img = images[ Math.floor( Math.random() * images.length ) ];
    io.sockets.emit('photo', { "photo": img });
*/

//    console.log("step_photo() - END");
//    step_ready();
};

function step_ready() {
    console.log("step_ready() - START");
//    io.sockets.emit('photo', { "photo": filename });
    photo_in_progress = false;

    exec("sudo chown pi:users /opt/raspbooth/public/photo/*");

    console.log("step_ready() - END");
};




/*
 * watch the button and take a new photo if it is pressed
 */

button_photo.watch(function(err, value) {
    if (err) exit();
    button_photo.read(function(err, value) {
        console.log('Button pressed - Value: ' + value);

        if (value == 1 && !photo_in_progress) {
            photo_in_progress = true;
            step_countdown();
//        io.sockets.emit('countdown start', { "duration": 5 });
        };
        if (value == 0) {};
    });
});


function exit() {
    button_photo.unexport();
    process.exit();
}

process.on('SIGINT', exit);

console.log('raspbooth.js - INIT done');

