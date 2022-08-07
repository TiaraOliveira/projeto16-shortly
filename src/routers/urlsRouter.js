import { Router } from "express";
import {deleteUrl, shorten, getShortenbyId, redirect} from "../controllers/urlsControllers.js";
import validateUser from '../middlewares/validateusers.js';

const router = Router();

router.post('/urls/shorten',validateUser, shorten)
router.get('/urls/:id', getShortenbyId)
router.get('/urls/open/:shortUrl', redirect)
router.delete('/urls/:id', validateUser, deleteUrl)

export default router;