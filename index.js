const fs = require("fs");

const dirPath = __dirname + "/src/menus/";

const readRecursive = fs.readdirSync(dirPath, { recursive: true });

console.log(readRecursive);
