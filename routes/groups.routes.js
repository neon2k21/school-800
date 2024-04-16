const Router = require('express')
const router = new Router()
const groupController = require('../controller/groups.controller')

router.post('/createGroup', groupController.createGroup)
router.delete('/deleteGroup', groupController.deleteGroup)
router.put('/setTaskforGroups', groupController.setTaskforGroups)
router.post('/getImageOfGroup', groupController.getImageOfGroup)

router.get('/getAllGroups', groupController.getAllGroups)

module.exports = router

