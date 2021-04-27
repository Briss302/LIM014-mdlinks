// Modulos NODEJS
const path = require('path');
const fs = require('fs');
// Axios librería para hacer peticiones HTTP
const axios = require('axios');
// Rutas de prueba
const dir = 'pruebas/';
const filePrueba = 'pruebas/read.md';

// Leer contenido de un archivo
const readFile = (route) => {
  const read = fs.readFileSync(route, { encoding: "utf8", flag: "r" });
  const readContent = read.length > 0 ? read : false;
  return readContent;
};

// FUNCIÓN PARA FORMA LAS PROPIEDADES DEL ARRAY DE OBJETO
const getProperties = (route) => {
  const content = readFile(route);
  let arrayProperty = [];
  if (content) {
    // Patron de RegExp para la busqueda de text y link
    const patronLinkAndText = /\[(\w+.+?)\]\(((?:\/|https?:\/\/)[a-zA-Z\.\/=]+)\)/gi;
    const LinkAndText = content.match(patronLinkAndText);
    const stringLinkAndText = LinkAndText.join();
    // Patron de RegExp para la busqueda de Links
    const patronLink = /https?:\/\/[a-zA-Z\.\/=]+/g;
    const links = stringLinkAndText.match(patronLink);
    // Patron de RegExp para la busqueda del texto que acompaña al link
    const patronText = /\[([\w\s\d.()]+)\]/g;
    if (links.length > 0) {
      LinkAndText.forEach((element) => {
        const objectProperties = {
          href: element.match(patronLink).join().slice(0),
          text: element.match(patronText).join().slice(1, -1),
          file: route,
        };
        arrayProperty.push(objectProperties);
      });
    };
  }
  return arrayProperty.filter((element) => element !== undefined)
}
//console.log(getProperties(filePrueba));

// FUNCION PARA REALIZAR PETICIÓN HTTP Y EVALUAR EL ESTADO DE LAS URL
// Con axios, la cual genera una promesa. Por ello, se resuelve con then y para manejar el posible error con catch
const getLinksStatus = (elements) => {
  const linksArray = elements.map((e) =>
    axios.get(e.href)
      .then(res => ({ status: res.status, statusText: res.statusText, ...e }))
      .catch((err) => (err.response ? { status: err.response.status, statusText: "Fail", ...e } : { status: 500, statusText: "Fail", ...e })))
  return Promise.all(linksArray);
};
//getLinksStatus(getProperties("pruebas/read.md")).then(res => { console.log(res) }).catch(err => { console.log(err) });

// Vereficar si es un archivo, retorna un valor booleano
const file = (route) => fs.lstatSync(route).isFile();

// Verificar si es un archivo .md
const fileMd = (route) => path.extname(route) === ".md";

// VERIFICAR SI ES UN DIRECTORIO, RETORNA UN VALOR BOOBLEANO
const directory = (route) => fs.lstatSync(route).isDirectory();

// FUNCIÓN QUE VALIDA LA RUTA PARA RESOLVERLA EN ABSOLUTA
const validAndResolvePath = (route) => {
  const normalizePath = path.normalize(route);
  const pathExists = fs.existsSync(normalizePath) ? path.resolve(normalizePath) : false
  return pathExists;
};
//console.log(validAndResolvePath("pruebas/read.md"))
// RECURSIVIDAD
// 1.-Condición de parada
// 2.-Llamar a la función con un argumento distinto que nos permita 
// llegar en algún momento en la condición de parada
const getElements = (route) => {
  let arrayFinal = [];

  if (file(route) && fileMd(route)) {
    return getProperties(route);
  }
  if (directory(route)) {
    // readdirSync() me guarda los nombres de los archivos dentro del directorio con sus extenciones 
    const contentDirectory = fs.readdirSync(route);
    // El forEch será ejecutado dependendiendo de la cantidad de elemtos que contengan contentDirectory 
    contentDirectory.forEach((md) => {
      // a cada elemento dentro de contentDirecotry se le concatena la ruta del directorio.
      const path = route + "/" + md;
      // La ruta resultante se enviará como argumento a getLinks(xx), y el resultado de la  
      // recursividad ( un array) será almacenado en "result"
      const result = getElements(path);
      // y juntaremos el array de result a arrayFinal
      arrayFinal = arrayFinal.concat(result);
    });
    if (contentDirectory.length === 0) return "Su directorio no contiene elementos"
  }
  // Leer contenido de un directorio, retorna un array con los nombres de archivos
  return arrayFinal;
}
//console.log(getElements(dir));


module.exports = {
  file,
  fileMd,
  directory,
  readFile,
  validAndResolvePath,
  getProperties,
  getLinksStatus,
  getElements,
};
