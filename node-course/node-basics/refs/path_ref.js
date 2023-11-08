import { homedir } from "os";
import { join, basename, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const scriptName = basename(__filename);
const __dirname = dirname(__filename);

console.log("Имя текущего файла:", scriptName);

console.log(join(homedir(), "test.json"));
