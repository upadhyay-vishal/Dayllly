import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Forgetpassw from '../pages/auth/Forgetpassw';
import Otpverification from '../pages/auth/Otpverification';
import Changepassword from '../pages/auth/Changepassword';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Categories from '../pages/category/Categories';
import Products from '../pages/product/Products';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SingleProduct from '../pages/product/SingleProduct';
import Cart from '../components/Cart';
import Checkout from '../pages/product/Checkout';
import ManageAddress from '../pages/ManageAddress';
import OtpLogin from '../pages/auth/OtpLogin';

function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path='' element={<PublicRoute />}>
                        <Route path='/' element={<Login />} />
                        <Route path='/otplogin' element={<OtpLogin />} />
                        <Route path='/forgetpassword' element={<Forgetpassw />} />
                        <Route path='/otpverification' element={<Otpverification />} />
                        <Route path='/changepassword' element={<Changepassword />} />
                    </Route>
                    {/* Private Routes */}
                    <Route path='' element={<PrivateRoute />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/categories' element={<Categories />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='/products/singleproducts/:id' element={<SingleProduct />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/manage-address' element={<ManageAddress />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Routing;