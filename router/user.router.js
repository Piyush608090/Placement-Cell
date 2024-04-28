import express from "express"
import { createSession } from "../config/create.session.js";

import { signIn,signUp,registerEmployee,dashboard,logoutUser } from "../controller/user.controller.js";
export const router = express.Router();
router.get("/",signIn)
router.get("/signup",signUp)
router.post("/signup",registerEmployee)
router.post("/createsession",createSession)
router.get("/Dashboard",dashboard)
router.get("/logout",logoutUser)
