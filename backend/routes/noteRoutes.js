const express = require('express')
const {
	getNotesUser,
	getNote,
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
router.route('/user/:id')
	.get(protect, getNotesUser)
router.route('/:id')
	.get(protect, getNote)
	.put(protect, updateNote)
	.delete(protect, deleteNote)
router.get('/:id/trash', protect, trashNote)
router.get('/:id/restore', protect, restoreNote)

module.exports =  router