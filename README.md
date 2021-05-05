# Markdown Links

## Índice

- [1. Resumen del proyecto](#1-Resumen-del-proyecto)
- [2. Instalación](#2-Instalación)
- [3. Consumo de la API](#3-Consumo-de-la-API)
- [4. JavaScript API](#4-JavaScript-API)
- [5. CLI](#5-CLI)
- [6. Diagrama de Flujo](#3-Diagrama-de-Flujo)

---

## 1. Resumen del proyecto

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, ...

En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema archivos, con el entorno (_proceso_, _env_, _stdin/stdout/stderr_), ...

En este proyecto crearás una herramienta de línea de comando (CLI) así como tu
propia librería (o biblioteca - library) en JavaScript.

## 2. Instalación ⚙️
- Instalación con GitHub
```
npm i https://github.com/Briss302/LIM014-mdlinks.git
```

## 4. JavaScript API
El módulo se puede importar en otros scripts de Node.js y ofrece la siguiente interfaz:
` mdLinks(path, options) `
#### Argumentos
- path : Ruta absoluta o relativa al archivo o directorio.
- options: Un objeto con las siguientes propiedades:
  - validate: Booleano que determina si se desea validar los links encontrados.

#### Valor de retorno

La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades:

```
const mdLinks = require('md-links');

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```
## 5. CLI 
` md-links <path-to-file> [options] `

```
md-links pruebas/read.md ---validate
md-links pruebas/read.md ---stats
md-links pruebas/read.md ---stats ---validate
md-links pruebas/read.md ---help
```
#### Options
`--help`
- Si deseas ayuda

![Option --validate](https://i.ibb.co/Jd4pCSy/help.png)

` --validate `
- Si pasamos la opción --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL que responde ok, entonces consideraremos el link como ok.

 ![Option --validate](https://i.ibb.co/m0K0rYL/validate.png)

` --stats `
- Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.

![Option --stats](https://i.ibb.co/mBxzvRY/stats.png)

`--stats --validate`
- Para obtener estadísticas que necesiten de los resultados de la validación.

![Option --stats](https://i.ibb.co/MGZyhh7/va-st.png)

## 6. Diagrama de Flujo

### API

![Diagrama de Flujo API](https://i.ibb.co/MyvXs98/API.png)

### CLI

![Diagrama de Flujo CLI](https://i.ibb.co/d5ktbvk/CLI.png)
