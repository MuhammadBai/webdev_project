const fs = require ("node:fs");
function readMyFile(file) {
	const contents = fs.readFileSync(file);
    return contents;
}

const contents = readMyFile("test.txt")