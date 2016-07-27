/**
 * tapping on player sides
 */
;(function() {
  $(document).ready(function () {

    /**
     * welcome on connection
     */
    var socket = io.connect('http://localhost:3000');
    socket.on('welcome', function() {
      console.log('welcome! connected to socket');
    });

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    $('#tapA')
        .css('position', 'fixed')
        .css('top', 0.5 * windowHeight)
        .css('left', 0.2 * windowWidth)
        .css('height', 0.3 * windowHeight)
        .css('width', 0.3 * windowWidth);

    $('#tapB')
        .css('position', 'fixed')
        .css('top', 0.5 * windowHeight)
        .css('right', 0.2 * windowHeight)
        .css('height', 0.3 * windowHeight)
        .css('width', 0.3 * windowWidth);

    $("#tapA").click(function () {
      alert('power to Right');
    });

    $("#tapB").click(function () {
      alert('powertoRight');
      socket.emit('powerToRight', {});
    });

  });
})();
