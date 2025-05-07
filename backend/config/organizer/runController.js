import { createRun } from "./createRun.js";

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
export { createRunController }