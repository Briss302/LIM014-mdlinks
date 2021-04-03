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
// HACER UNA FUNCIÓN Q OBTENGA UN ARRAY DE OBJETOS EL TEXT DEL LIK, LINK, FILE
// Petición HTTP
const linksStatus = (route) => {
  const getLinksArray = getLinks(route);
  axios({
    method: 'HEAD',
    url: 'https://es.wikipedia.org/wiki/Markdown'
  }).then(res => {
    console.log(res.status)
  }).catch(err => { console.log(err) });
};
linksStatus();
// AXIOS DE MANERA AUTOMATICA CREA UNA PROEMSA

// Verificar si es un directorio, retorna un valor booleano
const directory = (route) => fs.lstatSync(route).isDirectory();
// Acceder a directorio 
const AccessDirectory = (route) => {
  // Leer contenido de un directorio, retorna un array con los nombres de archivos
  const arrayFiles = fs.readdirSync(route);
  const getFileMd = arrayFiles.filter((file) => fileMd(file));
  return getFileMd;
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
