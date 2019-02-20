var http = require('http');
var twitterAPI = require('node-twitter-api');

//create a server object:
http.createServer(function (req, res) {
    res.write('Hello World!'); //write a response to the client
    res.end(); //end the response
  }).listen(8081); //the server object listens on port 8081

var twitter = new twitterAPI({
    consumerKey: 'IpsIpPBjUS3GGd3eHpTPxBANj',
    consumerSecret: 'JoaYypADBmHM92QYf9Qgt2n6eDsHx6uJ8EhVo5U9HnHaQ5EhIC',
    callback: 'http://localhost:8081/'
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {

     
        
    }
}); 

