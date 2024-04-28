import express from "express"
import { addStudent,createStudent,deleteStudent,downloadCsv} from "../controller/student.controller.js";
import {Auth} from "../config/Auth.js"
export const router = express.Router();
router.get("/addstudent",Auth,addStudent)
router.post("/createstudent",Auth,createStudent)
router.get("/delete/:id",Auth,deleteStudent)
router.get("/download",Auth,downloadCsv)