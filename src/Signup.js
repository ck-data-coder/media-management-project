import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
const Signup = () => {
  const signupInitialState={
    name:'',
    email:'',
    password:''
  }
 const passwordInitalState={
  password:'',
  repeatepassword:''
 }

 const navigate=useNavigate();
 const [signupData,setSignupData]=useState(signupInitialState);
 const [passwordData,setPasswordData]=useState(passwordInitalState);
 const [terms,setTerms]=useState(false);
 function signupHandleChange(e){
setSignupData({...signupData,[e.target.name]:e.target.value});
 
 }
 function passwordHandleChange(e){
  setPasswordData({...passwordData,[e.target.name]:e.target.value});
  
}
function termsClick(e){
  e.stopPropagation();
  setTerms(!terms);
  console.log(terms)
}
function callBoth(e){
 signupHandleChange(e);
 passwordHandleChange(e);
}
async function signupSumbit(e){
  e.preventDefault();
  if(signupData.email=='' || signupData.name=='' || signupData.password==''){
    toast.error("name,email and password is required")
    return;
   }
   else{
   
          let uppercase=1;
          let specialchar=1;
          let num=1;
 
        for (let i = 0; i < signupData.password.length; i++) {
         let asckey=signupData.password.charCodeAt(i)
           if(asckey>=65 && asckey<=90) uppercase=0;
           else if((asckey>=33 && asckey<=47) || (asckey>=58 && asckey<=64) || (asckey>=91 && asckey<=96) || (asckey>=123 && asckey<=126)) specialchar=0;
           else if(asckey>=48 && asckey<=57)num=0;
        }
 
          if(uppercase || specialchar || num){
           toast.error("password must contain uppercase ,special character and number")
           return;
          }
          if(signupData.password.length<=6){
           toast.error("password length should be greater than 6")
           return;
          }
          if(passwordData.password!==passwordData.repeatepassword){
           toast.error("password does not match");
           return;
         }
         if(!terms){
           toast.error('check terms and conditions')
           return;
         }
        }
  await  axios.post( "http://localhost:8080/signup",{signupData})
       .then(res=>{
        console.log(res.data);
        toast.success(res.data.message)
navigate('/')
       })
       .catch(err=>{
        console.error(err);
        toast.error(err.response.data.message)
       })
}
  return (
    <>
    <section class="vh-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: "25px"}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <h3 style={{marginLeft:"14%", fontSize:"20px"}}>Welcome to media management</h3>
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input type="text" onChange={signupHandleChange} name="name" id="validationDefault01"  class="form-control " required />
                      <label class="form-label" for="validationDefault01"><span style={{color:'red'}}>*</span>Your Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" name='email' onChange={signupHandleChange} value={signupData.email} pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/" class="form-control"/>
                      <label class="form-label" for="form3Example3c"><span style={{color:'red'}}>*</span>Your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" name='password'  onChange={callBoth} class="form-control" />
                      <label class="form-label" for="form3Example4c"><span style={{color:'red'}}>*</span>Password</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cd" name='repeatepassword' onChange={passwordHandleChange} class="form-control" />
                      <label class="form-label" for="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                    <input onClick={termsClick}   class="" type="checkbox" value="" id="form2Example3" style={{ position: 'relative',
    top: '-2px'}} />
                    <label class="" htmlFor="form2Example3">
                      I agree all statements in <Link to='/'>Terms of service</Link>
                    </label>
                  </div>
                 
                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                   <button onClick={signupSumbit} type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                 </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src={require('./photos/signup.webp')}
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Signup