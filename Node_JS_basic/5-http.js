const http = require('http');
const fs = require('fs');

const DB_FILE = process.argv[2];

function getStudentsReport(path, callback) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      callback(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      callback(null, 'Number of students: 0');
      return;
    }

    const headers = lines[0].split(',');
    const studentLines = lines.slice(1);
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');
      if (studentData.length === headers.length) {
        const firstName = studentData[0].trim();
        const field = studentData[studentData.length - 1].trim();

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    let output = `Number of students: ${studentLines.length}`;
    for (const [field, names] of Object.entries(fields)) {
      output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
    }

    callback(null, output);
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    getStudentsReport(DB_FILE, (error, report) => {
      if (error) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }

      res.end(`This is the list of our students\n${report}`);
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

app.listen(1245);

module.exports = app;
