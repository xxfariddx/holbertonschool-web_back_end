const fs = require('fs');

function countStudents(path) {
  try {
    // Faylı sinxron şəkildə utf-8 formatında oxuyuruq
    const data = fs.readFileSync(path, 'utf-8');

    // Mətni sətirlərə bölürük (\r\n və \n fərqini aradan qaldırmaq üçün regex istifadə edirik)
    const lines = data.split(/\r?\n/);

    // Boş sətirləri təmizləyirik
    const validLines = lines.filter((line) => line.trim() !== '');

    // Əgər fayl boşdursa və ya daxilində tələbə yoxdursa (yalnız başlıq varsa və ya o da yoxdursa)
    if (validLines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    // Başlıq sətirini (FIRST_NAME, LAST_NAME, AGE, FIELD) ayırırıq
    const headers = validLines[0].split(',');

    // Tələbə sətirlərini götürürük
    const studentLines = validLines.slice(1);

    console.log(`Number of students: ${studentLines.length}`);

    // Sahələrə görə tələbələrin adlarını qruplaşdırmaq üçün obyekt yaradırıq
    const fields = {};

    for (const line of studentLines) {
      const studentData = line.split(',');

      // Sətirdəki element sayı başlıq sayı ilə düz gəlmirsə, keçirik ( xətalı sətirlər üçün)
      if (studentData.length === headers.length) {
        const firstName = studentData[0].trim();
        const field = studentData[studentData.length - 1].trim(); // FIELD sütunu adətən sondadır

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      }
    }

    // Hər bir sahə üzrə nəticələri konsola çıxarırıq
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    // Əgər fayl tapılmasa və ya oxunmasa, tələb olunan xətanı fırladırıq
    throw new Error('Cannot load the database');
  }
}

// Funksiyanı digər fayllarda istifadə etmək üçün eksport edirik
module.exports = countStudents;
