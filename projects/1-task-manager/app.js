const express = require('express')
const app = express()
const port = 5001;

const tasks = require('./routes/tasks')
app.use(express.static('./public'))

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)


app.listen(port, () => {
    console.log("Server listening on port 5001...");
})