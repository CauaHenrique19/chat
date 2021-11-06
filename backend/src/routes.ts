import { Router } from "express"

const router = Router()

import { loginController } from "./useCases/Login"

const UsersControllers = require('./Controllers/UsersController')
const FriendshipController = require('./Controllers/FriendshipController')

// router.post('/signup', UsersControllers.create)
router.post('/login', (req, res) => loginController.handle(req, res))
// router.get('/users/search', UsersControllers.search)

// router.post('/friendship/request', FriendshipController.create)
// router.put('/friendship/accept/:id', FriendshipController.update)
// router.get('/friendship/friends/:userId', FriendshipController.getFriends)

export { router }