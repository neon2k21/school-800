const Router = require('express')
const router = new Router()
const portfolioController = require('../controller/portfolio.controller')

router.post('/createPortfolio', portfolioController.createPortfolio)
router.delete('/deletePortfolio', portfolioController.deletePortfolio)
router.put('/setPortfolioScore', portfolioController.setPortfolioScore)


module.exports = router

