var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);
var fileName2 = './RetweetsAgg_2019.json';
var file2 = require(fileName2);

/* Empty the array in DataAg.json */

file2 = [];
fs.writeFile(fileName2, JSON.stringify(file2), function (err) {
    if (err) return console.log(err);
});

for (let [key1, value2] of Object.entries(file)) {

    var d = new Date(value2.created);
    
    if (d.getFullYear() == 2020) {
        file2.push({ retweets: value2.retweets, id: value2.id, text: value2.text, created: value2.created });
    } 
}

fs.writeFile(fileName2, JSON.stringify(file2), function (err) {
    if (err) return console.log(err);
});

