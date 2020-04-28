var request = require('request');
var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);

/* encode to base64 to but this in Auth header 
consumerKey = encodeURI('YkQX2Jtg8E4Jifrm8dHsWcpz6');
consumerSecret = encodeURI('orqDLrQHGSeVArn51SqXTenZAKd17HGTPdX4FTfE1bxzrLrIXg');
concatSecretAndKey = consumerKey + ":" + consumerSecret;
encodedData = Buffer.from(concatSecretAndKey).toString('base64');

I run this via REPL in node and copy the results

*/ 
lastCallRecurCount = 0;

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
    nextCall(bearer);
});

function nextCall(bearer) {
    var options = {
        'method': 'GET',
        'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=199&screen_name=EPAresearch',
        'headers': {
            'User-Agent': 'My Twitter App v1.0.23',
            'Authorization': 'Bearer ' + bearer
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        ParseResponse = JSON.parse(response.body);
        var keys = Object.keys(ParseResponse);
        var last = keys[keys.length - 1];
        for (const property in ParseResponse) {
            file.push({ id: ParseResponse[property].id, created: ParseResponse[property].created_at, text: ParseResponse[property].text, retweets: ParseResponse[property].retweet_count, favorites: ParseResponse[property].favorite_count });
            if (property == last) {
                var lastID = ParseResponse[property].id;
            }
        }
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err);
        });
        lastCallRecur(bearer, lastID)
    });
};

function lastCallRecur(bearer, lastID) {
    var options = {
        'method': 'GET',
        'url': 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=199&screen_name=EPAresearch&max_id=' + lastID,
        'headers': {
            'User-Agent': 'My Twitter App v1.0.23',
            'Authorization': 'Bearer ' + bearer
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        ParseResponse = JSON.parse(response.body);
        var keys = Object.keys(ParseResponse);
        var last = keys[keys.length - 1];
        for (const property in ParseResponse) {
            file.push({ id: ParseResponse[property].id, created: ParseResponse[property].created_at, text: ParseResponse[property].text, retweets: ParseResponse[property].retweet_count, favorites: ParseResponse[property].favorite_count, entitiesnode: ParseResponse[property].entities});
            if (property == last) {
                var lastID = ParseResponse[property].id;
            }
        }
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err);
        });
        lastCallRecurCount++;
        if (lastCallRecurCount == 100){
            lastCallRecur(bearer, lastID);
        } else {
            return;
        }     
    });
}; 
