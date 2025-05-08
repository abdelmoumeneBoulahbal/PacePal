import { createRun } from "./createRun.js";
import { getRunList } from "./getRunList.js";

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

const getRunController = async (req, res) => {
    const { userId } = req.params;

    try {
        const result = await getRunList(userId);
        
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

export { createRunController,
         getRunController,
       }