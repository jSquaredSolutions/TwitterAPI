/* Instead recursivly getting all records, this script will obtain the
most recent. 

var request = require('request');
var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);

var options = {
    'method': 'POST',
    'url': 'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
    'headers': {
        'User-Agent': 'My Twitter App v1.0.23',
        'Authorization': 'Basic WWtRWDJKdGc4RTRKaWZybThkSHNXY3B6NjpvcnFETHJRSEdTZVZBcm41MVNxWFRlblpBS2QxN0hHVFBkWDRGVGZFMWJ4enJMcklYZw==',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Length': '29'
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    ParseResponse = JSON.parse(response.body);
    bearer = ParseResponse['access_token'];
    last = 1223364079466795008;
    nextCall(bearer);
});

function nextCall(bearer, last) {
    var options = {
        'method': 'GET',
        'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=199&screen_name=EPAresearch&max_id=' + last,
        'headers': {
            'User-Agent': 'My Twitter App v1.0.23',
            'Authorization': 'Bearer ' + bearer
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        ParseResponse = JSON.parse(response.body);
        var keys = Object.keys(ParseResponse);
        console.log(keys[keys.length - 1]);
        for (const property in ParseResponse) {
            console.log(ParseResponse[property]);
            file.TwitterData.push({ id: ParseResponse[property].id, created: ParseResponse[property].created_at, text: ParseResponse[property].text, retweets: ParseResponse[property].retweet_count, favorites: ParseResponse[property].favorite_count });
        };
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err);
        });
    });
};



