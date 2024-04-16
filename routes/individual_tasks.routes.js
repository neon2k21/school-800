const Router = require('express')
const router = new Router()
const individual_tasksController = require('../controller/individual_tasks.controller')



router.post('/createIndividualTask', individual_tasksController.createTask)
router.delete('/deleteIndividualTask', individual_tasksController.deleteTask)
router.post('/getIndividualCurrentTask',individual_tasksController.getTask)
router.put('/setIndividualTaskCompleted',individual_tasksController.setTaskCompleted)
router.post('/getAllIndividualTasks', individual_tasksController.getAllIndividualTasks)



module.exports = router

