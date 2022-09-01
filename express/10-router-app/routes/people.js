const express = require('express')
const router = express.Router();

let { people } = require('../data')

router.post('/postman', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
})


router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people })
})


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find((person) => person.id == Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` })
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(200).json({ success: true, data: newPeople })
})

router.delete('/:id', (req, res) => {
    // const {id} = req.params - another way to get id
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter((person) => person.id !== Number(req.params.id))
    res.status(200).json({ success: true, data: newPeople })
})

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        // 400 - Bad request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
        return res.status(400).json({ success: false, msg: 'Please provide name value' })
    }
    // 201 - response for successful post api response
    res.status(201).json({ success: true, person: name })
    // Note in responses always try to use json() rather than send()
})
module.exports = router