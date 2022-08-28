const authorize = (req, res, next) => {
    console.log('Authorize');
    next()
}

module.exports = authorize;