const Router = require('express')
const router = new Router()
basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', basketController.getBasket)
router.post('/', authMiddleware, basketController.createItem)
router.delete('/', authMiddleware, basketController.deleteItem)

module.exports = router