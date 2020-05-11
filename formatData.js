var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);
var fileName1 = './DataAg.json';
var file1 = require(fileName1);


/* Empty the array in DataAg.json */
file1 = [];
fs.writeFile(fileName1, JSON.stringify(file1), function (err) {
    if (err) return console.log(err);
});


year2020 = 0; // 3 array value
hashtagComptox2020 = 0; // 6 array value
retweetsComptox2020 = 0; // 9 array value

for (let [key1, value2] of Object.entries(file)) {
    dStr = value2.created;
    dStr = dStr.replace("+0000 ", "") + " UTC";
    var d = new Date(dStr);
    
    // Count total tweets per year
    if (d.getFullYear() == 2020) {
        year2020++;
    } 

    // Count total tweet that have the hashtag comptox
    if (value2.entitiesnode) {
        if (value2.entitiesnode.hashtags) {
            if (value2.entitiesnode.hashtags.length > 0) {
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2018) {
                    hashtagComptox2018++;
                }
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2019) {
                    hashtagComptox2019++;
                }
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2020) {
                    hashtagComptox2020++;
                }
            }
        }
    }
    
    // set dStr2 to the date format needed
    dStr2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // set that date format in the .json file
    value2.created = dStr2;
}

file1.push(year2018);
file1.push(year2019);
file1.push(year2020);
file1.push(hashtagComptox2018);
file1.push(hashtagComptox2019);
file1.push(hashtagComptox2020);
file1.push(retweetsComptox2018);
file1.push(retweetsComptox2019);
file1.push(retweetsComptox2020);

fs.writeFile(fileName, JSON.stringify(file), function (err) {
    if (err) return console.log(err);
    console.log("Done writing");
});

fs.writeFile(fileName1, JSON.stringify(file1), function (err) {
    if (err) return console.log(err);
    console.log("Done writing");
});



