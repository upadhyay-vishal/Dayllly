import React from 'react'
import Common from '../layout/Common'
import { Navigate, Outlet } from 'react-router-dom'


const PrivateRoute = () => {
    const authToken = localStorage.getItem("userDetails")

    if (!authToken) {
        return <Navigate to='/' />
    }

    return (
        <Common>
            <Outlet />
        </Common>
    )
}

export default PrivateRoute;