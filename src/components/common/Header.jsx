import React, { useState, useEffect } from "react";
import img1 from "../../images/daylyy_yellow.png";
import img2 from "../../images/profile_do.jpg";
import cart from "../../images/shopping-cart.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/slices/ProductSlice";
import { Sun, Moon } from "lucide-react";

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.counter.cart);
    const products = useSelector((state) => state.product.products);
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);

    // ✅ Dark Mode Setup
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <nav className={`navbar navbar-light px-3 d-flex justify-content-between sticky-top shadow-sm ${theme}`}>
            <div>
                <img src={img1} alt="Logo" className="dadly_logo_yell" />
            </div>

            {/* ✅ Search Box */}
            <div className="d-flex align-items-center">
                <div className="mx-3 position-relative">
                    <div className="d-flex">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="form-control"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && dispatch(setSearchQuery(searchText))}
                        />
                        <button className="btn btn-dark ms-2" onClick={() => dispatch(setSearchQuery(searchText))}>
                            Search
                        </button>
                    </div>

                    {/* ✅ Live Search Suggestions with Images */}
                    {showSuggestions && searchText && (
                        <ul className="list-group position-absolute w-100 mt-1 bg-white shadow rounded" style={{ zIndex: 1000 }}>
                            {products.filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()))
                                .slice(0, 5)
                                .map(product => (
                                    <li key={product.id} className="list-group-item d-flex align-items-center"
                                        onClick={() => {
                                            setSearchText(product.title);
                                            dispatch(setSearchQuery(product.title));
                                        }}>
                                        <img src={product.image} alt={product.title} style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: "10px" }} />
                                        {product.title}
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>

                <div onClick={() => navigate('/cart')} className="cursr_pointer">
                    <img src={cart} alt="Cart" className="fw-bolder" />
                    <span className="cart_count">{count}</span>
                </div>

                <div className="dropdown ms-5">
                    <button className="btn btn-light dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={img2} alt="Profile" className="rounded-circle profile_imag" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <li><button className="dropdown-item" onClick={() => { localStorage.clear(); sessionStorage.clear(); navigate("/"); }}>Logout</button></li>
                    </ul>
                </div>
                <span className="fw-bold ms-2">Emily Johnson</span>

                {/* ✅ Dark Mode Toggle Button */}
                <button className="btn dark-mode-toggle ms-3" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-800" />}
                </button>
            </div>
        </nav>
    );
};

export default Header;
