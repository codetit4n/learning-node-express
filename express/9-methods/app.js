const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse the data
app.use(express.urlencoded({ extended: false }))


app.post('/login', (req, res) => {
    let { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome! ${name}`)
    }
    // 401 = unauthorized
    res.status(401).send('Please provide credentials!')
})

app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})


app.listen('5001', () => {
    console.log("Server listening to port 5001...");
})