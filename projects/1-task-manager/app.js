const express = require('express')
const app = express()
const port = 5001;
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

const tasks = require('./routes/tasks')
app.use(express.static('./public'))

// middleware
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)


app.use(notFound)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (err) {
        console.log(err);
    }
}

start()