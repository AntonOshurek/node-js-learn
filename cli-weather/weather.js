#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from "./services/storage.service.js";

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

const saveCity = async (city) => {
  if(!city.length) {
    printError('не передан город!')
    return;
  };

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess(`Город сохранён успешно! - ${city}`);
  } catch(e) {
    printError(`Возникла ошибка при сохранении города - ${e.message}`);
  };
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    // console.log(weather);
    printWeather(weather, getIcon(weather.weather[0].icon));
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
    return printHelp();
  }
  if(args.s) {
    return saveCity(args.s);
  }
  if(args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
