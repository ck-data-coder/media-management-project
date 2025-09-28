import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import "./css/product.css";
import { useParams } from "react-router-dom";


import axios from "axios";

const Product = (props) => {
  const [proddata,setproddata]=useState(null);
  const idvalue=useParams()
  console.log(idvalue)
  async function getProduct(){
    const token = localStorage.getItem('token');
await axios.post("http://localhost:8080/getproduct",{id:idvalue.id}, {
  headers: {
      'Authorization': `Bearer ${token}`,
  }

}).then((res)=>{
console.log(res.data)
setproddata(res.data[0])
}).catch((err)=>{
console.log(err)
})
  }
 
useEffect(()=>{
 getProduct()
},[])
 
  return (
    <>
      <Header></Header>
    {proddata?
      <div class="container" onClick={window.scrollTo(0,0)}>
        <div class="row">
      
          <div class="col-sm">
          {proddata.imageFile!=''? <video controls
          className="product-detail-image">
             <source  src={proddata.imageFile}/>
        </video>
      :null}
          </div>

          <div className="col-sm container-info">
            <div className="title-features">
             {proddata.productTitle} 
            </div>
          
          
           
              <hr></hr>
              <div className="description-more-info">
                <h1 className="about-product">Description</h1>
                <span className="desc">
                 {proddata.description}
                </span>
              </div>
              </div>
              </div>
    </div>
           :null}
    </>
  );
};

export default Product;
