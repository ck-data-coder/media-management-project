import React from 'react'
import './css/category.css'
import { Link } from 'react-router-dom';
const Category = (props) => {


  return (
   <>
  <Link to={`/getallproducts/${props.categoryTitle}`}> <div className='category-container'>
   <h2 className='category-display-title'>{props.categoryTitle}</h2>
   <img className='category-display-image' src={props.categoryImage}></img>
   </div>
   </Link>
   </>
  )
}

export default Category;