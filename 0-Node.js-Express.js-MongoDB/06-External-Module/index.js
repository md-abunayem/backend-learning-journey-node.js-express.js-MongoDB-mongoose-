//random-fruits-name and random-movies external package is used here
const  getRandomFruitsName = require('random-fruits-name')
const { randomTitle, randomDesc, randomMovie } = require('random-movies');

console.log(getRandomFruitsName())
console.log(getRandomFruitsName('es'))
console.log(getRandomFruitsName('bn'))


console.log("\nMovie Name:")
console.log(randomTitle(), randomDesc(), randomMovie())