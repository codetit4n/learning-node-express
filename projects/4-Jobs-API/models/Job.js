const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name!'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position!'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        // every time we will create a job we will assign it to a user
        type: mongoose.Types.ObjectId,
        ref: 'User', //which model we are referencing
        required: [true, 'Please provide user!']
    }
    // to store timestamps
}, { timestamps: true })

module.exports = mongoose.model('Job', JobSchema)