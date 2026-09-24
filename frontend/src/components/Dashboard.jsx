import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem('userName')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
    }
    fetchExpense(userId)
  }, [])

  const [expenses, setExpenses] = useState([])

  const fetchExpense = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/manageExpense/${userId}/`)
      const data = await response.json()
      setExpenses(data)
      calculateTotals(data)
    }
    catch (error) {
      console.error("Error Fetching EXpenses")
    }
  }

  const [todayTotal,settodayTotal]=useState(0)
  const [yesterdayTotal,setyesterdayTotal]=useState(0)
  const [last7DaysTotal,setlast7DaysTotal]=useState(0)
  const [last30DaysTotal,setlast30DaysTotal]=useState(0)
  const [currentYearTotal,setcurrentYearTotal]=useState(0)
  const [grandTotal,setgrandTotal]=useState(0)

  const calculateTotals =(data)=> {
      const today=new Date();

      const yesterday=new Date();
      yesterday.setDate(today.getDate()-1)

      const last7Days=new Date();
      last7Days.setDate(today.getDate()-7)

      const last30Days=new Date();
      last30Days.setDate(today.getDate()-30)

      const currentYear = today.getFullYear()

      let todayTotal=0,totalAmount=0,yesterdayTotal=0,last7dayTotal=0,last30dayTotal=0,yearTotal=0

      data.forEach(item => {
          const expensedate=new Date(item.ExpenceDate)
          totalAmount+=parseFloat(item.ExpenseCost) || 0;
          if (expensedate.toDateString() === today.toDateString()) {
             todayTotal+=parseFloat(item.ExpenseCost)
          }

          if (expensedate.toDateString() === yesterday.toDateString()) {
             yesterdayTotal+=parseFloat(item.ExpenseCost) || 0
          }

          if (expensedate>=last7Days) {
             last7dayTotal+=parseFloat(item.ExpenseCost) || 0
          }

          if (expensedate>=last30Days) {
             last30dayTotal+=parseFloat(item.ExpenseCost) || 0
          }

          if (expensedate.getFullYear() === currentYear) {
            yearTotal+=parseFloat(item.ExpenseCost) || 0
          }

      });

      settodayTotal(todayTotal)
      setyesterdayTotal(yesterdayTotal)
      setlast7DaysTotal(last7dayTotal)
      setlast30DaysTotal(last30dayTotal)
      setcurrentYearTotal(yearTotal)
      setgrandTotal(totalAmount)
  }

  return (
    <div>
      <div className="container text-center mt-4">
        <h2>Welcome, <span className='text-primary'>{userName}</span></h2>
        <p>Her's Your Expense Overview</p>
        <div className="row mt-4 gy-3">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-primary' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Today's Expense</h5>
                  <div className="card-text text-white fs-4">₹ {todayTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-success' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Yesterday's Expense</h5>
                  <div className="card-text text-white fs-4">₹ {yesterdayTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-warning' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Last 7 Days Expense</h5>
                  <div className="card-text text-white fs-4">₹ {last7DaysTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-success' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Last 30 Days Expense</h5>
                  <div className="card-text text-white fs-4">₹ {last30DaysTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-danger' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Current Year Expense</h5>
                  <div className="card-text text-white fs-4">₹ {currentYearTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className='card bg-secondary' style={{ height: '150px' }}>
              <div className="card-body">
                <div className="card-title">
                  <h5 className='text-white'><i className='bi bi-calendar'></i> Grand Total</h5>
                  <div className="card-text text-white fs-4">₹ {grandTotal}</div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Dashboard
