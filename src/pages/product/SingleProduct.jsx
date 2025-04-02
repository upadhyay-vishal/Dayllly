import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rating from '../../images/star.png';
import ratingempty from '../../images/star-empty.png';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/slices/CounterSlice";
import { setCheckoutProduct } from "../../redux/slices/CheckoutSlice";

const SingleProduct = () => {
    const [singleProduct, setsingleProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setsingleProduct(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching product:", error));
    }, []);

    if (loading) {
        return <div className="text-center fs-4 fw-semibold">Loading...</div>;
    }

    const ratingStars = Array.from({ length: 5 }, (_, index) => {
        return index < Math.floor(singleProduct.rating.rate) ? (
            <img key={index} src={rating} alt="star" style={{ width: "20px", height: "20px" }} />
        ) : (
            <img key={index} src={ratingempty} alt="empty star" style={{ width: "20px", height: "20px" }} />
        );
    });

    // ✅ Buy Now Function
    const handleBuyNow = () => {
        dispatch(setCheckoutProduct(singleProduct)); // ✅ Store product in Redux
        navigate("/checkout");
    };

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-decoration-underline mb-4">Categories</h4>
            <div className="row g-4">
                <div className="col-md-6 mb-4 border p-4 shadow">
                    <img
                        src={singleProduct.image}
                        alt={singleProduct.title}
                        className="card-img-top p-3"
                        style={{ height: "150px", objectFit: "contain" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{singleProduct.title}</h5>
                        <p className="card-text">{singleProduct.description}</p>
                        <div className="d-flex">
                            <div>{ratingStars}</div>
                            <p className="ms-2 fw-semibold fs-5">{singleProduct.rating.rate}</p>
                        </div>
                        <p className="fw-bold">Price: ${singleProduct.price}</p>
                        <div>
                            <button onClick={() => dispatch(addToCart(singleProduct))} className="btn btn-dark">
                                Add to cart
                            </button>
                            <button onClick={handleBuyNow} className="btn btn-dark ms-4">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
