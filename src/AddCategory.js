import React, { useState } from 'react'
import Header from './Header'
import './css/Addcategory.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AddCategory = () => {
const [category,setCategory]=useState(null)
const navigate=useNavigate()
function onCategoryChange(e){
if(e.target.name=='categoryImage'){
    setCategory({...category,[e.target.name]:e.target.files[0]})
    return;
}
setCategory({...category,[e.target.name]:e.target.value})
}

async function onCategorySubmit(e){
    e.preventDefault();
    const formData = new FormData();
    const token=localStorage.getItem("token")
    formData.append("categoryTitle", category.categoryTitle);
    formData.append("categoryImage", category.categoryImage);
    await axios.post("http://localhost:8080/addcategory",formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
     
    }).then(()=>{
     navigate('/home')
    })
}

  return (
  <>
  <Header></Header>
<form className='category-form'>
     <input name='categoryTitle' type='text' placeholder='Category Title' onChange={onCategoryChange} className='category-title'></input>
     <input name='categoryImage' type='file' placeholder='Category  Image'  onChange={onCategoryChange} className='category-image'></input>
     <button className='category-submit' onClick={onCategorySubmit}>Submit</button>
</form>

  </>
  )
}

export default AddCategory