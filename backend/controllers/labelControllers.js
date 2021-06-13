const asyncHandler = require('express-async-handler')
const Label = require('../models/Label')
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
			text: text.trim()
		})

		const user = await User.findById(req.user._id)
    	user.labels.push(newLabel._id)
    	await user.save()
		res.status(200)
		res.json({ message: 'Label Created'})

	} catch(error) {
		res.status(500)
		throw new Error('Failed to create Label')
	}
})

// @desc Get a label
// @route GET /api/label/:id
// @access Private
const getLabel = asyncHandler(async (req, res) => {
	const label = await Lable.findById(req.params.id)

	if (!label) {
		res.status(404)
		throw new Error('Label not found')
	}

	if (label.owner.toString() !== req.user.id.toString()) {
		res.status(403)
		throw new Error("You don't have access to this note")
	}

	res.status(200)
	res.json(label)
})

// @desc Rename a label
// @route PUT /api/label/:id
// @access Private
const renameLabel = asyncHandler(async (req, res) => {
	const { text } = req.body

	if (text.trim() === '') {
		res.status(400)
		throw new Error("Name Can't be empty")
	}
	const label = await Label.findById(req.params.id)

	if (!label) {
		res.status(404)
		throw new Error('Label not found')
	}

	if (label.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error('Label is not yours')
	}

	try {
		label.text = text.trim()
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
	let label = await Label.findById(req.params.id)

	if (!label) {
		res.status(404)
		throw new Error('Label not found')
	}

	if (label.owner.toString() !== req.user._id.toString()) {
		res.status(403)
		throw new Error('Label is not yours')
	}

	try {
		const user = await User.findById(req.user._id)
    	user.labels = user.labels.filter(userLabel => userLabel.toString() !== label._id.toString())
    	await user.save()
		await label.remove()

	} catch(error) {
		res.status(500)
		throw new Error(error)
	}

	res.status(200)
	res.json({message: 'Label Removed'})
})

module.exports = {
	createLabel,
	getLabel,
	renameLabel,
	deleteLabel
}