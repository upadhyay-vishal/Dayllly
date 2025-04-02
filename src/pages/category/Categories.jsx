import React, { useEffect, useState } from "react";

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/categories') // Updated Fake API
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    return (
        <div className="container mt-4">
            <h4 className="fw-bold text-decoration-underline mb-4">Categories</h4>
            <div className="row g-4">
                {categories.map((category, index) => (
                    <div key={index} className="col-md-4 col-lg-3 mb-4">
                        <div className="card shadow-sm">
                            <img src={category.image || "https://via.placeholder.com/150"}
                                className="card-img-top" alt={category.name} />
                            <div className="card-body text-center">
                                <h5 className="card-title text-capitalize fw-semibold">{category.name}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
