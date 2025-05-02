import { loginUser } from "./login.js";
import { signup } from "./signup.js";
import { getUserData } from "./getUserData.js";


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

export {
    createUser,
    getUserProfile,
    logUser
}