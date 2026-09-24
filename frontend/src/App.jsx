import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import AddExpense from './components/AddExpense'
import ManageExpense from './components/ManageExpense'
import ExpenseReport from './components/ExpenseReport'
import ChangePassword from './components/ChangePassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/addExpense' element={<AddExpense/>}></Route>
          <Route path='/manageExpense' element={<ManageExpense/>}></Route>
          <Route path='/expenseReport' element={<ExpenseReport/>}></Route>
          <Route path='/changePassword' element={<ChangePassword/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
