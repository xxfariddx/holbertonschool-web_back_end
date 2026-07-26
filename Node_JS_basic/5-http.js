const http = require('http');

// HTTP serverini yaradırıq
const app = http.createServer((req, res) => {
  // Cavabın status kodunu 200 (OK) və tipini plain text təyin edirik
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Səhifənin gövdəsinə (body) mətni yazırıq və axını bağlayırıq
  res.end('Hello Holberton School!');
});

// Serverin 1245-ci portu dinləməsini təmin edirik
app.listen(1245);

// "app" dəyişənini testlərin oxuya bilməsi üçün eksport edirik
module.exports = app;
