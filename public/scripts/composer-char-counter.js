$(document).ready(function(){

  var text_max = 140
// $(".new-tweet, counter").html(text_remaining)

  $(".new-tweet textarea").on('input', (function() {
    var text_length = $(this).val().length;
    var text_remaining = text_max - text_length;

    $(".new-tweet .counter").text(text_remaining);
    if (text_remaining < 0) {
      $(".new-tweet .counter").css({"color":"red"})
    }
    else {
      $(".new-tweet .counter").css({"color":"white"})
      };
  }));
});
