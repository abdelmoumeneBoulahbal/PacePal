import express from 'express'
const router = express.Router()
import { 
    
    createUser

 } from '../config/user/user.js'


router.post('/signup', createUser)


export default router