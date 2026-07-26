const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));

if (files.length === 0) {
  process.exit(0);
}

let hasError = false;

for (const file of files) {
  const fullPath = path.resolve(process.cwd(), file);
  const contents = fs.readFileSync(fullPath);

  if (contents.length > 0 && contents[contents.length - 1] !== 10) {
    console.error(`${file}: error  Newline required at end of file but not found  eol-last`);
    hasError = true;
  }
}

process.exit(hasError ? 1 : 0);