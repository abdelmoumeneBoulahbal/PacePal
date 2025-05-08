import express from 'express'
const router = express.Router()
import { 
    
    createUser,
    logUser,
    getUserProfile,

 } from '../config/user/userController.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'
import { createRunController, getRunController } from '../config/organizer/runController.js'


router.post('/signup', createUser)
router.post('/login', logUser)

router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)


router.get('/users/profile/:id', getUserProfile)


router.get('/runs/runList/:userId', getRunController)
router.post('/runs/createRun/:userId', createRunController)

export default router