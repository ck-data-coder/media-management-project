import { useContext } from "react";
import "./css/GetAllProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { SetUpdateProductContext } from "./App";

const GetAllProduct = (props) => {
  console.log(props)
  const Navigate=useNavigate();
  const updateProductContext=useContext(SetUpdateProductContext);
  function deleteProduct(id) {
    props.deleteprod(id);
  }
  function updateProduct(props){
    updateProductContext(props);
    Navigate('/addproduct');
  }
  return (
        <>
   < div  className = "product-container container" >
   <div className="producs-flex">
       <img className='delete' onClick={()=>deleteProduct(props.id)} src={require('./photos/delete.png')}></img>
       <img className='update' onClick={()=>updateProduct(props)} src={require('./photos/update.png')}></img>
       <Link to={`/product/${props.id}`}> <div onClick={window.scrollTo(0,0)}>
       {props.imageFile!=''? <video width="200" height="150" controls
          className="product-image">
         <source src={props.imageFile} type="video/mp4"/>
        </video>
      :null}
        <div className="product-data">
        
         {props.productTitle}|{props.description}
        
        </div>
        </div> </Link>
      </div >
      </div>
    </>

  );
};

export default GetAllProduct;
