      $(document).ready(function() {
        $("#message").hide();
        $("#countdown").hide();
        $("#photo").hide();
      });

      var socket = io.connect('http://raspbooth:8080');

      socket.on('countdown', function (data) {
        $("#photo").attr("src", "");
        $("#photo").hide();
        $("#message").hide();

        $("#countdown").show();
        $("#countdown").html("Foto in " + data.value + "s");
      });

      socket.on('message', function (data) {
        $("#countdown").hide();
        $("#photo").hide();

        $("#message").show().text(data.value);
      });

      socket.on('photo', function (data) {
        $("#countdown").hide();
        $("#message").hide();

        $("#photo").attr("src", "/photo/" + data.photo).show();
      });

      var sprueche  = Array("Cheese!", "Smile ;-)", "Lachen!", "Grinsen", "Zunge raus");

      function countdown_ready () {
        $("#countdown").hide();
        $("#message").show().text( sprueche[ Math.floor( Math.random() * sprueche.length ) ]);
        socket.emit('countdown ready', {  });
      }


