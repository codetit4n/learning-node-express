// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body;

    // we can also do validation using mongoose - but here we are not using db
    if (!username || !password) {
        // Here, we can throw error without try catch, because we are using 'express-async-errors' package
        throw new CustomAPIError('Please provide email and password', 400)
    }

    // just for demo, normally provided by DB!!!
    const id = new Date().getDate()

    // try to keep payload small, better experience for the user.
    // just for demo, in production use long, complex and unguessable string value!!!
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    console.log(req.headers);
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, Lokesh`, secret: `Here is your authorized data. Your luck number is ${luckyNumber}`
    });
}

module.exports = { login, dashboard }