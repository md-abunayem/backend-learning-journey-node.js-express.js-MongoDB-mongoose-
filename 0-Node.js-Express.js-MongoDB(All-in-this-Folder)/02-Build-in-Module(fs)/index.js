/*fs Module in Node.js — Complete Overview:
The fs (short for File System) module in Node.js allows you to work with the file system on your computer — such as reading, writing, updating, deleting, and watching files or directories.

It comes built-in with Node.js, so no installation is needed.
*/

const fs = require("fs");

// console.log(fs)

fs.writeFile("file1.txt", "This the author Nayem....", function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Successfully file created...")
});


//fs.appendFile()
//The fs.appendFile() method is used to add data to the end of an existing file. If the file does not exist, it creates the file and then writes the data.

fs.appendFile("file1.txt", "\nAppend this text at the end of the file1", function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Append text successful...")
});


/*The fs.readFile() method is used to read the contents of a file without blocking the rest of your program (i.e., asynchronously).

Syntax:
fs.readFile(path, encoding, callback)
*/

fs.readFile('file1.txt', 'utf-8', (err, data)=>{
    if(err){
        console.log(err)
    }else{
        console.log("\n",data)
    }
})


//fs.rename()
/*The fs.rename() method is used to rename a file or move it to a new location.

Syntax:
fs.rename(oldPath, newPath, callback)
*/

fs.rename('file.txt', "file1.text", (err)=>{
    if(err){
        console.log(err)
    }
    console.log("\nRename successful...")
})


/*🗑️ fs.unlink() — Delete a File in Node.js
The fs.unlink() method is used to delete (remove) a file from the file system.

Syntax:
fs.unlink(path, callback)
*/

fs.unlink("file.txt", (err)=>{  
    if(err){
        console.log(err)
    }
    console.log("\nSuccessfully deleted...")
})



//for synchronous--->> only remove callback function from the code and add Sync after every method name to make synchronous like...fs.writeFileSync('fileName', "data")....fs.readFileSync("fileName", 'encoding')...fs.appendFileSync('fileName', 'data')...fs.renameSync('oldName', 'newName')...fs.unlinkSync('fileName')

/*
🔁 Conversion examples:
Async (fs)	                     Synchronous (fs)
fs.writeFile(file, data, cb)	 fs.writeFileSync(file, data)
fs.readFile(file, enc, cb)	     fs.readFileSync(file, enc)
fs.appendFile(file, data, cb)	 fs.appendFileSync(file, data)
fs.rename(old, new, cb)	         fs.renameSync(old, new)
fs.unlink(file, cb)	             fs.unlinkSync(file)

So yes: ✅ Remove the callback and add Sync to get the synchronous version.
*/

/*⚠️ Just one thing to remember:
Synchronous methods block the event loop — that means your entire program pauses while the operation finishes.

They’re useful in small scripts or startup config loading — but avoid them in performance-critical or server-side code.

*/