import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate()
  const userName = localStorage.getItem('userName')
  const userId=localStorage.getItem('userId')
    useEffect(()=>{
       if (!userId) {
          navigate('/login')
       }
    },[])
  return (
    <div>
      <div className="container text-center mt-4">
         <h2>Welcome, <span className='text-primary'>{userName}</span></h2>
         <p>Her's Your Expense Overview</p>
      </div>
    </div>
  )
}

export default Dashboard
