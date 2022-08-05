import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const router = Router();

router.post('/signin', loginUser)
router.post('/signup', createUser)

export default router;