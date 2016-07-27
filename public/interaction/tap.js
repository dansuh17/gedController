/**
 * tapping on player sides
 */
$(document).ready(function() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  console.log($(window).height());
  console.log($(window).width());

  $('#tapA')
      .css('position', 'fixed')
      .css('top', 0.5*windowHeight)
      .css('left', 0.2*windowWidth)
      .css('height', 0.3*windowHeight)
      .css('width', 0.3*windowWidth);

  $('#tapB')
      .css('position', 'fixed')
      .css('top', 0.5*windowHeight)
      .css('right', 0.2*windowHeight)
      .css('height', 0.3*windowHeight)
      .css('width', 0.3*windowWidth);

  $("#tapA").click(function(){
    alert(1);
  });

  $("#tapB").click(function(){
    alert(0);
  });
});

