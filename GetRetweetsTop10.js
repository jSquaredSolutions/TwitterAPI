var fs = require('fs');
var fileName2 = './RetweetsAgg_2018.json';
var file2 = require(fileName2);
var retweetsArray = [];

for (let [key1, value2] of Object.entries(file2)) {
    retweetsArray.push(value2.retweets);
}

console.log(retweetsArray.sort((a,b)=>b-a))


