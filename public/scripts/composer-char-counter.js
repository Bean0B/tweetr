$(document).ready(function(){

var text_max = 140
// $(".new-tweet, counter").html(text_remaining)

$(".new-tweet form textarea").on("keyup", (function() {
        var text_length = $(this).val().length;
        var text_remaining = text_max - text_length;

        $(".new-tweet form span").text(text_remaining);

}));






});
