import express from 'express'
const router = express.Router()
import { 
    
    createUser,
    logUser,
    getUserProfile,

 } from '../config/user/userController.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'


router.post('/signup', createUser)
router.post('/login', logUser)
router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)
router.get('/users/profile/:id', getUserProfile)


export default router