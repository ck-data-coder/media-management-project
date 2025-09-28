import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Landpage = () => {
  const navigate=useNavigate()
  useEffect(()=>{
 const token=localStorage.getItem("token")
 if(token){
  navigate("/home")
 }
  },[])
  return (
    <>
      <div className="container container-header">
    <img className='logo' src={require('./photos/logo.png')}></img>
    <h1>media management</h1>
   <Link to={'/signup'}> <button className='btn btn-primary login-signup'>SIGN UP</button></Link>
   <Link to={'/login'}><button className='btn btn-primary login-signup'>LOGIN</button></Link>
   </div>
<div className=" text-center more-info container">
  <div className="row">
    <div className="col col-data">
      <h1>Upload, Store And Manage Videos Media <br/> Seamlessly</h1>
    </div>
    <div className="col col-img">
      <img className='ecommerce-pht' src={require('./photos/ecommerce.jpeg')}></img>
    </div>
  </div>
</div>
 <div className='why-sales-panel'>
  <h1>Why creater choose media management?</h1>
 
 <div class="container container1 text-center">
  <div class="row">
    <div class="col">
      <img className="why-sales-panel-photos" src={require('./photos/customer_growth.png')}></img>
      <h3><b>Crores of creaters</b></h3>
      <p> crores of creaters use Media management platform to manage and maintain integrity of media files</p>
    </div>
    <div class="col">
    <img  className="why-sales-panel-photos" src={require('./photos/business_growth.png')}></img>
    <h3><b>5.1K+</b></h3>
    <p>5.1K+ creaters became influncers in 2022. You could be next.</p>
    </div>
    <div class="col">
    <img  className="why-sales-panel-photos" src={require('./photos/shipping.png')}></img>
    <h3><b>Unbeatable speed</b></h3>
    <p>Deliver media files with non stop streaming speed.</p>
    </div>
  </div>
</div>
<div class="container container2 text-center">
  <div class="row">
    <div class="col">
    <img  className="why-sales-panel-photos" src={require('./photos/paid_service_rupee.png')}></img>
    <h3><b>Free platform</b></h3>
    <p>media management platform is offering sevice totally free of cost.</p>
    </div>
    <div class="col">
    <img  className="why-sales-panel-photos" src={require('./photos/home_services.png')}></img>
    <h3><b>Ease of starting</b></h3>
    <p>From registering to adding and managing media files , media management platform makes it so simple </p>
    </div>
    <div class="col">
    <img  className="why-sales-panel-photos" src={require('./photos/global_delivery.png')}></img>
    <h3><b>worldwide access</b></h3>
    <p>worldwide access for media management platform.</p>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default Landpage