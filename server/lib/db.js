"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

module.exports = {
  connect: (callback) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {

   let collection = db.collection("tweets")

  const Tweets = {
    saveTweet: (tweet, cb) => {
      collection.insert(tweet);
      return true;
    },

    getTweets: (cb) => {
      collection.find().toArray((err, results) => {
        cb(results.sort(function(a, b) {
          return a.created_at - b.created_at
        }))
      })
    }
}
  callback(Tweets);


    });
  }
}

