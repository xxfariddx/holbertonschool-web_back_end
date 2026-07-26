const express = require('express');
const fs = require('fs');

const app = express();
const DB_FILE = process.argv[2];

// Tələbə məlumatlarını asinxron oxuyub string kimi qaytaran köməkçi funksiya
function getStudentsReport(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('Number of students: 0');
        return;
      }

      const headers = lines[0].split(',');
      const studentLines = lines.slice(1);

      // Cavab mətnini sətir-sətir yığmaq üçün massiv yaradırıq
      let output = `Number of students: ${studentLines.length}`;

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

      for (const [field, names] of Object.entries(fields)) {
        output += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      }

      resolve(output);
    });
  });
}

// Ana səhifə yönləndirməsi (/)
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

// Tələbələr səhifəsi yönləndirməsi (/students)
app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');

  getStudentsReport(DB_FILE)
    .then((report) => {
      // Uğurlu olduqda mətni birləşdirib göndəririk
      res.send(`This is the list of our students\n${report}`);
    })
    .catch(() => {
      // Xəta baş verdikdə tələb olunan mətni qaytarırıq
      res.send('This is the list of our students\nCannot load the database');
    });
});

app.listen(1245);

module.exports = app;
