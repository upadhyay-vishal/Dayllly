import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false); // ✅ Loader state

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            setLoading(true);
            setTimeout(() => {
                navigate(path);
                setLoading(false);
            }, 500);
        }
    };

    return (
        <div>
            {loading && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}

            <nav id="sidebar">
                <ul>
                    <span className="logo fw-bold fs-5 text-decoration-underline">
                        Daylly
                        <button id="toggle-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                                <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
                            </svg>
                        </button>
                    </span>

                    <li onClick={() => handleNavigation('/dashboard')} className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Z" />
                        </svg>
                        <span>Dashboard</span>
                    </li>

                    <li onClick={() => handleNavigation('/categories')} className={location.pathname === '/categories' ? 'active' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Z" />
                        </svg>
                        <span>Categories</span>
                    </li>

                    <li onClick={() => handleNavigation('/products')} className={location.pathname === '/products' ? 'active' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h207q16 0 30.5 6t25.5 17l57 57h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Z" />
                        </svg>
                        <span>Products</span>
                    </li>

                    {/* ✅ New Manage Address Tab */}
                    <li onClick={() => handleNavigation('/manage-address')} className={location.pathname === '/manage-address' ? 'active' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                            <path d="M480-80q-17 0-28.5-11.5T440-120q0-17 11.5-28.5T480-160q17 0 28.5 11.5T520-120q0 17-11.5 28.5T480-80ZM120-400q-17 0-28.5-11.5T80-440q0-17 11.5-28.5T120-480q79 0 134.5-55.5T310-670q0-79-55.5-134.5T120-860q-17 0-28.5-11.5T80-900q0-17 11.5-28.5T120-940q109 0 186.5 77.5T384-670q0 109-77.5 186.5T120-406Z" />
                        </svg>
                        <span>Manage Address</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
