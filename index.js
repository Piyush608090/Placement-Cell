import express from "express"
import path from "path";
import connectToMongoose from "./config/mongoose.js";
import  {router as userRouter}  from "./router/user.router.js"
import session from "express-session";
import { MemoryStore } from "express-session";
import {router as studentRouter} from "./router/student.router.js"
import {router as companyRouter} from "./router/company.router.js"
const server = express()
server.use(express.urlencoded({extended:true}))
server.set('view engine', 'ejs');
server.use(session({
    secret:"key",
    store: new MemoryStore({ checkPeriod: 86400 }),
    resave:false,
    saveUninitialized:true,
}))
server.set('views', path.join(path.resolve(), 'view'));
server.use("/",userRouter)
server.use("/student",studentRouter)
server.use("/company",companyRouter)
server.listen(4000,()=>{
console.log("Server is running on Port:4000")
connectToMongoose();
})
