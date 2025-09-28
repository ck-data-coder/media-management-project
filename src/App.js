import { useState } from 'react';
import Footer from './Footer';
import Landpage from './Landpage';
import Login from './Login';
import Signup from './Signup';
import './css/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './Header';
import Addproduct from './Addproduct';
import Product from './Product';
import Showallproducts from './Showallproducts';
import { createContext } from 'react'
import AddCategory from './AddCategory';
import Home from './Home';
import Library from './Library';
import Stream from './Stream';



const UpdateProductContext=createContext(null);
const SetUpdateProductContext=createContext(null);
const searchContext=createContext(null)
const setSearchContext=createContext(null)
const productContext=createContext([])
const setProductContext=createContext(null)
function App() {
  const [search,setSearch]=useState('')
  const [updateProductcontext,setUpdateProductContext]=useState(null);
  const [products,setProducts]=useState([])
  return (
   <>
<productContext.Provider value={products}>
  <setProductContext.Provider value={setProducts}>
<searchContext.Provider value={search}>
  <setSearchContext.Provider value={setSearch}>
   <UpdateProductContext.Provider value={updateProductcontext}>
   <SetUpdateProductContext.Provider value={setUpdateProductContext}>
   <Router>
   <Routes>
    <Route exact path='/' element={<><Landpage></Landpage><Footer></Footer></>}></Route>
    <Route exact path='/login' element={<Login></Login>}></Route>
    <Route exact path='/signup' element={<Signup></Signup>}></Route>
    <Route exact path='/getallproducts' element={<Showallproducts></Showallproducts>}>
    <Route path=':categoryTitle' element={Showallproducts}></Route>
    </Route>
    <Route exact path='/header' element={<Header></Header>}></Route>
    <Route exact path='/addproduct' element={<Addproduct></Addproduct>}></Route>
    <Route exact path='/product' element={<Product></Product>}>
     <Route path=':id' element={Product}></Route>
    </Route>
    <Route exact path='/addcategory' element={<AddCategory></AddCategory>}></Route>
    <Route exact path='/home' element={<Home></Home>}></Route>
    <Route exact path='/library' element={<Library></Library>}></Route>
    <Route exact path='/stream' element={<Stream></Stream>}></Route>
   </Routes>
    </Router>
    </SetUpdateProductContext.Provider >
    </UpdateProductContext.Provider >
    </setSearchContext.Provider>
    </searchContext.Provider>
    </setProductContext.Provider>
    </productContext.Provider>
 </>
  );
}

export {App,productContext,setProductContext,searchContext,setSearchContext,UpdateProductContext,SetUpdateProductContext};
