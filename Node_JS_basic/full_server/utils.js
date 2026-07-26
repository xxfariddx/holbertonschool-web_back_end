import fs from 'fs';

export default function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve({});
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
      resolve(fields);
    });
  });
}
