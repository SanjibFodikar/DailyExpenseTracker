import { useEffect, useState } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [loginData,setLoginData]=useState({
    Email:"",
    Password:""
  })

  const changeValue = (e)=>{
      setLoginData({
        ...loginData,
        [e.target.name]:e.target.value
      })
  }

  const formSubmit =async (e)=>{
    e.preventDefault()
    try{
       const response = await fetch('http://127.0.0.1:8000/api/Login/',{
           method:"POST",
           headers:{
             "Content-Type": "application/json"
           },
           body:JSON.stringify(loginData)
       })
       const data = await response.json()
       if (response.status === 200) {
          toast.success(data.message)
          localStorage.setItem('userId',data.userId)
          localStorage.setItem('userName',data.userName)
          setTimeout(()=>{
              navigate('/dashboard')
          },2000)
       }else{
          toast.error(data.message)
       }
    }
    catch(error){
        console.log(error)
    }
  }

  return (
    <>
                <ToastContainer />
                <div className="container mt-5">
                    <div className="text-center">
                        <h2 className="bi bi-person-plus-fill"> Login</h2>
                        <p className="text-primary">Access your dashboard</p>
                    </div>
    
                    <form action="" className="p-4 border rounded shadow mx-auto" method="post" onSubmit={formSubmit} style={{ maxWidth: '600px' }}>
                        
                        <div className="mt-2">
                            <label htmlFor="" className="form-label">Email : </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input type="text" name="Email" value={loginData.Email} onChange={changeValue} className="form-control" required placeholder="Enter Your Email" />
                            </div>
                        </div>
    
                        <div className="mt-2">
                            <label htmlFor="" className="form-label">Password : </label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-key"></i>
                                </span>
                                <input type="password" name="Password" value={loginData.Password} onChange={changeValue} className="form-control" required placeholder="Enter Your Password" />
                            </div>
                        </div>
                        <button className="mt-2 btn btn-primary"><i className="bi bi-arrow-right"></i> Login</button>
                    </form>
                </div>
            </>
  )
}

export default Login
