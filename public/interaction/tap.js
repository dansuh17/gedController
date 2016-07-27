/**
 * HTML overlay over the video.
 * Tapping on certain regions will do different things:
 * voting, counting, 'like', etc.
 */
;(function() {
  $(document).ready(function () {

    var socket = io.connect('http://localhost:3000');
    /**
     * welcome on connection
     */
    socket.on('welcome', function() {
      console.log('welcome! connected to socket');
    });

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    /* adjust css properties of tap A region */
    $('#tapA')
        .css('position', 'fixed')
        .css('top', 0.3 * windowHeight)
        .css('left', 0.1 * windowWidth)
        .css('height', 0.6 * windowHeight)
        .css('width', 0.3 * windowWidth);

    /* adjust css properties of tap B region */
    $('#tapB')
        .css('position', 'fixed')
        .css('top', 0.3 * windowHeight)
        .css('right', 0.3 * windowHeight)
        .css('height', 0.6 * windowHeight)
        .css('width', 0.3 * windowWidth);

    /* 'onclick' functions for tapping regions -
       works for both mouse and touch (if on mobile) */
    $("#tapA").bind('mousedown touchstart', function () {
      console.log('tapA clicked');
    });

    $("#tapB").bind('mousedown touchstart', function () {
      console.log('tapB clicked');
      socket.emit('powerToRight', {});
    });
  });
})();
