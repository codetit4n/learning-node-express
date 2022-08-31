const express = require('express')
//Using path because we have to use absolute path here
const path = require('path')
const app = express();

//setup static and middleware
app.use(express.static("./public"))

// In this case we would send a file
// app.get('/', (req, res) => {
//     //This function is used to send file in express
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

app.all('*', (req, res) => {
    res.status(404).send('Resource Not Found!')
})

app.listen('5001', () => {
    console.log("Server listening on port 5001...");
})