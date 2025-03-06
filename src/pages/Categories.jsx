import React, { useEffect, useState } from "react";

const Categories = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-decoration-underline">Categories:</h4>
            <div className="row g-4">
                {products.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card shadow-sm border-0 rounded">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="card-img-top p-3"
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <div className="card-body text-center">
                                <p className="card-text text-muted">Category: {product.category}</p>
                                <h5 className="card-title">{product.title}</h5>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
