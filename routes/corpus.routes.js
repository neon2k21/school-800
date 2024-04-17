const Router = require('express')
const router = new Router()
const corpusController = require('../controller/corpus.controller')

router.post('/createCropus', corpusController.createCropus)
router.delete('/deleteCorpus', corpusController.deleteCorpus)
router.post('/getCorpusName', corpusController.getCorpusName)


module.exports = router

