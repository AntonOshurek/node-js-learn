// получает домашнюю дирректорию на компбютере "C:\Users\ANAS"
import { homedir } from 'os';
import { promises } from 'fs';
//writeFileSync записывает файлы синхронно

import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';
// библиотека для конкатинации путей - join
//basename - получает последнюю папку/файл из дирректории - basename(filePath) = "weather-data.json"
//dirname вернёт дирректорию - dirname(filePath) = "C:\Users\ANAS"
//extname вернёт расширение файла - extname(filePath) = ".json"
//relative показывает что нужно сделать что бы прийти от - к relative(filePath, dirname(filePath)) = ".."
//isAbsolute возвращает true or false если путь абсолютный или относительный isAbsolute(filePath) = true
//resolve вернёть то что будет если выполнить указанный переход - console.log(resolve('..')); = "c:\Users\ANAS\repositories\node-js-learn"
//sep вернёт сепаратор который используется в данной системе - sep = "\"
//--------------------
// console.log(basename(filePath));
// console.log(dirname(filePath));
// console.log(extname(filePath));
// console.log(relative(filePath, dirname(filePath)));
// console.log(isAbsolute(filePath));
// console.log(resolve('..'));
// console.log((filePath));
// console.log(sep)



const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
};

const isExist = async(path) => {
  try {
    await promises.stat(path);
    return true;
  } catch(e) {
    return false;
  }
}

const getKeyValue = async (key) => {
  if(await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  };
  return undefined;
};

const saveKeyValue = async (key, value) => {
  let data = {};

  if(await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  };

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
