const express = require('express')
const {
	registerUser,
    loginUser,
	authenticateUser,
    getUsers,
    getUser,
    disableUser,
	enableUser,
    disableAllUsers
} = require('../controllers/userControllers')
const { protect, admin } = require('../middlewares/authMiddlewares')
const router = express.Router()

router.route('/')
	.get(protect, admin, getUsers)
	.delete(protect, admin, disableAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/authenticate', protect, authenticateUser)
router.route('/:id')
	.get(protect, admin, getUser)
	.put(protect, admin, enableUser)
	.delete(protect, admin, disableUser)

module.exports =  router