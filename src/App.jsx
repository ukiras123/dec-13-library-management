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
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Home from './pages/home/Home';
import BookLanding from './pages/books/BookLanding';
import SignUp from './pages/auth/SignUp';

function App() {
  return (
    <>
      <Routes>
        {/* We will later update this (/) route to display homepage */}
        <Route path='/' element={<Home />} ></Route>
        <Route path='/books/:id' element={<BookLanding />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/sign-up' element={<SignUp />} ></Route>
        <Route path='/reset-password' element={<ResetPassword />} ></Route>
        <Route path='/admin-signup' element={<PrivateRoute><AdminSignUp /></PrivateRoute>} ></Route>
        {/* <Route path='/admin-signup' element={<AdminSignUp />} ></Route> */}

        {/* Private Route */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} ></Route>
        <Route path='/book' element={<PrivateRoute><Books /></PrivateRoute>} ></Route>
        <Route path='/add-book' element={<PrivateRoute><AddBook /></PrivateRoute>} ></Route>
        <Route path='/book/edit/:id' element={<PrivateRoute><EditBook /></PrivateRoute>} ></Route>

        <Route path='/history' element={<PrivateRoute><History /></PrivateRoute>} ></Route>
        <Route path='/client' element={<PrivateRoute><Clients /></PrivateRoute>} ></Route>

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
