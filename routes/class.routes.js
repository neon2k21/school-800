const Router = require('express')
const router = new Router()
const classController = require('../controller/class.controller')

router.post('/createClass', classController.createClass)
router.delete('/deleteClass', classController.deleteClass)



module.exports = router

