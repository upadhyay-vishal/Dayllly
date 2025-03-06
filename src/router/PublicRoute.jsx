import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
    const authToken = localStorage.getItem("userDetails")

    if (authToken) {
        return <Navigate to='/dashboard' />
    }

    return <Outlet />
}

export default PublicRoute;