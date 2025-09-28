import userModel from "./model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import productModel from "./model/product.js";
import otpgenerator from 'otp-generator'
import fs from 'fs'
import mime from 'mime-types'
import categoryModel from "./model/category.js";
import { Buffer } from "buffer";
import GraphPlotModel from "./model/graph.js";

dotenv.config()


const JWT_SECRET = process.env.JWT_SECRET;


const otpgen = (len) => {
  const otp = otpgenerator.generate(len,{
    specialChars:false
  });
  return otp;
};

const signup=async(req,res)=>{
     try{
        const {name,email,password}=req.body.signupData;
        const user=await userModel.findOne({email});
        if(user){
       
            return res.status(409).json({message:'user already exist',success:false})
        }
        const userData=new userModel(req.body.signupData)
        userData.password=await bcrypt.hash(password,10)
        

        await userData.save().then(()=>{
          
          res.status(201).json({message:'signup successfully',success:true})
        });
     }
      catch(err){
        res.status(500).json({message:'internal server error',success:false})
      }      
}

const login=async (req,res)=>{
  console.log(req.body)
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    const passwordCompare= await bcrypt.compare(req.body.password,user.password)
    console.log(passwordCompare)
    if (passwordCompare){
      const token = jwt.sign({ email: req.body.email,password:req.body.password }, JWT_SECRET);
      return res.status(200).send({ message: "user login successful", token:token });
    
    }
    else return res.status(401).send({ message: "password is incorrect" });
  }
  return res.status(400).send({ message: "user not found" });
}

const updateProduct=async(req,res)=>{
  let imgPath=null;
  console.log(req.body)
  if(req.file){
     imgPath=`./uploads/${req.file.originalname}`;
    }
 
 return await  productModel.updateOne(
    { email:req.user.email,'products.id':req.body.id}, // Query to find the document
    {
      $set:{
        'products.$':{...req.body,imageFile:imgPath?imgPath:''}
      }
    }


  ).then(async(result)=>{
 

    return await GraphPlotModel.findOneAndUpdate(
      {email:req.user.email},
      {
        $push:{
          'videosUpdateData':{date:Date.now()}
        }
      },
      
      {upsert:true,new:true,setDefaultsOnInsert:true}
    ).then((result)=>{
    return res.status(200).send({message:"update successful"})
    })
  }).catch((err)=>{
    console.log(err)
    return res.status(500).send({message:" error"})
  })



}

const addProduct=async (req,res)=>{
  let imgPath=null;
  console.log(req.body,req.file)
if(req.file){
 imgPath=`./uploads/${req.file.originalname}`;
}
const id=otpgen(10)
await productModel.findOneAndUpdate(
  {email:req.user.email},
  {
    $push:{
      'products':{...req.body,imageFile:imgPath?imgPath:'',id:id}
    }
  },
  
  {upsert:true,new:true,setDefaultsOnInsert:true}
).then(async(result)=>{
 
 return await GraphPlotModel.findOneAndUpdate(
    {email:req.user.email},
    {
      $push:{
        'videosAddData':{date:Date.now()}
      }
    },
    
    {upsert:true,new:true,setDefaultsOnInsert:true}
  ).then((result)=>{
  return res.status(200).send({message:"add successful"})
  })
}).catch((err)=>{
  console.log(err)
  return res.status(500).send({message:" error"})
})

}


async function dataFormat(products){ 
  console.log(products)
 try{
  let proddata=[]
  for (let i = 0; i < products.length; i++) {
  const product = products[i];

  if(product.imageFile!=''){
    const mimeType=mime.lookup(product.imageFile);
    const base64img= fs.readFileSync(product.imageFile,async (err,data)=>{
      if(err){
        console.log(err)
      }
   
   
    return data;
    })
    const strbase64= base64img.toString('base64');
   
    proddata.push({...product['_doc'],imageFile:`data:${mimeType};base64,${strbase64}`});
  }
  else{
    proddata.push({...product['_doc']});
  }
}
return proddata;
 }catch(err){
console.log(err)
 }
}

const getAllProducts=async(req,res)=>{
  console.log(req.body, req.user)
const userdata=await productModel.findOne({email:req.user.email})
console.log(userdata)
if(!userdata){
  return res.status(400).send({message:'nothing to send'})
}
let products=userdata.products.filter((product)=>product.category==req.body.category)
const data=await dataFormat(products);
// console.log(data)

return res.status(200).json(data)
}

const getProduct=async(req,res)=>{
  console.log("id"+JSON.stringify(req.body))
  const userdata=await productModel.findOne({email:req.user.email})
  if(!userdata){
    return res.status(200).send({message:'nothing to send'})
  }
  let products=userdata.products;
  const prod=products.find((product)=>product.id===(req.body.id));
  console.log(prod)
  const product=await dataFormat([prod])
 
  return res.status(200).json(product)
}


