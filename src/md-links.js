const { validAndResolvePath, getLinksStatus, getElements } = require('./index')


const mdLinks = ((route, option = { validate: false }) => {
  return new Promise((resolve, reject) => {

    const isvalid = validAndResolvePath(route);

    if (isvalid) {
      const accessElements = getElements(isvalid);
      if (option.validate === true) return resolve(getLinksStatus(accessElements))
      if (option.validate === false) return resolve(accessElements)
    }
    if (isvalid === false) return reject("Ruta invalida")

  })

});


module.exports = {
  mdLinks,
};
