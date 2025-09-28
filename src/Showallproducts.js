import React, { useState,useEffect, useContext } from 'react'

import GetAllProduct from './GetAllProduct';
import Header from "./Header";
import './css/showallproducts.css'
import axios from 'axios';
import { productContext, searchContext, setProductContext } from './App';
import { Link, useParams } from 'react-router-dom';


const Showallproducts = () => {
  const categoryvalue=useParams()
  const [products,setProducts]=useState(null)
  const productcontext=useContext(productContext)
  const setproductcontext=useContext(setProductContext)
  const searchcontext=useContext(searchContext)
  const token = localStorage.getItem('token');
async function getData(){
await axios.post("http://localhost:8080/getallproducts",{category:categoryvalue.categoryTitle}, {
  headers: {
      'Authorization': `Bearer ${token}`,
  }

}).then((res)=>{
console.log("res",res.data)
setProducts(res.data)
setproductcontext(res.data)
}).catch((err)=>{
console.log(err)
})
}
  useEffect(()=>{
   getData()
   console.log(products)
  },[])

  useEffect(()=>{
    console.log(searchcontext)
    console.log("prod",productcontext)
    const selectedProducts=[];
  const strArray=searchcontext.split(' ')
  console.log(strArray)
  for (let i = 0; i < strArray.length; i++) {
    const filteredItems = productcontext?.filter(item =>
     ` ${item.productTitle.toLowerCase()} ${item.description.toLowerCase()}`.includes(strArray[i].toLowerCase())
    );
    console.log(filteredItems)
    let flag=1;
  for (let j = 0; j < selectedProducts.length; j++) {
 
    if(filteredItems){
      for(let k=0;k<filteredItems.length;k++){
      if(selectedProducts[j].id==filteredItems[k].id){
        flag=0;
      }
    }
    }
    
  }
  if(flag){
    selectedProducts.push(...filteredItems)
  }
    
  }
  console.log(selectedProducts)
    setProducts(selectedProducts)
  
  },[searchcontext])

console.log(products)

 async function deleteprod(id){
    await axios.delete("http://localhost:8080/deleteproduct", {
      data: { id: id, category:categoryvalue.categoryTitle }, // 'data' key for sending the request body in DELETE
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((res)=>{
    console.log(res.data)
    setProducts([...res.data])
    }).catch((err)=>{
    console.log(err)
    })
   }
 
  return (
   <>
  <Header></Header>
  <div className='first-container'>
   {
  
   products!=null && products.length>0?products.map((product) => (
    <GetAllProduct 
       id={product.id}
       productTitle={product.productTitle}
       description={product.description}
       imageFile={product.imageFile}
       category={product.category}
       deleteprod={deleteprod}
       ></GetAllProduct>
)):<div className='else-product-div'>
<h2 className='else-product-heading'>Nothing To Display</h2>
<Link to={'/addproduct'}><button className='else-product-button'>Add Video</button></Link>

</div>
}
      </div>
   </>
  )
}

export default Showallproducts