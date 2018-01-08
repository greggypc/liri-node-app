
//read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file (twitter and spotify keys) and store it in a variable
var keys = require("./keys.js");

//access your keys information like so
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

//create variables that will take commands from user
//var myTweets = process.argv[2];
console.log('about to run tweet if statement');
var request = require("request");

if (process.argv[2] === "my-tweets") {
	request("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=greggypc&count=20", function(error, response, body) {
console.log('inside of tweet if statement');
  // If the request was successful...
  if (!error && response.statusCode === 200) {
  // Then log the body from the site!
  console.log(JSON.parse(body).text);
  }
});
}

  