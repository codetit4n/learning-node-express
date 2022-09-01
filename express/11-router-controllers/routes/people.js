const express = require('express')
const router = express.Router();

const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
} = require('../controllers/people')

// router.get('/', getPeople)
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)


// Notice how we are writing 2 line in 1 line of code by chaining them together
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

// Here, basically we are chaining the similar routes together

module.exports = router