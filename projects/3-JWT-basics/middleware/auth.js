const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors') // look for index.js by default


const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // don't need to pass the status code here
        throw new UnauthenticatedError('No token provided!')
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { id, username } = decoded
        req.user = { id, username }// this is how to send data from one middleware to next middleware
        next()

    } catch (err) {
        // don't need to pass the status code here
        throw new UnauthenticatedError('Not authorized to access this route!')
    }

}

module.exports = authenticationMiddleware