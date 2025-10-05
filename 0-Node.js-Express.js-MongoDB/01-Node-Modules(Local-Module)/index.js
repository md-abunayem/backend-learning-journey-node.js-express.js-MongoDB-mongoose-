// const s1 = require('./student');  //way-1

//import using object destructuring
const s1 = require('./student');   //way-2
const  {getAge,cgpa} = require('./student'); //way-3

console.log(s1.getName())   //using way-1,2
console.log(getAge())       //using way-3
console.log(cgpa)           //using way-3

