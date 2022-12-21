// получает домашнюю дирректорию на компбютере "C:\Users\ANAS"
import { homedir } from 'os';
// библиотека для конкатинации путей - join
//basename - получает последнюю папку/файл из дирректории - basename(filePath) = "weather-data.json"
//dirname вернёт дирректорию - dirname(filePath) = "C:\Users\ANAS"
//extname вернёт расширение файла - extname(filePath) = ".json"
//relative показывает что нужно сделать что бы прийти от - к relative(filePath, dirname(filePath)) = ".."
//isAbsolute возвращает true or false если путь абсолютный или относительный isAbsolute(filePath) = true
//resolve вернёть то что будет если выполнить указанный переход - console.log(resolve('..')); = "c:\Users\ANAS\repositories\node-js-learn"
//sep вернёт сепаратор который используется в данной системе - sep = "\"
import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';

const filePath = join(homedir(), 'weather-data.json');

const saveKeyValue = (key, value) => {
  console.log(basename(filePath));
  console.log(dirname(filePath));
  console.log(extname(filePath));
  console.log(relative(filePath, dirname(filePath)));
  console.log(isAbsolute(filePath));
  console.log(resolve('..'));
  console.log((filePath));
  console.log(sep)
};

export { saveKeyValue };
