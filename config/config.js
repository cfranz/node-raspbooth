/***
 *** 
 *** This file contains the default values
 *** for the application.
 ***
 *** If you like to change the values,
 *** please add them to 'config.locale.js'
 *** in the same folder.
 ***
 ***/

var config = {};

/*
 * Basic settings for the server
 */

config.host = 'raspbooth';
config.port = '8080';


/*
 * Define the GPIO-Ports for the actions
 */

config.gpio_photo   = '17';
config.gpio_gallery = '18';
config.gpio_email   = '19';
config.gpio_print   = '20';


/*
 * Other configuration
 */

// Title of the frontend
config.title = 'RaspBooth';

// Subtitle on the frontend
config.subtitle = 'Keep smiling <span class="glyphicon glyphicon-thumbs-up"></span>';


// How long is the countdown before the picture is taken
config.countdown = '5';

// Messages after the countdown
config.messages = Array(
                       "Cheese!",
                       "Smile ;-)",
                       "Lachen!",
                       "Grinsen",
                       "Zunge raus"
                       );



module.exports = config;
