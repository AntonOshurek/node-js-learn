#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  try {
    await saveKeyValue('token', token);
    printSuccess(`Токен сохранён успешно! - ${token}`);
  } catch(e) {
    printError(`Возникла ошибка при сохранении токена - ${e.message}`);
  };
};

const initCLI = () => {
  console.log('init CLI');
  const args = getArgs(process.argv);

  if(args.h) {
    printHelp();
  }
  if(args.s) {
  }
  if(args.t) {
    return saveToken(args.t);
  }
  //вывести погоду
};

initCLI();
