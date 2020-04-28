var fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);
var fileName1 = './hashTags.json';
var file1 = require(fileName1);

for (let [key1, value2] of Object.entries(file)) {
    if (value2.entitiesnode) {
        if (value2.entitiesnode.hashtags) {
            if (value2.entitiesnode.hashtags.length > 0) {
                   value2.entitiesnode.hashtags.forEach(myFunction);
                   function myFunction(item, index) {
                    //AllHashTags.push(value2.entitiesnode.hashtags[index].text);                   }
                    file1.push(item.text);
                }   
            }
        }
    }
}


fs.writeFile(fileName1, JSON.stringify(file1), function (err) {
    if (err) return console.log(err);
    console.log("Done writing");
});

