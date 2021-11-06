import { Router } from "express"
import multer from 'multer'

const router = Router()
const upload = multer()

import { loginController } from "./useCases/Login"
import { searchUsersController } from "./useCases/SearchUsers"
import { signupController } from "./useCases/Signup"

const FriendshipController = require('./Controllers/FriendshipController')

router.post('/signup', upload.single('file'), (req, res) => signupController.handle(req, res))
router.post('/login', (req, res) => loginController.handle(req, res))
router.get('/users/search', (req, res) => searchUsersController.handle(req, res))

// router.post('/friendship/request', FriendshipController.create)
// router.put('/friendship/accept/:id', FriendshipController.update)
// router.get('/friendship/friends/:userId', FriendshipController.getFriends)

export { router }