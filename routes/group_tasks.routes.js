const Router = require('express')
const router = new Router()
const group_tasksController = require('../controller/group_tasks.controller')

router.post('/createTask', group_tasksController.createTask)
router.delete('/deleteTask', group_tasksController.deleteTask)
router.post('/getTask',group_tasksController.getTask)
router.put('/setTaskCompleted',group_tasksController.setTaskCompleted)

router.post('/getAllGroupTasks',group_tasksController.getAllGroupTasks)

router.get('/getAllGroupTasksData', group_tasksController.getAllGroupTasksData)

module.exports = router

