import {Employee} from "../schema/employee.schema.js"
import {Student} from "../schema/student.schema.js"
export const signIn = (req,res)=>{
    res.render("signin",{errorMessage:null})
}
export const signUp = (req,res) =>{
    res.render("signup",{errorMessage:null})
}
export const registerEmployee = async  (req,res)=>{
    try{        
        const {name,email,password} = req.body
        if(name.trim() == "" && email.trim() == "" && password.trim() == ""){
          return res.render("signup",{errorMessage:"Fields Must Be Required To Signup"})
        }else{
        const employee = await Employee.findOne({ email });               
            if(employee){
            return res.render("signup",{errorMessage:"Email already exist"})        
            }else{
                const newEmployee = await Employee.create({
                    name,
                    email,
                    password,
                });
                newEmployee.save(); 
                return res.render("signup",{errorMessage:"Register Succesfully"})
        }
    }
    }
    catch(err){
    console.log(err)
    }
}
export const dashboard = async (req,res) =>{
try{

const students = await Student.find({})
return res.render("dashboard",{students:students,name:req.session.name})
}catch(err){
console.log(err)
}
}
export const logoutUser = (req,res) =>{
    req.session.destroy();
    res.redirect('/'); 
  }