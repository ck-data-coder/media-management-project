import mongoose from 'mongoose'
const schema=mongoose.Schema;
 
const categorySchema=new schema({
   email:{
    type:String,
    require:true
   },
   categoryArray:[
    {
        categoryName:{
            type:String
        },
        imageFile:{
            type:String
        }
    }
   ]
},
{
    versionKey:false
})
const categoryModel=mongoose.model('categories',categorySchema);
export default categoryModel;