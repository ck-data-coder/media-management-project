import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Header from './Header';
import './css/library.css'
import { searchContext } from './App';
import { useContext } from 'react';
const Library = () => {
    const token = localStorage.getItem('token');
    const searchcontext=useContext(searchContext)
  const [library,setLibrary]=useState()
  const [filterlibrary,setFilterLibrary]=useState({})
  async function getLibraryData(){
 await axios.get("http://localhost:8080/libraryvideos", {
      headers: {
          'Authorization': `Bearer ${token}`,
      }
    
    }).then((res)=>{
    console.log(res.data)
   setLibrary(res.data)
   setFilterLibrary(res.data)
    }).catch((err)=>{
    console.log(err)
    })
    }
useEffect(()=>{
getLibraryData();

},[])

useEffect(()=>{
    console.log(searchcontext)
  console.log(filterlibrary)
    const selectedProducts=[];
  const strArray=searchcontext.split(' ')
  console.log(strArray)
  for (let i = 0; i < strArray.length; i++) {
    const filteredItems = [filterlibrary!=null && filterlibrary.length>0?filterlibrary.filter(item =>
     ` ${item.productTitle.toLowerCase()} ${item.description.toLowerCase()}`.includes(strArray[i].toLowerCase())
    ):null];
    console.log("fill",filteredItems)
    let flag=1;
  for (let j = 0; j < selectedProducts.length; j++) {
 
    if(filteredItems ){
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
    setLibrary(selectedProducts[0])
  
  },[searchcontext])

  return (
    <> 
    <Header></Header>
    <div onClick={window.scrollTo(0,0)}>
     < div  className = "library-container" >
    {library!=null && library.length>0 ? library.map((video)=>{
return(
    <div className="library-video">    
       {video!=null? <Link to={`/product/${video.id}`}> <div onClick={window.scrollTo(0,0)}>
        {video.imageFile!=''? <video width="200" height="150" controls
           className="library-video-file">
          <source src={video.imageFile} type="video/mp4"/>
         </video>
       :null}
         <div className="library-video-data">
         
          {video.productTitle}|{video.description}
         
         </div>
         </div> </Link>:null}
         </div>
       )

     }):<div className='else-product-div'>
     <h2 className='else-product-heading'>Nothing To Display</h2>
     <Link to={'/addproduct'}><button className='else-product-button'>Add Video</button></Link>
     
     </div>
    }
     </div >
   
     </div >
   
     </>
 
  )
}

export default Library;