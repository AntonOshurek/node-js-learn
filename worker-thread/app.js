const crypto = require('crypto');
const https = require('https');

const start = performance.now();

//устанавливаем трекпулл размер по количеству ядер процессора
// process.env.UV_THREADPOOL_SIZE = 4;

// for(let i = 0; i < 50; i++) {
//   crypto.pbkdf2('test', 'salt', 1000, 64, 'sha512', () => {
//     console.log(performance.now() - start);
//   });
// };

for(let i = 0; i < 50; i++) {
  https.get('https://yandex.ru', (res) => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(performance.now() - start);
    });
  });
};
