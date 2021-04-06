const { isAbsolute } = require('path');
const path = require('path');
const { pathResolve } = require('./index')
// Aqui me retorna una promesa
// opcion = {validate: true o false} => trabajar en esta funcion
// resolve y reject en funcion mdlinks
const mdLinks = ((route, opcion) => {

  const normalizePath = path.normalize(route);
  return pathResolve(normalizePath)
})



module.exports = {
  mdLinks,
};
