const express = require('express')
const {
	createLabel,
	renameLabel,
	deleteLabel
} = require('../controllers/labelControllers')
const { protect  } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.get('/', protect, createLabel)
router.route('/:id')
	.put(protect, renameLabel)
	.delete(protect, deleteLabel)

module.exports = router