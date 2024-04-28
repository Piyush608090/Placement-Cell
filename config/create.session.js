import { Employee } from "../schema/employee.schema.js"

export const createSession = async (req,res) =>{
const {email,password} = req.body
     req.session.email = email
     const user = await Employee.findOne({email:email})
     req.session.name = user.name
     if(!user){
         return res.render("signin",{errorMessage:"User not found"})
      } 
      if(user.password!=password){
          return res.render("signin",{errorMessage:"Password is incorrect"})
       } else{
          return res.redirect("/Dashboard")
       }   
}