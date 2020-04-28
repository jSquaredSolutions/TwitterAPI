const fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);

console.log(file);
firstArray = [];
for (let [key1, value2] of Object.entries(file)) {
    firstArray.push(value2.id);
}
function find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
        if (!object[item])
            object[item] = 0;
        object[item] += 1;
    })

    for (var prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }
    deletedups(result);
    return result;
}
console.log(find_duplicate_in_array(firstArray));
function deletedups(result) {
    for (i = 0; i < result.length; i++) {
        deletedups2(parseInt(result[i]));
    }
}
function deletedups2(result2) {
    d = 0;
    for (let [key, value] of Object.entries(file)) {
        if (result2 == value.id) {
            d++;
            if (d > 1) {
                file.splice(key,1);
            };
        }
    }
}
console.log(file);
writeJSON();
function writeJSON(){
    fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) return console.log(err);
    });
};
console.log(file.length);
