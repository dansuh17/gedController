/**
 * Created by minki.chung on 2016. 8. 2..
 */
var prevX = -1;

/*
$(document).ready(function(){
    $("#sexyImage").hover(function() {
        $(this).animate({"left" : "-=10px"}, 'fast');

    })
    $("$sexyVideo").onclick(function(){
        $(this).play();
    })
})
*/


$( "#sexyImage" ).draggable({
    drag: function( event, ui ) {
        $(this).text(ui.originalPosition.left > ui.position.left ?  'left' : 'right');

    }
});

$( "#draggable" ).draggable({
    drag: function( event, ui ) {
        $(this).text(ui.originalPosition.left > ui.position.left ?  'left' : 'right');
    }
});