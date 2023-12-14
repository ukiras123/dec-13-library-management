import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    const { userInfo } = useSelector(state => state.auth)

    return (userInfo?.uid ? children : <Navigate to={"/login"}></Navigate>)
}

export default PrivateRoute