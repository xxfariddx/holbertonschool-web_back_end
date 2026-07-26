const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Faylı asinxron şəkildə oxuyuruq
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        // Fayl tapılmadıqda və ya oxunmadıqda Promise reject olunur
        reject(new Error('Cannot load the database'));
        return;
      }

      // Sətirlərə bölürük və boş sətirləri təmizləyirik
      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== '');

      // Əgər faylda tələbə yoxdursa (boşdursa və ya yalnız başlıq sətri varsa)
      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
      }

      const headers = lines[0].split(',');
      const studentLines = lines.slice(1);

      console.log(`Number of students: ${studentLines.length}`);

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

      // Hər bir sahə üzrə tələbələri konsola yazdırırıq
      for (const [field, names] of Object.entries(fields)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }

      // Hər şey uğurla tamamlandıqda Promise-i resolve edirik
      resolve();
    });
  });
}

module.exports = countStudents;
