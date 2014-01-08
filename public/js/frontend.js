      $(document).ready(function() {
        $("#message").hide();
        $("#countdown").hide();
      });

      var socket = io.connect('http://raspbooth:8080');
      socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
      });

      socket.on('countdown start', function (data) {
        $("#photo").attr("src", "");
        $("#message").hide();
        $("#countdown").show();
        $("#countdown").countdown(countdown_ready, 5, "Foto in ", "s");
        // $("#countdown").text("Countdown2");
      });

      socket.on('new photo', function (data) {
        $("#message").hide();
        $("#photo").attr("src", "/photo/" + data.photo);
      });

      var sprueche  = Array("Cheese!", "Smile ;-)", "Lachen!", "Grinsen", "Zunge raus");

      function countdown_ready () {
        $("#countdown").hide();
        $("#message").show().text( sprueche[ Math.floor( Math.random() * sprueche.length ) ]);
        socket.emit('countdown ready', {  });
      }

