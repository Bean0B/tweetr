"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

//let collection;


const Tweets = {

  saveTweet: (tweet, callback) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection("tweets")
    collection.insert(tweet);
    return true;
    });
  },

  getTweets: (callback) => {
    MongoClient.connect(MONGODB_URI, (err, db) => {
      let collection = db.collection("tweets")
      collection.find().toArray((err, results) => {
        callback(results.sort(function(a, b) {
          return a.created_at - b.created_at
        }));
      });
    })
  }
}

module.exports = {
  connect: (callback) => {
      callback(Tweets);
  }
}

