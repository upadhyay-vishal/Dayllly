import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../redux/slices/CounterSlice";

const Cart = () => {
    const cart = useSelector(state => state.counter.cart);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.counter.cart);
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="container">
            <h4 className="text-center fw-bold text-decoration-underline py-4">Your Cart [ {count} items]</h4>
            {cart.length === 0 ? <p className="text-center fw-semibold">Your cart is empty</p> : null}
            <ol style={{ type: "1" }}>
                {cart.map((item) => (
                    <li key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                        <img src={item.image} alt={item.title} width="50" height="50" style={{ borderRadius: "5px" }} />
                        <span className="fw-semibold">{item.title} - ${item.price}</span>
                        <div>
                            <button className="rounded fw-bold ms-4" onClick={() => dispatch(decrementQuantity({ id: item.id }))}>-</button>
                            <span className="fs-5 fw-semibold px-2">{item.quantity}</span>
                            <button className="rounded fw-bold" onClick={() => dispatch(incrementQuantity({ id: item.id }))}>+</button>
                        </div>
                        <button className="rounded bg-dark text-white ms-2 px-1 fw-semibold" onClick={() => dispatch(removeFromCart({ id: item.id }))} >Remove</button>
                    </li>
                ))}
            </ol>
            <h4 className="py-3 ms-3">Grand Total: ${totalPrice.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;
