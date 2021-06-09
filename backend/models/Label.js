const mongoose = require('mongoose')

const labelSchema = mongoose.Schema({
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	text: {
		type: String,
		required: true
	},
})

module.exports = Label = mongoose.model('Label', LabelSchema)