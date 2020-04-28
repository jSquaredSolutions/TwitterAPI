const fs = require('fs');
var fileName = './TwitterData.json';
var file = require(fileName);

console.log(file);
firstArray = [];

for (let [key1, value2] of Object.entries(file)) {
    firstArray.push(value2.id);
}

debugger;