import { useEffect, useState } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FullName: "",
        Email: "",
        Password: ""
    })

    const handleClick = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.status === 201) {
                toast.success('Signup Successful ! Please login')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                const data = await response.json()
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error("Something Went Wrong , try again")
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container mt-5">
                <div className="text-center">
                    <h2 className="bi bi-person-plus-fill"> Signup</h2>
                    <p className="text-primary">Create Your Account to start expenses</p>
                </div>

                <form action="" className="p-4 border rounded shadow mx-auto" method="post" onSubmit={formSubmit} style={{ maxWidth: '600px' }}>
                    <div>
                        <label htmlFor="" className="form-label">Full Name : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input type="text" name="FullName" value={formData.FullName} onChange={handleClick} className="form-control" required placeholder="Enter Your full name" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Email : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input type="text" name="Email" value={formData.Email} onChange={handleClick} className="form-control" required placeholder="Enter Your Email" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Password : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-key"></i>
                            </span>
                            <input type="password" name="Password" value={formData.Password} onChange={handleClick} className="form-control" required placeholder="Enter Your Password" />
                        </div>
                    </div>
                    <button className="mt-2 btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
export default Signup