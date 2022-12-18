const EventEmmiter = require('events')

const myEmmiter = new EventEmmiter();

const logDbConnection = () => {
  console.log('DB connected');
};
myEmmiter.addListener('connected', logDbConnection);
myEmmiter.emit('connected');

myEmmiter.removeListener('connected', logDbConnection);
// myEmmiter.off('connected', logDbConnection); просто отключает листенер
// myEmmiter.removeAllListeners - Удаляет все слушатели на данном эммитере
myEmmiter.emit('connect') //ничего не выведет т.к. все слушатели отключены

myEmmiter.on('msg', (data) => { //прослушиваем событие и принимаеи данные
  console.log(`получил: ${data}`);
});
myEmmiter.emit('msg', 'hello world')

myEmmiter.once('off', () => {
  console.log('я вызовусь только один раз');
});
myEmmiter.emit('off');// вызовется только в этот раз и будет удалён
myEmmiter.emit('off');// тут не будет вызова т.к. слушатель был удалён после первого раза



myEmmiter.setMaxListeners(2); // установка максимального количества слушателей.
// Максимально, по умолчани. их 10.
console.log('max listeners - ' + myEmmiter.getMaxListeners()); // посмотреть максимальное количество слушателей.

console.log('msg listeners count - ' + myEmmiter.listenerCount('msg'));
console.log('off listeners count - ' + myEmmiter.listenerCount('off'));

//получаем все слушателе на данном событии
console.log('all listeners in msg = ' + myEmmiter.listeners('msg'));

//добавили слушатель первым на событие 'msg'
myEmmiter.prependListener('msg', () => {
  console.log('msg prepend listener :)')
});

console.log('all listeners in msg = ' + myEmmiter.listeners('msg'));

//вывод имён событий из имитера
console.log(myEmmiter.eventNames());


//Обработка ошибок через иммитер
myEmmiter.on('error', (err) => {
  console.log(`произошла ошибка -  ${err.message}`);
});
myEmmiter.emit('error', new Error('BOOM!'));
