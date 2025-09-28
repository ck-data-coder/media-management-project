import express from 'express'
const router=express.Router();

import { addCategory, addProduct, deleteProduct, getAllProducts, getCategories, getCategoriesNames, getProduct, login, signup, updateProduct,getLibraryVideos, getGraphData } from './controller.js';
import { authenticateToken, upload, uploadCategory } from './middleware.js';

router.post('/signup',signup);
router.post('/login',login)
router.patch('/updateproduct',authenticateToken,upload.single('imageFile'),updateProduct)
router.post('/addproduct',authenticateToken,upload.single('imageFile'),addProduct)
router.post('/getallproducts',authenticateToken,getAllProducts)
router.post('/getproduct',authenticateToken,getProduct)
router.delete('/deleteproduct',authenticateToken,deleteProduct)
router.post('/addcategory',authenticateToken,uploadCategory.single('categoryImage'),addCategory)
router.get('/getcategoriesnames',authenticateToken,getCategoriesNames)
router.get('/getcategories',authenticateToken,getCategories)
router.get('/libraryvideos',authenticateToken,getLibraryVideos)
router.get('/getgraphdata',authenticateToken,getGraphData)
export default router;
