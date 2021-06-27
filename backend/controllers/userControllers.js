const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

// @desc Register user & send token back
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	if (username.trim() === '' || password.trim() === '') {
        res.status(400)
        throw new Error('Provide all fields')
    }

    if (username < 1 || username > 20) {
        res.status(400)
        throw new Error('Username must be 1-20 characters')
    } else if (/\W/.test(username)) {
        res.status(400)
        throw new Error('Username can only have numbers and letters')
    }

    if (password < 4) {
        res.status(400)
        throw new Error('Password is too short')
    } else if (/\W/.test(username)) {
        res.status(400)
        throw new Error('Password can only have numbers and letters')
    }

	const userExist = await User.findOne({ username })

	if (userExist) {
        res.status(400)
        throw new Error('User already exist')
    }

    try {
        const user = await User.create({
            username: username.trim(),
            password
        })

        res.status(201).json({
            _id: user._id,
			username: user.username,
            token: generateToken(user._id),
        })

    } catch(error) {
        res.status(500)
        throw new Error('Error in creating user')
    }
})

// @decs Login User
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
        res.status(400)
        throw new Error('Username not found')
    }

    if (user.disabled) {
        res.status(401)
        throw new Error('Account with that username is disabled')
    }
    
    if ((await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
			username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid password')
    }
})

// @decs Authenticate User
// @route GET /api/user/authenticate
// @access Public
const authenticateUser = asyncHandler(async (req, res) => {
    res.status(200)
    res.json(req.user)
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
        user.disabled = true
        await user.save()
        res.json({message: 'User Disabled'})
    }
})

// @desc Enable User
// @route PUT /api/user/:id
// @access Private/Admin
const enableUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    } else {
        user.disabled = false
        await user.save()
        res.json({message: 'User Enabled'})
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
    authenticateUser,
    getUsers,
    getUser,
    disableUser,
    enableUser,
    disableAllUsers
}