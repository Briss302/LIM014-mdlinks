// const get = jest.fn((href) => {
//   // let status;
//   // let statusText;

//   // if (href === 'https://nodejs.org/api/index.ml') {
//   //   status = 404;
//   //   statusText = 'Fail'
//   //   return Promise.reject({ status, statusText });
//   // } else {
//   //   status = 200;
//   //   statusText = 'OK'
//   //   return Promise.resolve({ status, statusText });
//   // }
// });

const get = jest.fn();

module.exports = { get }
