
import mongoose from 'mongoose'
const schema=mongoose.Schema;
 
const productSchema=new schema({
   
    email:{
        type: String,
        require: true,
        unique: true
    },
    products:[{
        id:{
            type:String,
            reqire:true,
        
        },
        productTitle:{
            type:String,    
        },
        description:{
            type:String,   
        },
        imageFile:{
            type:String,   
        },
        category:{
            type:String
        }

    }]
},
{
    versionKey:false
})
const productModel=mongoose.model('userproducts',productSchema);
export default productModel;