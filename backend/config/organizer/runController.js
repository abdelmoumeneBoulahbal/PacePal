import { getRunDetails } from "../runDetails/getRunDetails.js";
import { createRun } from "./createRun.js";
import { getCreatedRunsList } from "./getRunList.js";
import { getRunParticipants } from "../runDetails/getRunParticipants.js";
import { getUserRuns } from "../runDetails/getUserRuns.js";
import { updateStatus } from "./updateStatus.js";

const createRunController = async(req, res) => {
    const {userId} = req.params
    const runData = req.body

    try {
        const newRun = await createRun(userId, runData);
        res.status(201).json({ newRun });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCreatedRunsController = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await getCreatedRunsList(userId);
        
        if (!result.success) {
            return res.status(400).json({ 
                error: result.error,
                ...(result.details && { details: result.details })
            });
        }

        res.status(200).json({
            success: true,
            runs: result.runs
        });

    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { 
                details: error.message 
            })
        });
    }
};

const getRunsDetails = async (req, res) => {
    const { runId } = req.params;

    try {
        const result = await getRunDetails(runId);
        
        if (!result.success) {
            return res.status(400).json({ 
                error: result.error,
                ...(result.details && { details: result.details })
            });
        }

        res.status(200).json(result);

    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            ...(process.env.NODE_ENV === 'development' && { 
                details: error.message 
            })
        });
    }
};

const getRunParticipantsController = async (req, res) => {
  const { runId } = req.params;

  try {
    const result = await getRunParticipants(runId);

    if (!result.success) {
      return res.status(result.statusCode || 500).json({
        success: false,
        error: result.error
      });
    }

    res.status(200).json({
      success: true,
      count: result.participants.length,
      participants: result.participants
    });

  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { 
        details: error.message 
      })
    });
  }
};

const getAllUserRunsController = async (req, res) => {
    
    const { userId } = req.params

    try{

        const result = await getUserRuns(userId)

        if(!result.success){
            return res.status(result.statusCode || 500).json({
                success: false,
                error: result.error
            })
        }

        res.status(200).json({
            success: true, 
            count : result.runs.length,
            runs : result.runs
        })


    }catch(error){
        console.error('Controller error:', error);
        res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { 
            details: error.message 
        })
        });
    }
}

const handleStatusUpdate = async (req, res)=> {
    try{
        const { userId, runId } = req.params
        const { status } = req.body

        if (!['accepted', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const result = await updateStatus(userId, runId, status);

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.json({
            message: 'Status updated successfully',
            participant: result.participant
        });
    } catch (err) {
        console.error('Status update error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { createRunController,
         getCreatedRunsController,
         getRunsDetails,
         getRunParticipantsController,
         getAllUserRunsController,

         handleStatusUpdate
        }