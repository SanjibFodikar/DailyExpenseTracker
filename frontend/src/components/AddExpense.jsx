import React ,{useState,useEffect} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"

const AddExpense = () => {
  const navigate=useNavigate()
  const [formData,putData]=useState({
     'ExpenceDate':"",
     'ExpenseItem':"",
     'ExpenseCost':""
  })
 
  const userId=localStorage.getItem('userId')

  useEffect(()=>{
     if (!userId) {
        navigate('/login')
     }
  },[])

  const enterFormData = (e)=>{
     putData({
        ...formData,
        [e.target.name]:e.target.value
     })
  }
  const SubmitForm =async (e) =>{
    e.preventDefault();
    const response=await fetch("http://127.0.0.1:8000/api/addExpense/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ...formData,
            UserId:userId
         })
    })
    const data=await response.json()
    if (response.status === 201) {
        toast.success(data.message)
        putData({
            'ExpenceDate':"",
            'ExpenseItem':"",
            'ExpenseCost':""
        })
    }else{
        toast.error(data.message)
    }
  }
  return (
    <>
    <ToastContainer />
            <div className="container" style={{marginTop:'100px'}}>
                <div className="text-center">
                    <h2 className="bi bi-person-plus-fill"> Create Expense</h2>
                    <p className="text-primary">Track Your New Spend</p>
                </div>

                <form action="" className="p-4 border rounded shadow mx-auto" method="post" onSubmit={SubmitForm} style={{ maxWidth: '600px' }}>
                    <div>
                        <label htmlFor="" className="form-label">Expence Date : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-calendar"></i>
                            </span>
                            <input type="date" name="ExpenceDate" value={formData.ExpenceDate} onChange={enterFormData} className="form-control" required placeholder="Enter Your full name" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Expense Item : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-bag-check me-2"></i>
                            </span>
                            <input type="text" name="ExpenseItem" value={formData.ExpenseItem} onChange={enterFormData} className="form-control" required placeholder="Enter Expense Item (e.g- Groceries , Petrol)" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label htmlFor="" className="form-label">Expense Cost : </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-cash-coin"></i>
                            </span>
                            <input type="text" name="ExpenseCost" value={formData.ExpenseCost} onChange={enterFormData} className="form-control" required placeholder="Enter Expense Cost" />
                        </div>
                    </div>
                    <button className="mt-2 btn btn-primary">Submit</button>
                </form>
            </div>
    </>
  )
}

export default AddExpense
