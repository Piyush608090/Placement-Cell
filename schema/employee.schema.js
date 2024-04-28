import mongoose from "mongoose";
export const employeeSchema = mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
    type:String,
    unique:true,
    required:true
    },
    password:{
        type: String,
        required: true,
        unique:true
    },
    },
    { timestamps: true },
) 
export const Employee = mongoose.model("Employee",employeeSchema)