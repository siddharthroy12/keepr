const express = require('express')
const {
	createLabel,
	getLabel,
	renameLabel,
	deleteLabel
} = require('../controllers/labelControllers')
const { protect  } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.route('/')
	.get(protect, getLabel)
	.post(protect, createLabel)
router.route('/:id')
	.put(protect, renameLabel)
	.delete(protect, deleteLabel)

module.exports = router