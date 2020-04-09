var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);
var fileName1 = './DataAg.json';
var file1 = require(fileName1);

year2018 = 0;
year2019 = 0;
year2020 = 0;
hashtagComptox2018 = 0;
hashtagComptox2019 = 0;
hashtagComptox2020 = 0;

for (let [key1, value2] of Object.entries(file)) {
    dStr = value2.created;
    dStr = dStr.replace("+0000 ", "") + " UTC";
    var d = new Date(dStr);
    if (d.getFullYear() == 2018) {
        year2018++;
    } else if (d.getFullYear() == 2019) {
        year2019++;
    } else {
        year2020++;
    };
    if (value2.entitiesnode){
        if (value2.entitiesnode.hashtags){
            if (value2.entitiesnode.hashtags.length > 0){
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2018){
                    hashtagComptox2018++;
                }
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2019){
                    hashtagComptox2019++;
                }
                if (value2.entitiesnode.hashtags[0].text == "CompTox" && d.getFullYear() == 2020){
                    hashtagComptox2020++;
                }
            }
        }
    }
    dStr2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    value2.created = dStr2;
}

file1.push(year2018);
file1.push(year2019);
file1.push(year2020);
file1.push(hashtagComptox2018);
file1.push(hashtagComptox2019);
file1.push(hashtagComptox2020);

fs.writeFile(fileName, JSON.stringify(file), function (err) {
    if (err) return console.log(err);
    console.log("Done writing");
});

fs.writeFile(fileName1, JSON.stringify(file1), function (err) {
    if (err) return console.log(err);
    console.log("Done writing");
});

