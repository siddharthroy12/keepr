const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String
	},
	body: {
		type: String
	},
	labels: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Label',
		required: true
	}],
	color: {
		type: String,
		default: 'none'
	},
	image: {
		type: String
	},
	pinned: {
		type: Boolean,
		default: false
	},
	trashed: {
		type: Boolean,
		default: false
	}
})

module.exports = Note = mongoose.model('Note', noteSchema)