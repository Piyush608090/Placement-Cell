import express from "express"
import { Auth } from "../config/Auth.js";
import {addInterview,scheduleIntreview,company,updateStatus} from "../controller/company.controller.js"
export const router = express.Router();
router.get("/addinterview",Auth,addInterview)
router.post("/scheduleinterview",Auth,scheduleIntreview)
router.get("/companylist",Auth,company)
router.post("/updatestatus/:id",Auth,updateStatus)