import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ userId, onRouteChange }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCartItems();
    }, [userId]);

    const fetchCartItems = () => {
        fetch(`http://localhost:3000/cart/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart items');
                }
                return response.json();
            })
            .then(data => {
                if (data.cartItems) {
                    setCartItems(data.cartItems);
                    const total = data.cartItems.reduce((acc, item) => acc + (parseFloat(item.prize.substring(4)) * item.quantity), 0);
                    setTotalPrice(total);
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setError('Failed to fetch cart items. Please try again.');
            });
    };

    const removeFromCart = (productId) => {
        fetch('http://localhost:3000/cart/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart');
                }
                fetchCartItems();
            })
            .catch(error => {
                console.error('Error removing item from cart:', error);
                setError('Failed to remove item from cart. Please try again.');
            });
    };

    const handleCheckout = () => {
        window.location.href = `/pay/userId/${userId}`;
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">My Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div className="cart-item" key={item.id}>
                                <img alt={item.nameofproduct} src={item.url} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2 className="cart-item-name">{item.nameofproduct}</h2>
                                    <p className="cart-item-seller">Seller: {item.nameofseller}</p>
                                    <p className="cart-item-price">Price: {item.prize}</p>
                                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                    <div className="cart-item-actions">
                                        <button className="btn btn-primary" onClick={() => window.open(`/product?id=${item.id}&name=${encodeURIComponent(item.nameofproduct)}&imageUrl=${encodeURIComponent(item.url)}&email=${encodeURIComponent(item.nameofseller)}`)}>More Details</button>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1 className="total-price">Total Price: Rs. {totalPrice.toFixed(2)}</h1>
                </>
            )}
            {error && <p className="error-message">{error}</p>}
            <div className="checkout-section">
                <Link className="checkout-link" to={`/pay/userId/${userId}`}>
                    <button className="btn btn-success">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default Cart;
