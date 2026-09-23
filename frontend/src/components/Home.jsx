import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const userId = localStorage.getItem('userId')
  return (
    <>
    <div className='text-center mt-5'>
      <h1>Welcome to <span className='text-primary'>Daily Expense Tracker</span></h1>
      <p>Manage Your Task Efficiently and Effectively</p>

      <div className="options mt-3">
        {userId ? (
          <>
            <Link to="/dashboard" className="btn btn-warning"><span><i className="bi bi-speedometer2 me-2"></i>Go To Dashboard</span></Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn btn-success mx-2"><span><i className="bi bi-person-plus-fill me-2"></i>Signup</span></Link>
            <Link to="/login" className="btn btn-primary"><span><i className="bi bi-arrow-right me-2"></i>Login</span></Link>
          </>
        ) }
        
      </div>

    </div>
    </>
  )
}

export default Home
