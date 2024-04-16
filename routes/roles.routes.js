const Router = require('express')
const router = new Router()
const rolesController = require('../controller/roles.controller')

router.post('/createRole', rolesController.createRole)
router.delete('/deleteRole', rolesController.deleteRole)
router.put('/updateRole', rolesController.updateRole)



module.exports = router

