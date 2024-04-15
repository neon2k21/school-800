const Router = require('express')
const router = new Router()
const individual_tasksController = require('../controller/individual_tasks.controller')



router.post('/createTask', individual_tasksController.createTask)
router.delete('/deleteTask', individual_tasksController.deleteTask)
router.post('/getTask',individual_tasksController.getTask)
router.put('/setTaskCompleted',individual_tasksController.setTaskCompleted)




module.exports = router

