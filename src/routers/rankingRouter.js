import { Router } from "express";
import { getUserUrls} from "../controllers/userControllers.js";
import validateUser from '../middlewares/validateusers.js';

const router = Router();

router.get('/users/me',validateUser, getUserUrls)

export default router;