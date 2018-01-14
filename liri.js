
//read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file (twitter and spotify keys) and store it in a variable
var keys = require("./keys.js");

//require request
var request = require("request");

//require inquirer
var inquirer = require("inquirer");

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

//accept commands from user and fire appropriate function
switch (command) {
  case "my-tweets":
    console.log("user command: my-tweets");
    getTweets();
    break;
  case "spotify-this-song":
    console.log("user command: spotify");
    spotify();
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

//return latest 20 tweets
function getTweets() {

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
        }  else {
      console.log(error);
    }
    });
};  //end function tweets




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

