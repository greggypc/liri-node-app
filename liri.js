

//==================================REQUIRES & VARIABLES=========================================
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
var movieName = "";
var randomTitleFromUser = "";


//==================================TWITTER=========================================
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

//==================================SPOTIFY=========================================
//get track title from user
var getTrackFromUser = function() {
   if (!process.argv[3]) {
     noTrackProvided();
   } else 
     trackProvided();
}; //end function getTrackFromUser

// no track title provided - user subjected to The Sign
var noTrackProvided = function() {
     trackName = "The Sign Ace of Base";
     searchSpotify();
}; //end function noTrackProvided

// track title provided - format to proper query format and call searchSpotify
var trackProvided = function() {
    for (var i = 3; i < process.argv.length; i++){
    trackName += "+" + process.argv[i];
    }
  searchSpotify();
}; //end function trackProvided

// give trackName to Spotify and if no error, format response to console
var searchSpotify = function() {
spotify.search({ type: 'track', query: trackName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
    console.log("\n==============TRACK INFO==============\n");
    console.log("Track name: " + data.tracks.items[0].name);
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("Listen to a preview: " + data.tracks.items[0].preview_url);
    return;
}); 
}; //end function searchSpotify

//==================================OMDB=========================================

//get movie title from user
var getMovieFromUser = function() {
  if (!process.argv[3]) {
     noMovieProvided();
   } else 
     movieProvided();
}; //end function getMovieFromUser

// no movie title provided - gift user with Mr. Nobody
var noMovieProvided = function() {
     movieName = "Mr. Nobody";
     searchOMDB();
}; //end function noMovieProvided

// track title provided - format to proper query format and call searchOMDB
var movieProvided = function() {
    for (var i = 3; i < process.argv.length; i++){
    movieName += " " + process.argv[i];
    }
  searchOMDB();
}; //end function movieProvided

// give movieName to OMDB and if no error, format response to console
var searchOMDB = function() {
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    var movieInfo = JSON.parse(body);
    console.log("\n==============MOVIE INFO==============\n");
    console.log("Title: " + movieInfo.Title);
    console.log("Year: " + movieInfo.Year);
    console.log("IMDB Rating: " + movieInfo.imdbRating);
    console.log("Rotten Tomatoes Rating: " + movieInfo.tomatoRating);
    console.log("Country: " + movieInfo.Country);
    console.log("Language: " + movieInfo.Language);
    console.log("Plot: " + movieInfo.Plot);
    console.log("Actors: " + movieInfo.Actors);
    }
});
} //end searchOMDB function 

//==================================WHAT IT SAYS=========================================

var doSomethingFromTxtFile = function() {
fs.readFile("./random.txt", "utf8", function(error, data) {

  // If error log to the console.
  if (error) {
    return console.log(error);
  }

  // Then split it by commas (to make it more readable)
  var randomFromFile = data.split(",");

   //random title is index[1]
  trackName = randomFromFile[1];

  searchSpotify();

});
}; //end function doSomethingFromTxtFile

//==================================COMMANDS=========================================

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
    getMovieFromUser();
    break;
  case "do-what-it-says":
    console.log("user command: do something");
    doSomethingFromTxtFile();
    default:
    console.log("not an option");
}

