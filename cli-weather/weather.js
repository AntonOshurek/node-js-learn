#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const initCLI = () => {
  console.log('init CLI');
  const args = getArgs(process.argv);

  if(args.h) {
    printHelp();
  }
  if(args.s) {
  }
  if(args.t) {
    saveKeyValue('token', args.k);
  }
  //вывести погоду
};

initCLI();
