const Router = require('express')
const router = new Router()
const individual_tasksController = require('../controller/individual_tasks.controller')



router.post('/createIndividualTask', individual_tasksController.createIndividualTask)
router.delete('/deleteIndividualTask', individual_tasksController.deleteTask)
router.post('/getCurrentTask',individual_tasksController.getCurrentTask)
router.put('/setIndividualTaskCompleted',individual_tasksController.setTaskCompleted)

router.post('/getAllIndividualTasks', individual_tasksController.getAllIndividualTasks)


router.get('/getAllTasksForCheck', individual_tasksController.getAllTasksForCheck)


router.get('/getAllIndividualTasksData', individual_tasksController.getAllIndividualTasksData)
module.exports = router

