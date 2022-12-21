#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printHelp, printSuccess, printError } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if(!token.length) {
    printError('не передан токен!')
    return;
  };

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess(`Токен сохранён успешно! - ${token}`);
  } catch(e) {
    printError(`Возникла ошибка при сохранении токена - ${e.message}`);
  };
};

const getForcast = async () => {
  try {
    const weather = await getWeather('poznan');
    console.log(weather);
  } catch(error) {
    if(error?.response?.status == 404) {
      printError('Неверно указан город')
    } else if(error?.response?.status == 401) {
      printError('неверно указан токен')
    } else {
      printError(`возникла ошибка в моменте вызова функции getWeather - error message: ${error.message}`)
    };
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
  getForcast();
};

initCLI();
