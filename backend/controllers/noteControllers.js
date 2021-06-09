const asyncHandler = require('express-async-handler')
const Note = require('../models/Note')
const User = require('../models/User')
const Label = require('../models/Label')

// @desc Create a note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
	const { title, body, image, labels } = req.body

	if (title.trim() === '' && body.trim() === '') {
		res.status(400)
        throw new Error('Either title or body is required')
	}

	try {
		const newNote = await Note.create({
			owner: req._user._id,
			title: title || '',
			body: body || '',
			labels: labels || [],
			image: image || ''
		})

		const user = await User.findById(req.user._id)
    	user.notes.push(newNote._id)
    	await user.save()

	} catch(error) {
		res.status(500)
		throw new Error('Failed to create Note')
	}

	res.json(newPost)
})

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
	const { title, body, image, labels, color } = req.body

	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	note.title = title
	note.body = body
	note.image = image
	note.labels = labels
	note.color = color

	res.json(await note.save())
})

// @desc Trash a note
// @route GET /api/notes/:id/trash
// @access Private
const trashNote = asyncHandler(async (req, res) => {
	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	note.trashed = true

	res.json(await note.save())
})

// @desc Restore a note
// @route GET /api/notes/:id/restore
// @access Private
const trashNote = asyncHandler(async (req, res) => {
	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	note.trashed = false

	res.json(await note.save())
})

// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Private
const trashNote = asyncHandler(async (req, res) => {
	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	const user = await User.findById(note.owner)
    if (user) {
        user.notes = user.notes.filter(userNote => userNote.toString() !== note._id.toString())
        await user.save()
    }
    
	await note.remove()
    
	res.json({message: 'Note removed'})
})

module.exports = {
	createNote,
	updateNote,
	trashNote
}