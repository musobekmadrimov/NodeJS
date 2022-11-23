const os = require('node:os');

const freemem = os.freemem();
const userInfo = os.userInfo();
const totalmem = os.totalmem();
console.log(freemem / 1024 / 1024);
// console.log(userInfo);
console.log(totalmem / 1024 / 1024);
console.log(totalmem / 1024 / 1024 - freemem / 1024 / 1024);