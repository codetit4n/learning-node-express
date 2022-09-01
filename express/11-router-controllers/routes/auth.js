const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    let { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome! ${name}`)
    }
    // 401 = unauthorized
    res.status(401).send('Please provide credentials!')
})

module.exports = router