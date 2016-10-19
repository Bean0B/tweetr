$(document).ready(function(){

var text_max = 140
// $(".new-tweet, counter").html(text_remaining)

$(".new-tweet textarea").on("keyup", (function() {
    var text_length = $(this).val().length;
    var text_remaining = text_max - text_length;

    var countdwn = $(".new-tweet span").text(text_remaining);
    if (text_remaining < 0) {
      $(".new-tweet span").css({"color":"red"});
    }
}));






});
