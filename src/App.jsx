import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css'


import { Route, Routes } from 'react-router-dom'
import ResetPassword from './pages/auth/ResetPassword'
import AdminSignUp from './pages/auth/AdminSignUp'
import Dashboard from './pages/dashboard/Dashboard'
import Books from './pages/books/Books'
import AddBook from './pages/books/AddBook'
import EditBook from './pages/books/EditBook'
import History from './pages/history/History'
import Clients from './pages/clients/Clients'
import Login from './pages/auth/Login'

function App() {
  return (
    <>
      <Routes>
        {/* We will later update this (/) route to display homepage */}
        <Route path='/' element={<Login />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/reset-password' element={<ResetPassword />} ></Route>
        <Route path='/admin-signup' element={<AdminSignUp />} ></Route>

        <Route path='/dashboard' element={<Dashboard />} ></Route>
        <Route path='/books' element={<Books />} ></Route>
        <Route path='/add-book' element={<AddBook />} ></Route>
        <Route path='/edit-book' element={<EditBook />} ></Route>

        <Route path='/history' element={<History />} ></Route>
        <Route path='/clients' element={<Clients />} ></Route>

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
