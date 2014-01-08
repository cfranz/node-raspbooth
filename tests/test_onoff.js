var Gpio = require('onoff').Gpio,
//    led = new Gpio(18, 'out'),
    button = new Gpio(17, 'in', 'both');

button.watch(function(err, value) {
    if (err) exit();
//    led.writeSync(value);
    button.read(function(err, value) {
      console.log('Button pressed - Value: ' + value);
    });
});

function exit() {
//    led.unexport();
    button.unexport();
    process.exit();
}

process.on('SIGINT', exit);
console.log('Gestartet');

