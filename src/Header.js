import React, { useContext, useEffect } from 'react'
import './css/Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { searchContext, setSearchContext, UpdateProductContext } from './App'
const Header = () => {
  const searchcontext=useContext(searchContext)
  const setsearchcontext=useContext(setSearchContext)
  const updateProductcontext=useContext(UpdateProductContext);
const navigate=useNavigate()
useEffect(()=>{
setsearchcontext('')
},[])
  function logoutClick(e){
    e.preventDefault();
    localStorage.removeItem('token')
navigate("/")
  }

  function searchChange(e){
    setsearchcontext(e.target.value)
  //  console.log(searchcontext)
  }
  return (
    <>
    <header className='web-header'>
    <div className="header-container">
    <img className='header-logo' src={require('./photos/logo.png')}></img>
    <h1 className='logo-name'>Media Management</h1>
    <div className='nav-menu'>
    <Link to={'/home'}><h1 className='service'>Home</h1></Link>
    <Link to={'/addproduct'}>{(updateProductcontext==null)?<h1 className='service'>Add videos</h1>:<h1 className='service'>Update Product</h1>}</Link>
    <Link to={'/addcategory'}><h1 className='service'>Add Category</h1></Link>
    <Link to={'/library'}><h1 className='service'>Library</h1></Link>
    <Link to={'/stream'}><h1 className='service'>Stream</h1></Link>
  </div>
  <div class="container-fluid">
    <form class="search-form">
      <input
        type="search"
        class="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={searchChange}
        value={searchcontext}
      />
  
    <button onClick={logoutClick} className='logout-button'>Logout</button>
    </form>
  </div>
    
   </div>
    </header>
    </>
  )
}

export default Header