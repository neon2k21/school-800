const Router = require('express')
const router = new Router()
const groupController = require('../controller/groups.controller')

router.post('/createGroup', groupController.createGroup)
router.delete('/deleteGroup', groupController.deleteGroup)



module.exports = router

