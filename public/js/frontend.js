      $(document).ready(function() {
        $("#message1").hide();
        $("#message2").hide();
        $("#countdown").hide();
        $("#photo").hide();
      });

      var socket = io.connect('http://raspbooth:8080');

      socket.on('countdown', function (data) {
        $("#photo").attr("src", "");
        $("#photo").hide();
        $("#message1").hide();
        $("#message2").hide();

        $("#countdown").show();
        $("#countdown").html("Foto in " + data.value + "s");
      });

      socket.on('message1', function (data) {
        $("#countdown").hide();
        $("#photo").hide();

        $("#message1").show().text(data.value);
      });

      socket.on('photo', function (data) {
        $("#countdown").hide();
        $("#message1").hide();
        $("#message2").hide();

        $("#photo").attr("src", "/photo/" + data.photo).show();
      });

      var sprueche  = Array("Cheese!", "Smile ;-)", "Lachen!", "Grinsen", "Zunge raus");

      function countdown_ready () {
        $("#countdown").hide();
        $("#message1").show().text( sprueche[ Math.floor( Math.random() * sprueche.length ) ]);
        socket.emit('countdown ready', {  });
      }


