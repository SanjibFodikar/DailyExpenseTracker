import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ExpenseReport() {
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
    }, [])

    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
    const [expenses,setExpenses]=useState([])
    const [grandTotal,setgrandTotal]=useState(0)

    const handleSubmit =async (e)=>{
       e.preventDefault();
       try{
           let response = await fetch(`http://127.0.0.1:8000/api/searchExpense/${userId}/?from=${startDate}&to=${endDate}`)
           let data = await response.json()
           setExpenses(data.expenses)
           setgrandTotal(data.total)
       }
       catch(error){
        console.log(error)
       }
    }

    return (
        <>
            <ToastContainer />
            <div className="container" style={{marginTop:'100px'}}>
                <div className="text-center">
                    <h2 className="bi bi-calendar-date"> Datewise Expense Report</h2>
                    <p className="text-primary">Search and analyze your expense report between two days</p>
                </div>

                <form action="" onSubmit={handleSubmit} className="row gy-4" method="post">
                    <div className='col-lg-4 col-12'>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-calendar"></i>
                            </span>
                            <input type="date" name="ExpenceDateStart" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="form-control" required placeholder="Enter Your full name" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-12">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-bag-check me-2"></i>
                            </span>
                            <input type="date" name="ExpenceDateEnd" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="form-control" required placeholder="Enter Your full name" />
                        </div>
                    </div>

                    <div className="col-lg-4 col-12">
                        <button style={{ width: "100%" }} className="btn btn-primary"><i className='bi bi-search me-2'></i> Search</button>
                    </div>

                </form>

                <table className='table mt-4 table-striped table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((expense, index) => (
                                    <tr key={expense.id}>
                                        <td>{index + 1}</td>
                                        <td>{expense.ExpenceDate}</td>
                                        <td>{expense.ExpenseItem}</td>
                                        <td>{expense.ExpenseCost}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='text-center'><i className='bi bi-explanation'></i>No Data Found</td>
                                </tr>
                            )}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='text-end fw-bold' colSpan={3}>Grand Total : </td>
                                <td className='fw-bold text-success'>₹ {grandTotal}</td>
                            </tr>
                        </tfoot>
                    </table>
            </div>
        </>
    )
}

export default ExpenseReport
