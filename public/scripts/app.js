/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function(){

  loadTweets()//get the tweets on pageload

  $('.compose').click(function () { //compose button toggles input field
    $('.new-tweet').slideToggle( function (){
      $('.inputBox').focus() //start typing when you toggle
    });
  });

//MAKE TWEETS INTO FEED ARTICLES
function renderTweets(arr) {
  for (var i = 0; i < arr.length; i++) {
    var currenTweet = arr[i]
    var $newtweet = createTweetElement(currenTweet)
    $('#feed').prepend($newtweet)
  };
 };
  //CREATE FEED ARTICLES/More Tweets
function createTweetElement(tweobject) {
    var $tweet = $("<article>").addClass("thetweets");
    var time = Math.floor((Date.now() - tweobject.created_at)/8.64e+7)

    $tweet.append("<header>");
    $tweet.append("<section>");
    $tweet.append("<footer>");
    // HEADER
    $tweet.children("header").append(`<img src=${tweobject.user.avatars.regular} />`);
    $tweet.children("header").append(`<h2 class="name">${tweobject.user.name} </h2>`);
    $tweet.children("header").append(`<p class="handle">${tweobject.user.handle} </p>`);
    // TWEETCONTENT
    $tweet.children("section").append(`<p>${tweobject.content.text} </p>`);
    // FOOTER
    $tweet.children("footer").append(`<p>${time} days ago </p>`);
    $tweet.children("footer").append(`<i class="fa fa-heart" aria-hidden="true"></i>`);
    $tweet.children("footer").append(`<i class="fa fa-retweet" aria-hidden="true"></i>`);
    $tweet.children("footer").append(`<i class="fa fa-flag" aria-hidden="true"></i>`);

    return $tweet;
  };





//POST TO /TWEETS FEED- hijax
  $('form').on('submit', function (event) {
    event.preventDefault();
    var text = $(".inputBox").val();
    if (!text) {
      $('#errors').text("Nothing to say?").fadeIn().delay(1000).fadeOut();
    } else if (text.length > 140) {
      $('#errors').text("Over character limit!").fadeIn().delay(1000).fadeOut();
    } else{
      $.ajax({
        method: 'post',
        url: '/tweets',
        data: $(this).serialize(),
      });
      $(".inputBox").val("")
      $(".counter").text("140") // clear field after post
      loadTweets();
    }
  });
//GET THOSE TWEETS
  function loadTweets() {
    $.ajax({
      method: 'get',
      url: '/tweets',
      data: $(this).serialize(),
      dataType: 'json'
      }).done(function (data) {
        renderTweets(data)
        })
    }


});