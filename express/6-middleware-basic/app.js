const express = require('express')
const app = express()

// req => middleware => res

// Here we will be tracking all the information about the request that is coming
const logger = (req, res, next) => {
    // This function is the middleware
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear()
    console.log(method, url, time);
    // res.send('Testing') //Imp to do
    next()// This can also be done
}

// We can put the middleware in between here
app.get('/', logger, (req, res) => {
    res.send('Home')
})

app.get('/about', logger, (req, res) => {
    res.send('About')
})

app.listen('5001', () => {
    console.log("Server listening on port 5001...");
})