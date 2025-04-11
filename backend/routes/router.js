import express from 'express'
const router = express.Router()
import { 
    
    createUser,
    logUser

 } from '../config/user/userController.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'


router.post('/signup', createUser)
router.post('/login', logUser)
router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)


export default router