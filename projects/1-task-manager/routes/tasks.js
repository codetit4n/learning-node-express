const express = require('express')
const router = express.Router()
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')

// app.get('/api/v1/tasks) - get all tasks
// app.post('/api/v1/tasks) - create new task
// app.get('/api/v1/tasks/:id) - get single task
// app.patch('/api/v1/tasks/:id) - update task
// app.delete('/api/v1/tasks/:id) - delete task


router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;