const { getLinksStatus } = require('../src/index');
const axios = require('axios');
jest.mock('axios');


describe("Petición Http", () => {
  it("Mock_Debería devolver un array de objetos de links con status Ok", () => {
    const arrinput = [
      {
        href: 'https://www.youtube.com/',
        text: 'Youtube',
        file: 'pruebas/read.md'
      }
    ];
    const resultHttp = [
      {
        status: 200,
        statusText: 'OK',
        href: 'https://www.youtube.com/',
        text: 'Youtube',
        file: 'pruebas/read.md'
      }
    ]
    const response = {
      status: 200,
      statusText: 'OK'
    };
    axios.get.mockResolvedValue(response);
    return getLinksStatus(arrinput).then(res => {
      expect(res).toStrictEqual(resultHttp)
    });
  })
  it("Mock_Debería devolver un array de objetos de links con status Fail", () => {
    const arrinput = [
      {
        href: 'https://nodejs.org/api/index.ml',
        text: 'NodeJS',
        file: 'pruebas/read.md'
      }
    ];
    const resultHttp = [
      {
        status: 404,
        statusText: 'Fail',
        href: 'https://nodejs.org/api/index.ml',
        text: 'NodeJS',
        file: 'pruebas/read.md'
      }
    ];
    const response = {
      status: 404,
      statusText: 'Fail'
    };
    axios.get.mockImplementation(() => {
      return Promise.reject(response)
    });
    return getLinksStatus(arrinput).catch(err => {
      expect(err).toStrictEqual(resultHttp)
    });
  })
})