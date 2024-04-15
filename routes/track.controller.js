const Router = require('express')
const router = new Router()
const trackController = require('../controller/track.controller')

router.post('/createTrack', trackController.createTrack)
router.delete('/deleteTrack', trackController.deleteTrack)
router.put('/updateTrack', trackController.updateTrack)



module.exports = router

