import { signupAdmin } from "./adminSignup.js";
import { loginAdmin } from "./adminLogin.js";


const createAdmin = async (req, res) => {
    try {
        const newAdmin = await signupAdmin(req.body);
        res.status(201).json(newAdmin);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

const logAdmin = async (req, res) => {
  try {
      const newAdmin = await loginAdmin(req.body);
      res.status(200).json(newAdmin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


export {
    createAdmin,
    logAdmin
}