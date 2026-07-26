const express = require('express');

// Express tətbiqini başladırıq
const app = express();

// Sırf ana səhifə (/) üçün GET sorğusunu qarşılayırıq
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Serverin 1245-ci portu dinləməsini təmin edirik
app.listen(1245);

// "app" dəyişənini eksport edirik
module.exports = app;
