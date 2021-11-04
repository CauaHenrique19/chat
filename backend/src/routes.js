const express = require('express')
const router = express.Router()

const UsersControllers = require('./Controllers/UsersController')
const FriendshipController = require('./Controllers/FriendshipController')

router.post('/signup', UsersControllers.create)
router.post('/login', UsersControllers.login)
router.get('/users/search', UsersControllers.search)

router.post('/friendship/request', FriendshipController.create)
router.put('/friendship/accept/:id', FriendshipController.update)
router.get('/friendship/friends/:userId', FriendshipController.getFriends)

module.exports = router