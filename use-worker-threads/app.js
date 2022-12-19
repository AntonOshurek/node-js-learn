const factorial = require('./factorial');

const compute = (array) => {
  const arr = [];
  for(i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
  return array.map((el) => {
    return factorial(el);
  });
}

const main = () => {
  performance.mark('start');

  const result = [
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
  ];

  console.log(result);

  performance.mark('end');
  performance.measure('main', 'start', 'end');
  console.log(performance.getEntriesByName('main').pop());

  setTimeout(() => {
    console.log('TimeOut')
  }, 500)

  console.log('start')
};

main();
