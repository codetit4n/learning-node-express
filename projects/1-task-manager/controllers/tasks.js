const Task = require('../models/Task')

const getAllTasks = (req, res) => {
    res.send("all tasks")
}

const getTask = (req, res) => {
    res.send("single tasks")
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (err) {
        // 500 - general server error
        res.status(500).json({ msg: err })
    }
}

const updateTask = (req, res) => {
    res.send("update task")
}

const deleteTask = (req, res) => {
    res.send("delete task")
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}