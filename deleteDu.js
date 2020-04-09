
var fileName = './TwitterData.json';
var file = require(fileName);

console.log(file[0].entities);

abc = file[0].entities;

console.log(abc.hashtags[0].text);



