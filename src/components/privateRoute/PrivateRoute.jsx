import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isClient } from '../../utils'

function PrivateRoute({ children, clientAccess }) {
    const { userInfo } = useSelector(state => state.auth)
    // if client
    if (userInfo?.uid) {
        // User is  logged in
        if (isClient(userInfo)) {
            // Client
            if (clientAccess) {
                return children;
            } else {
                return <Navigate to={"/history"}></Navigate>
            }
        } else {
            // Admin
            return children
        }
    } else {
        return <Navigate to={"/login"}></Navigate>
    }
}

export default PrivateRoute