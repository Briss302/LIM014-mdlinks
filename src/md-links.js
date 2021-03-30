const path = require("path");
const fs = require("fs");

const relativa = "pruebas";
const archivo = "pruebas/javascript.js";
// const absoluta = "C:Users\51947DocumentsLaboratoriaLIM014-mdlinkspruebas";

const path1 = path.resolve(archivo);

console.log(path1);

// Calling fs.Stats isDirectory()

fs.stat(archivo, (err, stats) => {
  if (err) throw err;
  // console.log(`stats: ${JSON.stringify(stats)}`);
  console.log(stats.isDirectory());
});

const sincronoPath = fs.lstatSync(archivo).isDirectory();
console.log(sincronoPath);
