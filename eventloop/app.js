// Фазы:
// - таймеры
// ----------------------nextTick, microtaskQueue
// - pending callbacks
// ----------------------nextTick, microtaskQueue
// - idle, prepare
// ----------------------nextTick, microtaskQueue
// - poll
// ----------------------nextTick, microtaskQueue
// - check
// ----------------------nextTick, microtaskQueue
// - close callback

// - проверка на окончание

const fs = require('fs');

console.log('init');

setTimeout(() => {
  console.log(performance.now(), 'Timer 1 second');
}, 1000);

setImmediate(() => {
  console.log('immediate');
});

// читаем файл в pool фазе
fs.readFile(__filename, () => {
  console.log('End of read file!');
});

// тут мы повиснем и таймер выполнется больше чем через 1 секунду!
setTimeout(() => {
  for(i = 0; i < 100000000; i++) {

  };
  console.log('cicle done!');
}, 0);

//Promise будет выполняться в фазе microtaskQueue
Promise.resolve().then(() => {
  console.log('Promise Resolved!')
});

process.nextTick(() => console.log('process.nextTick'))

console.log('final');


