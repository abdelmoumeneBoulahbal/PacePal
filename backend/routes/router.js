import express from 'express'
const router = express.Router()
import{
    createUser
} from '../controllers/auth.js'


router.post("/signup", createUser)

export default router