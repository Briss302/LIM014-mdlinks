const { file, fileMd, directory, validAndResolvePath, readFile, getProperties, getLinksStatus } = require('../src/index');

// variables de pruebas
const filePath = "C:\\Users\\51947\\Documents\\Laboratoria\\LIM014-mdlinks\\pruebas\\read.md";
const dirPath = "C:\\Users\\51947\\Documents\\Laboratoria\\LIM014-mdlinks\\pruebas";
const relativePath = "pruebas/read.md"
const errPath = "prueba\\rea.md"

const resultElements = [
  {
    href: 'https://www.google.c',
    text: 'Google',
    file: 'pruebas/read.md'
  },
  {
    href: 'https://nodejs.org/api/index.ml',
    text: 'NodeJS',
    file: 'pruebas/read.md'
  },
  {
    href: 'https://www.youtube.com/',
    text: 'Youtube',
    file: 'pruebas/read.md'
  }
]

const resultFail = [
  {
    status: 500,
    statusText: 'Fail',
    href: 'https://www.google.c',
    text: 'Google',
    file: 'pruebas/read.md'
  },
  {
    status: 404,
    statusText: 'Fail',
    href: 'https://nodejs.org/api/index.ml',
    text: 'NodeJS',
    file: 'pruebas/read.md'
  }
]

const resultOk = [
  {
    status: 200,
    statusText: 'OK',
    href: 'https://www.youtube.com/',
    text: 'Youtube',
    file: 'pruebas/read.md'
  }
]
// const resultFail = ["El archivo se encuentra vacío"]

describe("Módulos para manejar operaciones de paths", () => {
  //ISFILE
  it("Debería ser una función", () => {
    expect(typeof file).toBe("function")
  });
  it("Debería devolver True si es un archivo", () => {
    expect(file(filePath)).toBeTruthy();
  });
  it("Debería devolver False si no es un archivo", () => {
    expect(file(dirPath)).toBeFalsy();
  });
  //ISFILE.MD
  it("Debería ser una función", () => {
    expect(typeof fileMd).toBe("function")
  });
  it("Debería devolver un valor True si es un archivo .MD", () => {
    expect(fileMd(filePath)).toBeTruthy();
  });
  it("Debería devolver un valor False si no es un archivo .MD", () => {
    expect(fileMd(dirPath)).toBeFalsy();
  })
  //ISDIRECTORY
  it("Debería ser una función", () => {
    expect(typeof directory).toBe("function")
  })
  it("Debería devolver un valor True si es un directorio", () => {
    expect(directory(dirPath)).toBeTruthy();
  })
  it("Debería devolver un valor False si no es un directorio", () => {
    expect(directory(filePath)).toBeFalsy();
  })
  //READ FILE
  it("Debería ser una función", () => {
    expect(typeof readFile).toBe("function")
  })
  // it("Debería devolver un valor False si no hay contenido en el archivo", () => {
  //   expect(directory(emptyFile)).toBeFalsy();
  // })
  // VALID AND RESOLVE
  it("Debería ser una función", () => {
    expect(typeof validAndResolvePath).toBe("function")
  })
  it("Debería devolver un path absoluto si el path existe", () => {
    expect(validAndResolvePath(relativePath)).toBe(filePath);
  })
  it("Debería devolver False si el path no existe", () => {
    expect(validAndResolvePath(errPath)).toBeFalsy();
  })
});


describe("Funciones para evaluar el estado de links ", () => {
  // GET PROPERTY OF ELEMENT
  it("Debería ser una función", () => {
    expect(typeof getProperties).toBe("function")
  })
  it("Debería devolver un array de objetos", () => {
    expect(getProperties(relativePath)).toStrictEqual(resultElements);
  })
  // PETICIÓN HTTP
  it("Debería ser una función", () => {
    expect(typeof getLinksStatus).toBe("function")
  });
  // it("Debería devolver un array de objetos de links con status Ok", () => {
  //   return getLinksStatus(resultElements).then(res => {
  //     expect(res).toStrictEqual(resultOk)
  //     // Avisar a Jest el termino del test
  //   })
  // });
  // it("Debería devolver un array de objetos de links con status Fail", () => {
  //   return getLinksStatus(resultElements).catch(err => {
  //     expect(err).toStrictEqual(resultFail)
  //     // Avisar a Jest el termino del test
  //   })
})





