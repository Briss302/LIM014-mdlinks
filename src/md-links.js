const path = require('path');
const { pathResolve } = require('./index')
// Aqui me retorna una promesa
const mdLinks = ((route, opcion) => {
  const normalizePath = path.normalize(route);
  return pathResolve(normalizePath)

});

module.exports = {
  mdLinks,
};
