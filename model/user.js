import mongoose from 'mongoose'
const schema=mongoose.Schema;
 
const userSchema=new schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
},
{
    versionKey:false
})
const userModel=mongoose.model('users',userSchema);
export default userModel;