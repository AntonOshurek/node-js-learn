const start = performance.now();

setTimeout(() => {
  console.log(performance.now() - start)  //время на выполнение - 1006.977999985218
  console.log('прошла секунда');
}, 1000);


function myFunc(arg) {
  console.log(`Аргумент => ${arg}`);
};
const timerId = setTimeout(myFunc, 5000, 'Аргумент функции');

setTimeout(() => {
  clearTimeout(timerId);
  console.log('timerId - очищен!');
}, 1000);

const intervalId = setInterval(() => {
  console.log(performance.now());
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  console.log('интервал очищен')
}, 3000);

console.log('перед');

//код запустится после выполнения всех команд!
setImmediate(() => {
  console.log('после всего');
});

console.log('после');

const secondTimerId = setTimeout(() => {
  console.log('secondTimerId')
}, 3000);
//удаляем ссылку на таймер
secondTimerId.unref();
// возвращяем ссылку на таймер
setImmediate(() => {
  secondTimerId.ref();
});
