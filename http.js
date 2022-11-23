const http = require('node:http');

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Asosiy sahifa!")
        res.end();
    }

    if (req.url === "/salom") {
        res.write("Salom sahifasi!")
        res.end();
    }
});
// server.on('connection', (socket) => {
//     console.log("Yangi bog'lanish!");
// })
server.listen(8000);
console.log(`${server.address().port} portni eshitishni boshladim...`);