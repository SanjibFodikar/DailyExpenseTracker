import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate=useNavigate()
    const userId = localStorage.getItem('userId')
    const handleLogout = ()=>{
        localStorage.removeItem('userId')
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="#"><i className='bi bi-wallet me-2'></i>Expanse Tracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"><i className='bi bi-house-fill me-2'></i>Home</Link>
                            </li>
                            {!userId ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup"><i className="bi bi-person-plus-fill me-2 text-white"></i>Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard"><i className="bi bi-speedometer2 me-2"></i>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/addExpense"><i className="bi bi-plus me-2 text-white"></i>Add Expense</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/manageExpense"><i className="bi bi-gear me-2 text-white"></i>Manage Expense</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/expenseReport"><i className="bi bi-file-earmark-bar-graph me-2 text-white"></i>Expense Report</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/changePassword"><i className="bi bi-key me-2 text-white"></i>Change Password</Link>
                                    </li>
                                    <button className="btn btn-danger" onClick={handleLogout}>
                                        <span><i className="bi bi-box-arrow-right me-2 text-white"></i>Logout</span>
                                    </button>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
