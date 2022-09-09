const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params; //taskID is alias for id
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task for id: ${taskID}` })
    }
    res.status(200).json({ task })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params; //taskID is alias for id
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, //makes sure it returns new value rather than the old one
        runValidators: true
    })
    if (!task) {
        return res.status(404).json({ msg: `No task for id: ${taskID}` })
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params; //taskID is alias for id
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return res.status(404).json({ msg: `No task for id: ${taskID}` })
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}