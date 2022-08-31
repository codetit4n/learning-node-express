const authorize = (req, res, next) => {
    // console.log('Authorize'); //old example
    // next()
    const { user } = req.query;
    if (user === 'lokesh') {
        req.user = { name: 'lokesh', id: 3 }
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
    next()
}

module.exports = authorize;