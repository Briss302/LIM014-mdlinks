const { mdLinks } = require("./src/md-links.js");
//C: /Users/51947/////Documents/Laboratoria///LIM014-mdlinks///pruebas

mdLinks("pruebas/read.md", { validate: true }).then(res => { console.log(res) }).catch(err => { console.log(err) })
