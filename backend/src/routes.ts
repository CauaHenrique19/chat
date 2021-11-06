import { Router } from "express"
import multer from 'multer'

const router = Router()
const upload = multer()

import { loginController } from "./useCases/Login"
import { searchUsersController } from "./useCases/SearchUsers"
import { signupController } from "./useCases/Signup"
import { acceptFriendshipController } from "./useCases/AcceptFriendship"
import { createFriendshipController } from "./useCases/CreateFriendship"
import { getFriendsController } from "./useCases/GetFriends"

router.post('/signup', upload.single('file'), (req, res) => signupController.handle(req, res))
router.post('/login', (req, res) => loginController.handle(req, res))
router.get('/users/search', (req, res) => searchUsersController.handle(req, res))

router.post('/friendship', (req, res) => createFriendshipController.handle(req, res))
router.put('/friendship', (req, res) => acceptFriendshipController.handle(req, res))
router.get('/friendship/friends/:userId', (req, res) => getFriendsController.handle(req, res))

export { router }