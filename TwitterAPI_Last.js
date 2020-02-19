var request = require('request');
var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);

var options = {
    'method': 'POST',
    'url': 'https://api.twitter.com/oauth2/token?grant_type=client_credentials',
    'headers': {
        'User-Agent': 'My Twitter App v1.0.23',
        'Authorization': 'Basic SXBzSXBQQmpVUzNHR2QzZUhwVFB4QkFOajpKb2FZeXBBREJtSE05MlFZZjlRZ3QybjZlRHNIeDZ1SjhFaFZvNVU5SG5IYVE1RWhJQw==',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Content-Length': '29'
    }
};
request(options, function (error, response) {
    if (error) throw new Error(error);
    ParseResponse = JSON.parse(response.body);
    bearer = ParseResponse['access_token'];
    last = 994260961891532800;
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
        var last = keys[keys.length - 1];
        for (const property in ParseResponse) {
            //   if (ParseResponse[property].entities.hashtags == null) {
            file.TwitterData.push({ id: ParseResponse[property].id, created: ParseResponse[property].created_at, text: ParseResponse[property].text, retweets: ParseResponse[property].retweet_count, favorites: ParseResponse[property].favorite_count });
            //   } else {
            //       file.TwitterData.push({ id: ParseResponse[property].id, created: ParseResponse[property].created_at, text: ParseResponse[property].text, retweets: ParseResponse[property].retweet_count, favorites: ParseResponse[property].favorite_count, hashtags: ParseResponse[property].entities.hashtags[0].text });
            //   };
            if (property == last) {
                var lastID = ParseResponse[property].id;
            }
        }
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err);
        });
        //         lastCallRecur(bearer, lastID)
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
            file.CreatedDate.push(ParseResponse[property].id);
            if (property == last) {
                var lastID = ParseResponse[property].id;
            }
        }
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err);
        });
        lastCallRecur(bearer, lastID);
    });
}; 
