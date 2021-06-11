const express = require('express')
const {
	registerUser,
    loginUser,
    getUsers,
    getUser,
    disableUser,
    disableAllUsers
} = require('../controllers/userControllers')
const { protect, admin } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.route('/')
	.get(protect, admin, getUsers)
	.delete(protect, admin, disableAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.route('/:id')
	.get(protect, admin, getUser)
	.delete(protect, admin, disableUser)

module.exports =  router