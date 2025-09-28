import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Category from './Category'
import Header from './Header'
import './css/home.css'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import GraphPlot from './GraphPlot'
const Home = () => {
    const [categories,setCategories]=useState(null)
    const token=localStorage.getItem('token')
  async function getCategories () {
    await axios.get("http://localhost:8080/getcategories", {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
     
    }).then((res)=>{
        console.log(res.data)
       setCategories(res.data)
    }).catch((err)=>{
        console.log(err)
    }).catch((err)=>{})
  }

  useEffect(()=>{
  getCategories()
  },[])

  return (
  <>
  <Header></Header>

  <div className='home-top-view'>
    <h1 className='banner-heading'>Manage Media Conveniently Through Media Management Platform</h1>
  <img className='banner-image' src={require('./photos/bannerimg.jpg')}></img>
  </div>
  <div className='category-display'>
    <h2>PlayLists</h2>
  {
    categories?categories.map((category)=>(
      <Category
      categoryImage={category.imageFile}
      categoryTitle={category.categoryName}
      ></Category>
    )):<>
    <h4 className='else-category-heading'>Nothing To Display</h4>
   <Link to={'/addcategory'}> <button className='else-category-button'>Add Category</button></Link>
    </>
}
</div>
<div className=' analytics'>
<h2>Analytics</h2>

  
<GraphPlot></GraphPlot>

</div>
<div className='home-down-view'>
    <h1 className='home-down-view-heading'>Start managing today
        <h2>Make your media file maintainable</h2>
    </h1>
<img className='seller-desk-img' src='https://m.media-amazon.com/images/G/01/sp-marketing-toolkit/guides/design/illustration/Vignettes/Seller-Desk-01.svg'></img>

</div>
  <Footer></Footer>
  </>
  )
}

export default Home