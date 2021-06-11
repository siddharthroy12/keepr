const asyncHandler = require('express-async-handler')
const Note = require('../models/Note')
const User = require('../models/User')

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
			owner: req.user._id,
			title: title || '',
			body: body || '',
			labels: labels || [],
			image: image || ''
		})

		const user = await User.findById(req.user._id)
    	user.notes.push(newNote._id)
    	await user.save()

		res.status(201)
		res.json(newNote)

	} catch(error) {

		res.status(500)
		throw new Error('Failed to create Note')
	}
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

	if (note.owner !== req.user._id) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	try {
		note.title = title
		note.body = body
		note.image = image
		note.labels = labels
		note.color = color
		await note.save()

		res.status(200)
		res.json(note)

	} catch (error) {

		res.status(500)
		throw new Error('Failed to update note')
	}
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

	if (note.owner !== req.user._id) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	try {
		note.trashed = true
		await note.save()

		res.status(200)
		res.json(note)
	} catch (error) {
		res.status(500)
		throw new Error('Failed to trash note')
	}


})

// @desc Restore a note
// @route GET /api/notes/:id/restore
// @access Private
const restoreNote = asyncHandler(async (req, res) => {
	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.owner !== req.user._id) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	try {
		note.trashed = false
		await note.save()

		res.status(200)
		res.json(note)
	} catch (error) {
		res.status(500)
		throw new Error('Failed to restore note')
	}
})

// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
	let note = Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}
	
	if (note.owner !== req.user._id) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	const user = await User.findById(note.owner)

    if (user) {
        user.notes = user.notes.filter(userNote => userNote.toString() !== note._id.toString())
        await user.save()
    }
    
	try {
		await note.remove()
	} catch(error) {
		res.status(500)
		throw new Error('Failed to delete note')
	}
	
    
	res.json({message: 'Note removed'})
})

module.exports = {
	createNote,
	updateNote,
	trashNote,
	restoreNote,
	deleteNote
}