const deleteProduct=async (req,res)=>{

 return await productModel.updateOne(
    { email: req.user.email }, 
    { $pull: { products: { id: req.body.id } } } 
  ).then(async()=>{
    const userdata=await productModel.findOne({email:req.user.email})
    let products=userdata.products.filter((product)=>product.category==req.body.category);
    const data=await dataFormat(products);
    // console.log(data)

    return await GraphPlotModel.findOneAndUpdate(
      {email:req.user.email},
      {
        $push:{
          'videosDeleteData':{date:Date.now()}
        }
      },
      
      {upsert:true,new:true,setDefaultsOnInsert:true}
    ).then((result)=>{
    return res.status(200).json(data)
    })
  })
}

const addCategory=async (req,res)=>{
  const imgPath=`./uploadCategoryFiles/${req.file.originalname}`;
  await categoryModel.findOneAndUpdate(
    {email:req.user.email},
    {
      $push:{
        'categoryArray':{categoryName:req.body.categoryTitle,imageFile:imgPath}
      }
    },
    
    {upsert:true,new:true,setDefaultsOnInsert:true}
  ).then(async(result)=>{
  

    return await GraphPlotModel.findOneAndUpdate(
      {email:req.user.email},
      {
        $push:{
          'categoryAddData':{date:Date.now()}
        }
      },
      
      {upsert:true,new:true,setDefaultsOnInsert:true}
    ).then((result)=>{
    return res.status(200).send({message:"add category successful"})
    })
  }).catch((err)=>{
    console.log(err)
    return res.status(500).send({message:" error"})
  })
 }

 const getCategoriesNames=async(req,res)=>{

  const data=await categoryModel.findOne({email:req.user.email})
  const categoryarray=[]
  if(data){
await data.categoryArray.forEach(category => {
  categoryarray.push(category.categoryName)
  });
return res.status(200).json(categoryarray)
  }
  return res.status(400).send({message:"nothing to display"})
 }

 const getCategories=async(req,res)=>{
  const categorydata=await categoryModel.findOne({email:req.user.email})
  if(!categorydata){
    return res.status(400).send({message:'nothing to send'})
  }
  let categories=categorydata.categoryArray;
  const data=await dataFormat(categories);
  // console.log(data)
  return res.status(200).json(data)

 }

 const getLibraryVideos=async(req,res)=>{
  const userdata=await productModel.findOne({email:req.user.email})
//console.log(userdata)
if(!userdata){
  return res.status(400).send({message:'nothing to send'})
}
const data=await dataFormat(userdata.products);
// console.log(data)
return res.status(200).json(data)
 }


 const getGraphData=async(req,res)=>{

  const userdata=await GraphPlotModel.findOne({email:req.user.email})

  if(!userdata){
    return res.status(400).send({message:'nothing to send'})
  }
  // const data=await dataFormat(userdata.products);
  let data={
    videosAddData: { '1D': 0, '1W': 0, '1M': 0, '6M': 0 },
    videosUpdateData: { '1D': 0, '1W': 0, '1M': 0, '6M': 0 },
    videosDeleteData: { '1D': 0, '1W': 0, '1M': 0, '6M': 0 },
    categoryAddData: { '1D': 0, '1W': 0, '1M': 0, '6M': 0 }
  }

  for (const key in userdata) {
    if (key==='_id' || key==='email') {
    continue;  
    }

    if(key== "videosAddData" || key== "videosUpdateData" ||  key== "videosDeleteData" ||  key== "categoryAddData"){
 
      for(const element of userdata[key]){
      if(+element.date> Date.now()-86400000 ){
        data[key]['1D']= +data[key]['1D']+1;
        data[key]['1W']= +data[key]['1W']+1;
        data[key]['1M']= +data[key]['1M']+1;
        data[key]['6M']= +data[key]['6M']+1;
         

        continue;
      }
      if(+element.date> Date.now()-604800000 ){  
        data[key]['1W']=data[key]['1W']+1;
        data[key]['1M']=data[key]['1M']+1;
        data[key]['6M']=data[key]['6M']+1;
    
        continue;
      }
      if(+element.date> Date.now()-2592000000 ){  
        data[key]['1M']=data[key]['1M']+1;
        data[key]['6M']=data[key]['6M']+1;
        
        continue;
      }
      if(+element.date> Date.now()-15552000000 ){  
        data[key]['6M']=data[key]['6M']+1;
        
        continue;
      }
    }
   
  }
  }

  console.log("data: ",req.user)

 return res.status(200).json(data)

 }

export {signup,login,updateProduct,addProduct,getAllProducts,getProduct,deleteProduct,addCategory,getCategoriesNames,getCategories,getLibraryVideos,getGraphData}