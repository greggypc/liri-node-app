
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
    tweets();
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

//return latest 20 tweets from user input twitter handle
function tweets() {
	inquirerTweets();
	console.log(name);
    client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=TheDailyShow&count=20", function(error, response, tweet) {
        console.log('inside of function tweet');
        // If the request was successful...
        if (!error && response.statusCode === 200) {
            // Log the last 20 tweets
            console.log(JSON.parse(tweet).text);
            console.log(tweet);
        }
    });
}

function inquirerTweets(handle) {
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Which twitter handle would you like to see?",
      name: "handle"
    }
   ])

  .then(function(inquirerResponse) {
    // return twitter handle
    if (err){console.log(err);} 
    else if (inquirerResponse.name != null) {
    	console.log(inquirerResponse.name);
      return inquirerResponse.name;
    }
  });
  
}

