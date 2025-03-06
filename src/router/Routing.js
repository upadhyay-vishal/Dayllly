import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Forgetpassw from '../pages/auth/Forgetpassw'
import Otpverification from '../pages/auth/Otpverification';
import Changepassword from '../pages/auth/Changepassword';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Categories from '../pages/Categories';
import Products from '../pages/Products';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path='' element={<PublicRoute />}>
                        <Route path='/' element={<Login />} />
                        <Route path='/forgetpassword' element={<Forgetpassw />} />
                        <Route path='/otpverification' element={<Otpverification />} />
                        <Route path='/changepassword' element={<Changepassword />} />
                    </Route>
                    {/* Private Routes */}
                    <Route path='' element={<PrivateRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/products' element={<Products />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div >
    )
}

export default Routing;