import { loginUser } from "./login.js";
import { signup } from "./signup.js";


const createUser = async (req, res) => {
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

export {
    createUser,
    logUser
}