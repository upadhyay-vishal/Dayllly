import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../redux/slices/CounterSlice";
import { resetSearch } from "../../redux/slices/ProductSlice";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchQuery = useSelector((state) => state.product.searchQuery); // ✅ Redux se search query le rahe hain
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        dispatch(resetSearch()); // ✅ Jab bhi Products page load ho, search reset ho
    }, [dispatch]);

    // ✅ Search filter apply karna
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className="text-center my-5">Loading products...</div>;
    }

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-decoration-underline mb-4">Products:</h4>
            <div className="row g-4 d-flex align-items-center">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="col-lg-3">
                            <div onClick={() => navigate(`/products/singleproducts/${product.id}`)} className="cursr_pointer card shadow-sm border-0 rounded">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="card-img-top p-2"
                                    style={{ height: "150px", objectFit: "contain" }}
                                />
                                <div className="card-body text-center">
                                    <p className="card-text text-muted">Category: {product.category}</p>
                                    <h5 className="card-title">{product.title}</h5>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={() => dispatch(addToCart(product))} className="btn btn-dark mt-3">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center w-100">
                        <h5>No products found.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
