// Proqram başlayan kimi sualı veririk və sonuna \n qoyuruq
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Standart daxiletməni oxunaqlı mətn formatına salırıq
process.stdin.setEncoding('utf-8');

// İstifadəçi mətn daxil edəndə (və ya echo ilə ötürüləndə) bu funksiya işləyir
process.stdin.on('readable', () => {
  const chunk = process.stdin.read();

  if (chunk !== null) {
    // Burada chunk daxilində gələn həm \n, həm də \r xarakterlərini qoruyuruq
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Daxiletmə axını bağlananda (məsələn, echo işini bitirəndə) bura işləyir
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
