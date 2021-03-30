// Modulos NODEJS
const path = require("path");
const fs = require("fs");
// Rutas de prueba
const dir = "pruebas";
const filePrueba = "pruebas/read.md";

// Funciones con métodos sincronos
// Validar si exite la ruta
const pathExists = (route) => fs.existsSync(route);
// Resolver una ruta relativa en absoluta
const pathResolve = (route) => path.resolve(route);

// Vereficar si es un archivo, retorna un valor booleano
const file = (route) => fs.lstatSync(route).isFile();
// Verificar si es un archivo .md
const fileMd = (route) => path.extname(route) === ".md";
// Leer contenido de un archivo
const readFile = (route) => {
  const read = fs.readFileSync(route, { encoding: "utf8", flag: "r" });
  const readArray = read.split();
  return readArray;
};

// Verificar si es un directorio, retorna un valor booleano
const directory = (route) => fs.lstatSync(route).isDirectory();
// Leer contenido de un directorio, retorna un array con los nombres de archivos
const AccessDirectory = (route) => fs.readdirSync(route);

module.exports = {
  pathExists,
  pathResolve,
  file,
  fileMd,
  readFile,
  directory,
  AccessDirectory,
};
