
//read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file (twitter and spotify keys) and store it in a variable
var keys = require("./keys.js");

//require request
var request = require("request");

//require inquirer
var inquirer = require("inquirer");

 //load the HTTP library
var http = require("http");

//require file system
var fs = require('fs');

//require spotify and twitter packages
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//access your keys information like so
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//create variables that will take commands from user
var command = process.argv[2];
var trackName = "";

//return latest 20 tweets
var getTweets = function() {

// set parameters for twitter GET
var params = {
screen_name: "greggypc",
count: 20
};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // If the request was successful...
        if (!error && response.statusCode === 200) {
           for (var singleTweet of tweets) {
             console.log("==============TWEET==============\n");
             console.log(singleTweet.text + "\n=== POSTED " + singleTweet.created_at + " ===\n");
            }        
        } else {
      console.log(error);
    }
    });
};  //end function tweets

//return track info from Spotify
var getTrackFromUser = function() {
   if (!process.argv[3]) {
     noTrackProvided();
   } else 
     trackProvided();
}; //end function getSpotify

var noTrackProvided = function() {
     trackName = "The Sign Ace of Base";
     searchSpotify();
   
}; //end function noTrackProvided

var trackProvided = function() {
    for (var i = 3; i < process.argv.length; i++){
    trackName += " " + process.argv[i];
    }
  searchSpotify();
}; //end function noTrackProvided

var searchSpotify = function() {
  //console.log(trackName + "from search spotify");
spotify.search({ type: 'track', query: trackName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    console.log("\n===TRACK INFO===\n");
    console.log("Track name: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Listen to a preview: " + data.tracks.items[0].preview_url);
    return;
});



  // spotify.search({ type: 'track', query: trackName })
  // .then(function(response) {
  //   console.log("\nLet's get some info on the track you requested:\n");
  //   //console.log("Track name: " + response.tracks.items[0].name);
  //   console.log("Artist: " + response.tracks.items[0].artists[0].name);
  //   console.log("Album Name: " + response.tracks.items[0].album.name);
  //   console.log("Listen to a preview: " + response.tracks.items[0].preview_url);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // });

}; //end function searchSpotify




//accept commands from user and fire appropriate function
switch (command) {
  case "my-tweets":
    console.log("user command: my-tweets");
    getTweets();
    break;
  case "spotify-this-song":
    console.log("user command: spotify");
    getTrackFromUser();
    break;
  case "movie-this":
    console.log("user command: movie");
    movie();
    break;
  case "do-what-it-says":
    console.log("user command: do something");
    doSomething();
    default:
    console.log("not an option");
}


// function inquirerTweets(handle) {
//   inquirer
//   .prompt([
//     // Here we create a basic text prompt.
//     {
//       type: "input",
//       message: "Which twitter handle would you like to see?",
//       name: "handle"
//     }
//    ])

//   .then(function(inquirerResponse) {
//     // return twitter handle
//     if (err){console.log(err);} 
//     else if (inquirerResponse.handle != null) {
//     	console.log(inquirerResponse.handle);
//       return inquirerResponse.handle;
//     }
//   });
  
// }

