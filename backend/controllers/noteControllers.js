const asyncHandler = require('express-async-handler')
const Note = require('../models/Note')
const User = require('../models/User')

// @desc Get notes of a user
// @route GET /api/notes/user/:id
// @access Private
const getNotesUser = asyncHandler(async (req, res) => {
	if (req.user._id.toString() !== req.params.id ) {
		res.status(403)
		throw new Error("You don't have access to these notes")
	}

	const notes = await Note.find({ owner: req.params.id })

	res.status(200)
	res.json(notes)
})

// @desc Get a note
// @route GET /api/notes/:id
// @access Private
const getNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	res.status(200)
	res.json(note)
})

// @desc Get all notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({trashed: false, owner: req.user._id})

	res.status(200)
	res.json(notes)
})

// @desc Get all trashed notes
// @route GET /api/notes/trashed
// @access Private
const getTrashedNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find({trashed: true, owner: req.user._id})

	res.status(200)
	res.json(notes)
})


// @desc Create a note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
	const { title, body, image, labels, color } = req.body

	if (title.trim() === '' && body.trim() === '') {
		res.status(400)
        throw new Error('Either title or body is required')
	}

	if (title) {
		title = title.trim()
	}

	if (body) {
		body = body.trim()
	}

	try {
		const newNote = await Note.create({
			owner: req.user._id,
			title: title || '',
			body: body || '',
			labels: labels || [],
			color: color || '',
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

	if (title !== undefined && body !== undefined) {
		if (title.trim() === '' && body.trim() === '') {
			res.status(400)
			throw new Error('Either title or body can be empty, not both')
		}
	}

	if (title) {
		title = title.trim()
	}

	if (body) {
		body = body.trim()
	}

	let note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	testTitle = title === undefined ? note.title : title
	testBody = body === undefined ? note.body : body

	if (testBody === "" && testTitle === "") {
		res.status(400)
		throw new Error('Either title or body can be empty, not both')
	}

	try {
		note.title = testTitle
		note.body = testBody
		note.image = image === undefined ? note.image : image
		note.labels = labels === undefined ? note.labels : labels
		note.color = color === undefined ? note.color : color
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
	let note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	if (note.trashed) {
		res.status(400)
		throw new Error("This note is already trashed")
	}

	try {
		const owner = await User.findById(note.owner)
		owner.notes = owner.notes.filter(ownerNote => ownerNote.toString() !== note._id.toString())
		owner.trash.push(note._id)
		await owner.save()
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
	let note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}

	if (note.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	if (!note.trashed) {
		res.status(400)
		throw new Error("Note is not trashed")
	}

	try {
		const owner = await User.findById(note.owner)
		owner.notes.push(note._id)
		owner.trash = owner.trash.filter(ownerNote => ownerNote.toString() !== note._id.toString())
		owner.save()
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
	let note = await Note.findById(req.params.id)

	if (!note) {
		res.status(404)
		throw new Error('Note not found')
	}
	
	if (note.owner.toString() !== req.user._id.toString()) {
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
	getNotesUser,
	getNote,
	getNotes,
	getTrashedNotes,
	createNote,
	updateNote,
	trashNote,
	restoreNote,
	deleteNote
}