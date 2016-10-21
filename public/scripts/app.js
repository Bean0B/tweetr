/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Test / driver code (temporary). Eventually will get this from the server.

$(function(){
//   var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ]


//MAKE TWEETS INTO FEED ARTICLES
function renderTweets(arr) {
  for (var i = 0; i < arr.length; i++) {
    var currenTweet = arr[i]
    var $newtweet = createTweetElement(currenTweet)
    $('#feed').prepend($newtweet)
  };
 };
  //CREATE FEED ARTICLES
  function createTweetElement(tweobject) {
    var $tweet = $("<article>").addClass("thetweets");
    var time = Math.floor((Date.now() - tweobject.created_at)/8.64e+7)

    $tweet.append("<header>");
    $tweet.append("<main>");
    $tweet.append("<footer>");
    // HEADER
    $tweet.children("header").append(`<img src= ${tweobject.user.avatars.regular} />`);
    $tweet.children("header").append(`<h2 class= "name">${tweobject.user.name} </h2>`);
    $tweet.children("header").append(`<p class= "handle">${tweobject.user.handle} </p>`);
    // MAIN
    $tweet.children("main").append(`<p>${tweobject.content.text} </p>`);
    // FOOTER
    $tweet.children("footer").append(`<p>${time} days ago </p>`);
    $tweet.children("footer").append(`<i class="fa fa-heart" aria-hidden="true"></i>`);
    $tweet.children("footer").append(`<i class="fa fa-retweet" aria-hidden="true"></i>`);
    $tweet.children("footer").append(`<i class="fa fa-flag" aria-hidden="true"></i>`);

    return $tweet;
  };

   //renderTweets(data);

//POST TO /TWEETS hijax


  $('form').on('submit', function (event) {
    event.preventDefault();
    var text = $(".inputBox").val();
     if (text == "") {
      $('#errors').text("Nothing to say?").fadeIn().delay(1000).fadeOut();
     } else if (text == null ) {
      $('#errors').text("Nothing to say?").fadeIn().delay(1000).fadeOut();;
     } else if (text.length > 140) {
      $('#errors').text("Please type less").fadeIn().delay(1000).fadeOut();;
     }else{
      $.ajax({
      method: 'post',
      url: '/tweets',
      data: $(this).serialize(),
    });loadTweets();
    }
});

  //GET THOSE TWEETS

  function loadTweets() {
    event.preventDefault();
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







