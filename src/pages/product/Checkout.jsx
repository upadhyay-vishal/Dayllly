import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCheckoutProduct } from "../../redux/slices/CheckoutSlice";
import { Country, State, City } from 'country-state-city';

const Checkout = () => {

    const [countries, setCountries] = useState(Country.getAllCountries());
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const product = useSelector((state) => state.checkout.product);
    const dispatch = useDispatch();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    });

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setStates(State.getStatesOfCountry(country.isoCode));
        setCities([]);
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
    };
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                const formattedAddresses = data.map(user => ({
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    city: user.address.city,
                    state: user.address.state || "Unknown",
                    zip: user.address.zipcode,
                    street: user.address.street,
                }));
                setAddresses(formattedAddresses);
                if (formattedAddresses.length > 0) {
                    setSelectedAddress(formattedAddresses[0]);
                }
            })
            .catch((error) => console.error("Error fetching addresses:", error));
    }, []);

    if (!product) {
        return <p className="text-center fs-4 fw-bold">No product selected for checkout.</p>;
    }

    const handleAddressChange = (e) => {
        if (e.target.value === "new") {
            setShowNewAddressForm(true);
            setSelectedAddress(null);
        } else {
            setShowNewAddressForm(false);
            const selected = addresses.find(addr => addr.id === parseInt(e.target.value));
            setSelectedAddress(selected);
        }
    };

    const handleInputChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        if (!selectedAddress && !showNewAddressForm) {
            alert("Please select or enter an address!");
            return;
        }

        // If New Address Form is shown, validate fields
        if (showNewAddressForm) {
            for (const key in newAddress) {
                if (!newAddress[key].trim()) {
                    alert(`Please fill in the ${key} field.`);
                    return;
                }
            }
        }

        let finalAddress = showNewAddressForm ? newAddress : selectedAddress;
        alert(`Order placed for ${product.title}!\nShipping to: ${finalAddress.name}, ${finalAddress.street}, ${finalAddress.city}`);

        dispatch(clearCheckoutProduct());
    };

    return (
        <div className="container mt-5">
            <h4 className="fw-bold text-decoration-underline mb-4">Checkout</h4>
            <div className="border p-4 mt-3 shadow">
                <h4>{product.title}</h4>
                <img src={product.image} alt={product.title} className="img-fluid" style={{ maxWidth: "150px" }} />
                <p className="fw-semibold">Price: ${product.price}</p>
                <p>{product.description}</p>

                <h5 className="mt-4">Select Shipping Address:</h5>
                <div className="mb-3">
                    {addresses.map(addr => (
                        <div key={addr.id} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="address"
                                value={addr.id}
                                checked={selectedAddress?.id === addr.id}
                                onChange={handleAddressChange}
                            />
                            <label className="form-check-label">
                                {addr.name}, {addr.street}, {addr.city}
                            </label>
                        </div>
                    ))}
                    <div className="form-check mt-4">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="address"
                            value="new"
                            checked={showNewAddressForm}
                            onChange={handleAddressChange}
                        />
                        <label className="form-check-label fw-bold">Enter New Address</label>
                    </div>
                </div>
                {showNewAddressForm && (
                    <div className="border p-3 mt-3">
                        <h5 className="fw-bold">Enter New Address</h5>
                        <div className="row">
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="name" placeholder="Full Name" value={newAddress.name} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="phone" placeholder="Phone Number" value={newAddress.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4">
                                <select
                                    className='form-select'
                                    onChange={(e) =>
                                        handleCountryChange(
                                            countries.find((c) => c.isoCode === e.target.value),
                                        )
                                    }>
                                    <option value=''>Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select
                                    disabled={!selectedCountry}
                                    className='form-select'
                                    onChange={(e) =>
                                        handleStateChange(
                                            states.find((s) => s.isoCode === e.target.value),
                                        )
                                    }>
                                    <option value=''>Select State</option>
                                    {states.map((state) => (
                                        <option key={state.isoCode} value={state.isoCode}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <select
                                    disabled={!selectedState || !selectedCountry}
                                    className='form-select'>
                                    <option value=''>Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="street" placeholder="Street Address" value={newAddress.street} onChange={handleInputChange} required />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control mb-2" name="zip" placeholder="Zip Code" value={newAddress.zip} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>
                )}
                <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;
