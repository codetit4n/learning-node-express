const mongoose = require('mongoose')

// creating schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String, //type of name
        // required: true, //name cannot be empty
        required: [true, 'must provide name'], //we can also attach a msg with this
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false //by default task will not be completed
    }
})

// creating model - pass name and schema here
module.exports = mongoose.model('Task', TaskSchema)