const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid!')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes
        // note we are getting payload.userId and name from createJWT method in User model.
        req.user = { userId: payload.userId, name: payload.name }
        next()
    } catch (err) {
        throw new UnauthenticatedError('Authentication invalid!')
    }
}

module.exports = auth