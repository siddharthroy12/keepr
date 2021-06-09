const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const generateToken = require('../utils/gernerateToken')

// @desc Register user & send token back
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, password, name } = req.body

	if (username.trim() === '' || name.trim() === '' || password.trim() === '') {
        res.status(400)
        throw new Error('Provide all fields')
    }

	const userExist = await User.findOne({ username })

	if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

	const user = await User.create({
        username,
        name,
		password
    })

	if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
			username: user.username,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Error in creating user')
    }

})

// @decs Login User
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
			username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid username or password')
    }
})

// @desc Get all users
// @route GET /api/user
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('username name notes labels trash disabled isAdmin')
    res.json(users)
})

// @desc Get User
// @route GET /api/user/:id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        res.send(user)
    }
})

// @desc Disable User
// @route DELETE /api/user/:id
// @access Private/Admin
const disableUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        await user.delete()
        res.json({message: 'User Disabled'})
    }
})

// @desc Disable all Users
// @route DELETE /api/user
// @access Private/Admin
const disableAllUsers = asyncHandler(async (req, res) => {
    let afterMath = await User.updateMany({ }, { disabled: true });
    res.json({message: `Disabled ${afterMath.nModified}`})
})

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    disableUser,
    disableAllUsers
}