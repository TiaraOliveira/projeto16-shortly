import { Router } from "express";
import {deleteUrl, shorten, getShortenbyId, redirect} from "../controllers/urlsControllers.js";

const router = Router();


router.post('/urls/shorten', shorten)
router.get('/urls/:id', getShortenbyId)
router.get('/urls/open/:shortUrl', redirect)
router.delete('/urls/:id', deleteUrl)


export default router;