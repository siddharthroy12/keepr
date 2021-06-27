const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		require: true
	},
	notes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Note',
		required: true
	}],
	labels: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Label',
		required: true
	}],
	trash: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Note',
		required: true
	}],
	isAdmin: {
    type: Boolean,
    default: false
  },
	disabled: {
		type: Boolean,
		default: false,
	}
}, {
    timestamp: true
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    } else {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt) 
    }
})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = User = mongoose.model('User',userSchema)