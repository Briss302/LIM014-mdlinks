// Modulos NODEJS
const path = require('path');
const fs = require('fs');
// Axios librería para hacer peticiones HTTP
const axios = require('axios');
// Rutas de prueba
const dir = 'pruebas/';
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
// Propiedades del link
const getProperties = (route) => {
  const content = readFile(route);
  let arrayProperty = [];
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
        path: route,
        text: element.match(patronText).join().slice(1, -1),
        url: element.match(patronLink),
      };
      arrayProperty.push(objectProperties);
    });
    return arrayProperty;
  };
  return links.filter((link) => link !== undefined)
}
console.log(getProperties(filePrueba));


//Obtener Links
const getLinks = (textFile) => {
  const content = readFile(textFile);
  const patronLink = /https?:\/\/[a-zA-Z\.\/=]+/g;
  //const patronText = ;
  const links = content.match(patronLink);
  return links.filter((link) => link !== undefined)
}
// Petición HTTP
// AXIOS DE MANERA AUTOMÁTICA CREA UNA PROEMSA
const getStatus = (arrayLinks) => {
  const links = getLinks(arrayLinks)
  //const getLinksArray = getLinks(route);
  const arr = links.map((url) =>
    axios({
      method: 'GET',
      url: url
    }).then(res => ({ status: res.status, statusText: res.statusText, u: res.config.url }))
      .catch(err => ({ status: "500", statusText: "error de servidor", u: err.config.url })))
  //console.log(arr)
  return Promise.all(arr);
};
//getStatus("pruebas/read.md").then(res => { console.log(res) }).catch(err => { console.log(err) });



//RESUMEN DE HOY
/*
1.- FUNCION QUE VALIDE SI EXISTE PAHT Y LO RESUELVA 
2.- FUNCION QUE CONTENGA LAS EXPRESIONES REGUALES QUE BUSQUEN LINK, TEXTO DEL LINK
3.- FUNCION QUE GUARDE LO BUSCADO EN UN ARRAY DE OBJETOS CON {PATH, TEXTO DE LINK, LINK}
4.- pasar el arrat de objetos a la FUNCION DE OBTENER STATUS CON HTTP 
XX.- RECURSIVIDAD SI ES UN directorio
 
*/
// // Con forEach
// const getStatus = (arrayLinks) => {
//   const links = getLinks(arrayLinks)
//   //const getLinksArray = getLinks(route);
//   const arr = links.forEach((url) =>
//     axios({
//       method: 'HEAD',
//       url: url
//     })
//       .then(res => ({ status: res.status, statusText: res.statusText }))
//       .catch(err => ({ status: err.response.status, statusText: err.response.statusText })))
//   return console.log(Promise.all(arr));
// };
// getStatus("pruebas/read.md");
// HACER UNA FUNCIÓN Q OBTENGA UN ARRAY DE OBJETOS EL TEXT DEL LIK, LINK, FILE


// Verificar si es un directorio, retorna un valor booleano
const directory = (route) => fs.lstatSync(route).isDirectory();
const resolve = pathResolve(dir);
console.log(resolve);

// Acceder a directorio 
let array = [];
const AccessDirectory = (route) => {
  // Leer contenido de un directorio, retorna un array con los nombres de archivos
  const arrayFiles = fs.readdirSync(route);
  console.log(arrayFiles);
  const maparray = arrayFiles.map(file => {
    const pathsAbsulte = route + "/" + file;
    const normalize = path.normalize(pathsAbsulte)
    return normalize
  })
  maparray.forEach((file) => {
    if (fileMd(file)) {
      array.push(file)
    }

    if (directory(file)) {
      array.push(file)
    }
  });
  return array;
}
console.log("AccesDirectory", AccessDirectory(resolve));

/*
// Acceder a directorio 
let array = [];
const AccessDirectory = (route) => {
  // Leer contenido de un directorio, retorna un array con los nombres de archivos
  const arrayFiles = fs.readdirSync(route);
  console.log(arrayFiles);
  const maparray = arrayFiles.map(file => {
    const pathsAbsulte = route + "/" + file;
    const normalize = path.normalize(pathsAbsulte)
    return normalize
  })
  maparray.forEach((file) => {
    if (fileMd(file)) {
      array.push(file)
    }
 
    if (directory(file)) {
      array.push(file)
    }
  });
  return array;
}
console.log(AccessDirectory(resolve));
*/

module.exports = {
  pathExists,
  pathResolve,
  file,
  fileMd,
  readFile,
  directory,
  AccessDirectory,
};
