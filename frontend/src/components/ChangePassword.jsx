import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New Password and Confirm Password Doesnot Match")
            return
        }
        try {
            let response = await fetch(`http://127.0.0.1:8000/api/changePassword/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email:formData.Email,
                    newPassword:formData.newPassword
                })
            })
            let data = await response.json()
            if (response.status === 200) {
                toast.success(data.message)
                setFormData({
                    'Email': "",
                    'newPassword': "",
                    'confirmPassword': ""
                })
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container mt-5">
                <div className="text-center">
                    <h2 className="bi bi-key"> Change Password</h2>
                    <p className="text-primary">Change Your Password</p>
                </div>

                <form action="" onSubmit={handleSubmit} className="p-4 border rounded shadow mx-auto" method="post" style={{ maxWidth: '600px' }}>
                    <div>
                        <label htmlFor="" className="form-label">Email : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="form-control" required placeholder="Enter Your Email" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">New Password : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock me-2"></i>
                            </span>
                            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="form-control" required placeholder="Enter Your New Password" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Confirm Password : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input type="text" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-control" required placeholder="Enter Confirm Password" />
                        </div>
                    </div>
                    <button className="mt-2 btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword
