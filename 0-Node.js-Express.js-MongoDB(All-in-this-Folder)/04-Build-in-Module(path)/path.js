const path = require('path')

// console.log(path)

//In Node.js, __dirname (note the double underscores) is a global variable that gives you the absolute path of the directory where the current JavaScript file is located.
//In Node.js, __filename is another global variable similar to __dirname, but it gives the absolute path of the current file including the file name.
console.log(__dirname)
console.log(__filename)

const extensionName = path.extname("index.html");
console.log(extensionName)

//path.join() is a method from Node.js's path module. It joins multiple path segments into a single normalized path string.

//Combining __dirname (current directory) with a file name:
/*
const filePath = path.join(__dirname, 'data', 'file.txt');
console.log(filePath);

Example: /home/user/project/data/file.txt
*/
const joinPathName = path.join(__dirname + "/views");
console.log(joinPathName)

console.log(path.join(__dirname + "/../views"))  //go one level up and join now 


/*
path.join() in Node.js
1. Part of the path module in Node.js.
2. Used to join path segments into a normalized file path.
3. Handles OS-specific separators (/ on Linux/Mac, \ on Windows).
4.Removes redundant .., . and extra slashes.*/