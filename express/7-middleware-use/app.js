const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')

// app.use(logger)
// app.use('/api', logger)
// For multiple middleware functions, simply put them in array
app.use([logger, authorize])

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})
app.get('/api/products', (req, res) => {
    res.send('Products')
})

app.get('/api/item', (req, res) => {
    console.log(req.user);
    res.send('Items')
})

app.listen('5001', () => {
    console.log("Server listening on port 5001...");
})