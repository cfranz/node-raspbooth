// Source: http://stackoverflow.com/questions/2064186/how-can-i-make-a-jquery-countdown

// Our countdown plugin takes a callback, a duration, and an optional message
$.fn.countdown = function (callback, duration, message1, message2) {
    // If no message is provided, we use an empty string
    message1 = message1 || "";
    message2 = message2 || "";
    // Get reference to container, and set initial content
    var container = $(this[0]).html(message1 + duration + message2);
    // Get reference to the interval doing the countdown
    var countdown = setInterval(function () {
        // If seconds remain
        if (--duration) {
            // Update our container's message
            container.html(message1 + duration + message2);
        // Otherwise
        } else {
            // Clear the countdown interval
            clearInterval(countdown);
            // And fire the callback passing our container as `this`
            callback.call(container);   
        }
    // Run interval every 1000ms (1 second)
    }, 1000);

};

