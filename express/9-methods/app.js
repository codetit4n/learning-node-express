const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.post('/api/people', (req, res) => {
    const { name } = req.body;
    if (!name) {
        // 400 - Bad request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
        return res.status(400).json({ success: false, msg: 'Please provide name value' })
    }
    // 201 - response for successful post api response
    res.status(201).json({ success: true, person: name })
    // Note in responses always try to use json() rather than send()
})


app.post('/login', (req, res) => {
    let { name } = req.body;
    if (name) {
        return res.status(200).send(`Welcome! ${name}`)
    }
    // 401 = unauthorized
    res.status(401).send('Please provide credentials!')
})

app.post('/api/postman/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...people, name] })
})


app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people })
})


app.put('/api/people/:id', (req, res) => {
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

app.delete('/api/people/:id', (req, res) => {
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


app.listen('5001', () => {
    console.log("Server listening to port 5001...");
})