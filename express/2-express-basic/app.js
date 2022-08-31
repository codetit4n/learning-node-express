const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Home Page")
})

app.get('/about', (req, res) => {
    res.send("About Page")
})

app.get('/about', (req, res) => {
    // Technically we can rely on express for the status but it can be done manually like this
    res.status(200).send("About Page")
})

// * means all
app.all('*', (req, res) => {
    //Note here we can chain methods like:
    res.status(404).send('<h1>Resource not found!</h1>')
})

app.listen(5001, () => {
    console.log("Server listening on port 5001");
})