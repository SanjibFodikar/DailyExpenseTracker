import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"

const ManageExpense = () => {
    const navigate = useNavigate()
    const [expenses, setExpenses] = useState([])
    const [editExpense,setEditExpense]=useState(null)
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
        fetchExpense(userId)
    }, [])

    const fetchExpense = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manageExpense/${userId}/`)
            const data = await response.json()
            setExpenses(data)
        }
        catch (error) {
            console.error("Error Fetching EXpenses")
        }
    }

    const handleEdit = (expense) =>{
         setEditExpense(expense)
         
    }

    const handleChange = (e)=>{
        setEditExpense({
            ...editExpense,
            [e.target.name]:e.target.value
        })
    } 

    const saveData = async () =>{
        let response=await fetch(`http://127.0.0.1:8000/api/editExpense/${editExpense.id}/`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(editExpense)
        })
        try{
          let data=await response.json()
          if (response.status === 200) {
            toast.success("Expense edited successfully")
            setEditExpense(null)
            fetchExpense(userId)
          }else{
            toast.error("Failed to upload expense")
          }
        }catch(error){
            console.log(error)
        }
    }

    const deleteExpense =async (expense) =>{
        console.log(expense)
        if (window.confirm("Are You Sure To Delete Expense")) {
            try{
                let response = await fetch(`http://127.0.0.1:8000/api/deleteExpense/${expense}/`,{
                    method:"DELETE"
                })
                let data = await response.json()
                if (response.status === 200) {
                    toast.success("Expense Deleted Successfully")
                    fetchExpense(userId)
                }else{
                    toast.error("Failed to delete Expense")
                }
            }
            catch(error){
                console.log("Error occurs")
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="container" style={{marginTop:'100px'}}>
                <div className="text-center">
                    <h2><i className="bi bi-exclamation-circle"></i> Manage Expense</h2>
                    <p className="text-primary">View , edit , delete your expense</p>
                </div>
                <div>
                    <table className='table table-striped table-bordered'>
                        <thead className='table-dark'>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost</th>
                                <th>Action</th>
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
                                        <td>
                                            <button className='btn btn-success ms-2 me-2' onClick={()=>handleEdit(expense)}><i className='bi bi-pencil'></i> Edit</button>
                                            <button className='btn btn-danger' onClick={()=>deleteExpense(expense.id)}><i className='bi bi-trash'></i>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className='text-center'><i className='bi bi-explanation'></i>No Data Found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

                {editExpense && (
                    <div className="modal show d-block fade" style={{background:"rgba(0,0,0,0.5)"}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h1 className="modal-title  text-white fs-5" id="exampleModalLabel"><i className='bi bi-pencil'></i> Edit Expense</h1>
                                <button type="button" className="btn-close" onClick={()=>setEditExpense(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="" className="form-label">Expence Date : </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-calendar"></i>
                                        </span>
                                        <input type="date" name="ExpenceDate" value={editExpense.ExpenceDate} onChange={handleChange} className="form-control" required placeholder="Enter Your full name" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="" className="form-label">Expense Item : </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-bag-check me-2"></i>
                                        </span>
                                        <input type="text" name="ExpenseItem" value={editExpense.ExpenseItem} onChange={handleChange} className="form-control" required placeholder="Enter Expense Item (e.g- Groceries , Petrol)" />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="" className="form-label">Expense Cost : </label>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-cash-coin"></i>
                                        </span>
                                        <input type="text" name="ExpenseCost" value={editExpense.ExpenseCost} onChange={handleChange} className="form-control" required placeholder="Enter Expense Cost" />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={()=>setEditExpense(null)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveData}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                
            </div>
        </>
    )
}

export default ManageExpense
