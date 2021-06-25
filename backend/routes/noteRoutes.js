const express = require('express')
const {
	getNotesUser,
	getNote,
	getNotes,
	searchNotes,
	getTrashedNotes,
	createNote,
	updateNote,
	trashNote,
	restoreNote,
	deleteNote
} = require('../controllers/noteControllers')
const { protect, admin } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.route('/')
	.post(protect, createNote)
	.get(protect, getNotes)
router.get('/trashed', protect, getTrashedNotes)
router.get('/search', protect, searchNotes)
router.route('/user/:id')
	.get(protect, admin, getNotesUser)
router.route('/:id')
	.get(protect, getNote)
	.put(protect, updateNote)
	.delete(protect, deleteNote)
router.get('/:id/trash', protect, trashNote)
router.get('/:id/restore', protect, restoreNote)

module.exports =  router