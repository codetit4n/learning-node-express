const http = require('http')

const server = http.createServer((req, res) => {
    console.log('request event');
    res.end('Hello World')
})

server.listen(5001, () => {
    console.log('Server listening on port: 5001...');
})