import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import './css/login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
  const navigate= useNavigate();
  const loginInitialState={
    email:'',
    password:''
  }
  const [loginData, setLoginData] = useState(loginInitialState);
  function loginHandleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }


   async function loginClick(e){
      e.preventDefault();
      if (loginData.email === '' || loginData.password === '') {
        toast.error("Email and password are required", {
          position: 'top-center'
        });
        return;
      }
     await axios.post("http://localhost:8080/login",loginData)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast.success("Login successful!", {
          position: 'top-center'
        });
        navigate('/home');
      })
      .catch((err) => {
        try{ toast.error(err.response.data.message || "Login failed", {
          position: 'top-center'
        });}
        catch{}
       
      });
      console.log(loginData)
 
    }

  return (
    <>
   <div className=' container login-header'>
    <img className='login-logo' src={require('./photos/logo.png')}></img>
    <h1>media management</h1>
   </div>
  <section className="form-02-main">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="_lk_de">
              <div className="form-03-main">
                <div className="login-user-logo">
                  <img className="userpng" src={require("./photos/user.png")}/>
                </div>
                <div className="form-group">
                  <input type="email" onChange={loginHandleChange} value={loginData.email}  name="email" className="form-control _ge_de_ol" placeholder="Enter Email" required="" aria-required="true"/>
                </div>

                <div className="form-group">
                  <input type="password" onChange={loginHandleChange} value={loginData.password} name="password" className="form-control _ge_de_ol" placeholder="Enter Password" required="" aria-required="true"/>
                </div>

            

                <div className="form-group">
               <div className="_btn_04" onClick={loginClick}>
                    Login</div>
                  
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

export default Login