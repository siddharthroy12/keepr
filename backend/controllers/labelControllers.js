const asyncHandler = require('express-async-handler')
const Label = require('../models/Label')
const Note = require('../models/Label')
const User = require('../models/User')

// @desc Create a label
// @route POST /api/label
// @access Private
const createLabel = asyncHandler(async (req, res) => {
	const { text } = req.body

	if (text.trim() === '') {
		res.status(400)
        throw new Error('Either title or body is required')
	}

	try {
		const newLabel = await Label.create({
			owner: req.user._id,
			text: text
		})

		const user = await User.findById(req.user._id)
    	user.notes.push(newLabel._id)
    	await user.save()

	} catch(error) {
		res.status(500)
		throw new Error('Failed to create Label')
	}
})

// @desc Rename a label
// @route PUT /api/label/:id
// @access Private
const renameLabel = asyncHandler(async (req, res) => {
	const { text } = req.body
	const label = Label.findById(req.params.id)

	if (!label) {
		res.status(404)
		throw new Error('Label not found')
	}

	if (label.owner !== req.user._id) {
		res.status(403)
		throw new Error('Label is not yours')
	}

	try {
		label.text = text
		await label.save()

	} catch(error) {
		res.status(500)
		throw new Error('Failed to rename label')
	}

	res.status(200)
	res.json(label)
})

// @desc Delete a label
// @route DELETE /api/label/:id
// @access Private
const deleteLabel = asyncHandler(async (req, res) => {
	const label = Label.findById(req.params.id)

	if (!label) {
		res.status(404)
		throw new Error('Label not found')
	}

	if (label.owner !== req.user._id) {
		res.status(403)
		throw new Error('Label is not yours')
	}

	try {
		await label.remove()

	} catch(error) {
		res.status(500)
		throw new Error('Failed to delete label')
	}

	res.status(200)
	res.json({message: 'Label Removed'})
})