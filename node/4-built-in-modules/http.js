const http = require('http');

//to create new server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to our home page')
    } else if (req.url === '/about') {
        res.end('Here is our short history')
    } else {
        res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
        `)
    }
    // res.write('Welcome to our home page') //responding to request
    // res.end() //to end the request
})

server.listen(5001); //which port the server will be listening to