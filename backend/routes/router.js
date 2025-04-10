import express from 'express'
const router = express.Router()
import { 
    
    createUser

 } from '../config/user/user.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'


router.post('/signup', createUser)
router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)


export default router