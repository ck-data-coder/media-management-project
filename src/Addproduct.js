import React, { useContext, useEffect, useRef, useState } from 'react'
import './css/Addproduct.css'
import Header from './Header'


import { UpdateProductContext,SetUpdateProductContext } from './App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Addproduct = () => {
 const [category,setCategory]=useState(null)
  const Navigate=useNavigate();
  const token = localStorage.getItem('token');


  const productInitialState={
  
    productTitle:'',
    description:'',
    imageFile:'',
    category:''
  }
 
  const [product,setProduct]=useState(productInitialState);
  const updateProductContext=useContext(UpdateProductContext)
  const setUpdateProductContext=useContext(SetUpdateProductContext)

  async function getCategories() {
    await axios.get("http://localhost:8080/getcategoriesnames", {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
   
  }).then((res)=>{
    setCategory(res.data)
    console.log(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
  }

useEffect(()=>{
 window.scrollTo(0,0)
  if(updateProductContext!=null){
    console.log(updateProductContext)
   setProduct({...updateProductContext,imageFile:''})
  }
  getCategories();
 
},[])
 
  
   function productOnChange(e){
    console.log(product)
    if(e.target.name=="imageFile"){
      setProduct({...product,[e.target.name]:e.target.files[0]})
      console.log(e.target.files[0])
      return;
    }
  
    
    else {

      setProduct({...product,[e.target.name]:e.target.value});
    }

    console.log(product)
   }

   async function productOnSubmit(e){
    e.preventDefault();

    if(product.productTitle=='' || product.imageFile=='' || product.category=='' || product.category=='--Select--'){
      toast.error("title,category and media file is required")
      return;
    }
    const formData = new FormData();
    formData.append("productTitle", product.productTitle);
    formData.append("description", product.description);
    formData.append("imageFile", product.imageFile);
    formData.append('category',product.category)
  

    console.log(product);

    if(updateProductContext!=null){
      formData.append('id',product.id)
   await axios.patch("http://localhost:8080/updateproduct",formData, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
 
}).then((res)=>{
    toast.success(res.data.message)
    setUpdateProductContext(null);
    Navigate('/home')
   })
   .catch((err)=>{
console.log(err)
   })
    
    }
   else {
    await axios.post("http://localhost:8080/addproduct",formData, {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
   
  }).then((res)=>{
      toast.success(res.data.message)
      setUpdateProductContext(null);
      Navigate('/home')
     })
     .catch((err)=>{
  console.log(err)
     })
   }
 
    setProduct(productInitialState);
   }
  return (
    <>
    <Header></Header>
   
    
    <form  enctype="multipart/form-data" className='container addproduct-form' >
        <label htmlFor='productTitle' className='adjustposition'>Video Title: </label>
       <input type='text' onChange={productOnChange} value={product.productTitle} id='productTitle' name='productTitle' required></input>
     
       <label htmlFor='description' className='desc adjustposition'>Description:</label>
        <textarea id='description' onChange={productOnChange} value={product.description} name='description' ></textarea>
       
        <lable htmlFor='category' className='checkbox-radio'>Select Category:</lable>
        <select
            onChange={productOnChange}
            type="text"
            className='checkbox-radio'
            value={product.category}
            name="category"
            id="category"
            placeholder="category"
            required
          >
               <option value={null}>--Select--</option>
            {category
              ?
               category.map((e) => {
                  return <option value={e}>{e}</option>;
                })
              : null}
          </select>
          <lable htmlFor='file' className='img'>Upload Video:</lable>
          <input id='file' type='file' onChange={productOnChange} name='imageFile'></input>

        <button onClick={productOnSubmit} className='submit-button'>submit</button>
    </form>
   <img className='form-image'src={require('./photos/form-builders-11.webp')}></img>
   
    </>
  )
}

export default Addproduct