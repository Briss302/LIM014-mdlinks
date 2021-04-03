// Modulos NODEJS
const path = require('path');
const fs = require('fs');
// Axios librería para hacer peticiones HTTP
const axios = require('axios');
// Rutas de prueba
const dir = 'pruebas';
const filePrueba = 'pruebas/read.md';

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
  return read;
};
readFile(filePrueba);
// Busqueda de links
const getLinks = (textFile) => {
  const content = readFile(textFile);
  const patron = /https?:\/\/[a-zA-Z\.\/=]+/g
  const links = content.match(patron);
  return links
}

//console.log(AccessDirectory(dir));

module.exports = {
  pathExists,
  pathResolve,
  file,
  fileMd,
  readFile,
  directory,
  AccessDirectory,
};
