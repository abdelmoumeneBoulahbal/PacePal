import express from 'express'
const router = express.Router()
import { 
    
    createUser,
    logUser,
    getUserProfile,
    handleJoinRun,

 } from '../config/user/userController.js'

import { createAdmin, logAdmin } from '../config/admin/adminController.js'
import { createRunController, getAllUserRunsController, getRunsDetails, getCreatedRunsController, getRunParticipantsController, handleStatusUpdate, handleAllRuns } from '../config/organizer/runController.js'
import { getUserData } from '../config/user/getUserData.js'


router.post('/signup', createUser)
router.post('/login', logUser)

router.post('/signup/admin', createAdmin)
router.post('/login/admin', logAdmin)

router.post('/runs/createRun/:userId', createRunController)

router.get('/users/profile/:id', getUserProfile)
router.get('/users/profile/history/:userId', getAllUserRunsController)


router.post('/run/:runId/user/:userId', handleStatusUpdate)
router.post('/run/join', handleJoinRun)

router.get('/runs/runList', handleAllRuns)
router.get('/run/runDetails/:runId', getRunsDetails)
router.get('/run/runDetails/runParticipants/:runId', getRunParticipantsController)

router.get('/runs/runList/:userId', getCreatedRunsController)

export default router