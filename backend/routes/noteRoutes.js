const express = require('express')
const {
	createNote,
	updateNote,
	trashNote,
	restoreNote,
	deleteNote
} = require('../controllers/noteControllers')
const { protect } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.route('/')
	.post(protect, createNote)
router.route('/:id')
	.put(protect, updateNote)
	.delete(protect, deleteNote)
router.get('/:id/trash', protect, trashNote)
router.get('/:id/restore', protect, restoreNote)

module.exports =  router