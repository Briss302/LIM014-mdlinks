#!/usr/bin/env node
// Funcion md-links
const { mdLinks } = require('../src/md-links');
// Funcion showResults
const { showResults } = require('./option');
// Con esta dependencia nos ayuda a imprimir en color en la terminal
const chalk = require('chalk');
// Con esta dependencia podemos crear banners con caracteres y simbolos
const figlet = require('figlet');
// Librería de CLI 
const { program } = require('commander');
program.version('0.0.1');
// process.argv contiene todos los argumentos de la linea de comando
const args = process.argv;

// Mostrar un banner con un mensaje formado por caracteres.
const msn = msn => {
  console.log(chalk.bold.cyan(figlet.textSync(msn, {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));
}
// IIFE (Immediately Invoked Function Expression)
(async () => {
  msn('Md Links - CLI');
})();

// 1.- Tendremos un comando llamado md-links
// 2.- El comando tomará cuatro argumentos: 
// help, --validate, --stats, --stats --validate
program
  .option('-e, --help', 'leer más información')
  .option('-va, --validate', 'Valid the status of the links')
  .option('-st, --stats', 'Shows basic statistics about links')
  .option('--stats --validate', 'Shows valid and statistics about this link')
program.parse(process.argv);

const options = program.opts();

if (args.length <= 4 && (args[2] !== ('--validate' || '--stats'))) {
  if (options.validate) {
    mdLinks(args[2], { validate: true })
      .then((res) => console.table(res))
      .catch((err) => console.log(err));
  }
  if (options.stats) {
    mdLinks(args[2], { validate: true })
      .then((res) => {
        const getResults = showResults(res);
        console.table({ Total: getResults.total, Unique: getResults.unique })
      })
      .catch((err) => console.log(err));
  }
}
if (args.length === 5) {
  if (options.validate && options.stats) {
    mdLinks(args[2], { validate: true })
      .then((res) => console.table(showResults(res)))
      .catch((err) => console.log(err));
  }
}
if ((args.length == 3 && args[2] === '--help')) {
  console.log(chalk.bold.yellow(`
      ------------------------------ HELP ---------------------------------
      | --validate         | 'Valid the status of the links'              |
      | --stats            | 'Shows basic statistics about links'         |
      | --stats --validate | 'Shows valid and statistics about this link' |
      ---------------------------------------------------------------------
    `));
}


//Nota
// fue colocado en la terminal para ser ejecutable al archivo
// chmod +x bin/cli.js
