import { useState, useEffect } from "react";

export default function ManageAddress() {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
        isDefault: false,
    });
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
        setAddresses(savedAddresses);
    }, []);

    useEffect(() => {
        localStorage.setItem("addresses", JSON.stringify(addresses));
    }, [addresses]);

    const handleAddOrUpdateAddress = () => {
        if (newAddress.address.trim() !== "" && newAddress.mobile.trim() !== "") {
            if (editingIndex !== null) {
                const updatedAddresses = [...addresses];
                updatedAddresses[editingIndex] = newAddress;
                setAddresses(updatedAddresses);
                setEditingIndex(null);
            } else {
                setAddresses([...addresses, newAddress]);
            }
            setNewAddress({ name: "", mobile: "", pincode: "", address: "", city: "", state: "", isDefault: false });
        }
    };

    const handleEditAddress = (index) => {
        setNewAddress(addresses[index]);
        setEditingIndex(index);
    };

    const handleDeleteAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    const handleSetDefault = (index) => {
        const updatedAddresses = addresses.map((addr, i) => ({
            ...addr,
            isDefault: i === index,
        }));
        setAddresses(updatedAddresses);
    };

    const fetchCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                if (data.address) {
                    setNewAddress({
                        ...newAddress,
                        address: data.display_name,
                        city: data.address.city || data.address.town || "",
                        state: data.address.state || "",
                        pincode: data.address.postcode || "",
                    });
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-3">Manage Addresses</h3>
            <div className="card p-3 mb-3">
                <h5>{editingIndex !== null ? "Edit Address" : "Add New Address"}</h5>
                <input type="text" className="form-control mb-2" placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Mobile" value={newAddress.mobile} onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Pincode" value={newAddress.pincode} onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Address" value={newAddress.address} onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                <button className="btn btn-secondary mb-2" onClick={fetchCurrentLocation}>Use Current Location</button>
                <button className="btn btn-primary" onClick={handleAddOrUpdateAddress}>{editingIndex !== null ? "Update" : "Add"} Address</button>
            </div>
            <ul className="list-group">
                {addresses.map((address, index) => (
                    <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${address.isDefault ? "bg-light" : ""}`}>
                        <div>
                            <strong>{address.name}</strong> ({address.mobile})
                            <br /> {address.address}, {address.city}, {address.state} - {address.pincode}
                        </div>
                        <div>
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleSetDefault(index)}>
                                {address.isDefault ? "Default" : "Set Default"}
                            </button>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditAddress(index)}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAddress(index)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
