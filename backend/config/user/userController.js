import { loginUser } from "./login.js";
import { signup } from "./signup.js";
import { getUserData } from "./getUserData.js";
import { joinRun } from "./joinRun.js";



const createUser = async (req, res) => {
  console.log(req.body)
    try {
        const newUser = await signup(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const logUser = async (req, res) => {
  try {
      const loggedUser = await loginUser(req.body);
      res.status(201).json(loggedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

const getUserProfile = async (req,res) => {
  const { id } = req.params;

  try{
    const user = await getUserData(id)

    if(!user){
      return res.status(404).json( {error: "User not found"} )
    }
    res.status(200).json(user)
  }catch(error){
    console.error('Controller error: ', error)
    res.status(500).json({ error: 'INternal server error' })
  }
}



const handleJoinRun = async (req, res) => {
  const { run_id, user_id } = req.body;
  
  try {

    if (!run_id || !user_id) {
      return res.status(400).json({ 
        success: false,
        error: 'Both run_id and user_id are required'
      });
    }
    
    // Execute the join operation
    const result = await joinRun(run_id, user_id);
    
    res.status(201).json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Error joining run:', error);
    
    const statusCode = error.message.includes('already joined') ? 409 : 500;
    
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
};

export {
    createUser,
    getUserProfile,
    logUser,
    handleJoinRun
}