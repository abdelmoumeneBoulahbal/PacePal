import { signup } from "../../controllers/auth/signup.js";


const createUser = async (req, res) => {
    try {
        const newUser = await signup(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export {
    createUser
}