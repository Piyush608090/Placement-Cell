import mongoose from "mongoose"
const connectToMongoose = async () =>{
     mongoose.connect("mongodb+srv://piyush608090:piyush1@piyush.d2bp0tc.mongodb.net/?retryWrites=true&w=majority&appName=Piyush/PlacementCell")
    //  mongoose.connect("mongodb://localhost:27017/PlcementCell")
    .then(() => console.log('Mongoose is connectecd'));
}
export default connectToMongoose;
