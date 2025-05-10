import express from 'express'
const router = express.Router()
import { 
    
    createUser,
    logUser,
    getUserProfile,

 } from '../config/user/userController.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'
import { createRunController, getCreatedRunDetails, getCreatedRunsController, getRunParticipantsController } from '../config/organizer/runController.js'


router.post('/signup', createUser)
router.post('/login', logUser)

router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)


router.get('/users/profile/:id', getUserProfile)


router.get('/run/runDetails/:runId', getCreatedRunDetails)
router.get('/run/runDetails/runParticipants/:runId', getRunParticipantsController)
router.get('/runs/runList/:userId', getCreatedRunsController)
router.post('/runs/createRun/:userId', createRunController)

export default router