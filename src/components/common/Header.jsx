import React, { useState } from "react";
import img1 from '../../images/daylyy_yellow.png';
import img2 from '../../images/profile_do.jpg';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-light px-3 d-flex justify-content-between">
            <div>
                <img src={img1} alt="" className='dadly_logo_yell' />
            </div>

            <div className="d-flex align-items-center">
                <div className="dropdown ms-5">
                    <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img src={img2} alt="" className='rounded-circle profile_imag' />

                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><a className="dropdown-item" href="#">Change Password</a></li>
                        <li><button className="dropdown-item" onClick={() => setShowLogoutModal(true)}>Logout</button></li>
                    </ul>
                </div>
                <span className="fw-bold ms-2">John Doe</span>
            </div>

            {showLogoutModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Logout</h5>
                                <button type="button" className="btn-close" onClick={() => setShowLogoutModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
