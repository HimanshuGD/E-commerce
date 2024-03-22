import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = ({ userId, onRouteChange }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState('');

    // const { carts } = useSelector((state) => state.allCart);
    // console.log(carts)

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

    // const makePayment = async () => {
    //     const stripe = await loadStripe("pk_test_51Ows1XSDwETzF1L0duPqKUSbvSE61vHYN5zgDQezg9wNqgFPY8LtF7TuhZtrMTTaTmUidNJREWSofR2D7TgGvkN400kw3oy4em");

    //     // Format cart items to match server expectations
    //     const formattedCartItems = cartItems.map(item => ({
    //         dish: item.nameofproduct,
    //         imgdata: item.url,
    //         price: parseFloat(item.prize.substring(4)), 
    //         qnty: item.quantity
    //     }));

    //     const body = {
    //         products: formattedCartItems, // Use the formatted cart items
    //         userId: userId // Include userId in the request body
    //     };

    //     const headers = {
    //         "Content-Type": "application/json"
    //     };

    //     try {
    //         const response = await fetch("http://localhost:3000/api/create-checkout-session", {
    //             method: "POST",
    //             headers: headers,
    //             body: JSON.stringify(body)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to create checkout session');
    //         }

    //         const session = await response.json();

    //         const result = await stripe.redirectToCheckout({
    //             sessionId: session.id
    //         });

    //         if (result.error) {
    //             console.log(result.error);
    //         }
    //     } catch (error) {
    //         console.error('Error making payment:', error);
    //         setError('Failed to make payment. Please try again.');
    //     }
    // };



    return (
        <div>
            <h1 style={{ fontSize: '1.5cm' }}>My Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map(item => (
                            <div className='card' style={{ backgroundColor: 'orange' }} key={item.id}>
                                <img alt={item.nameofproduct} src={item.url} style={{ width: '250px', height: 'auto', padding: '0.6cm' }} />
                                <div>
                                    <h2>{item.nameofproduct}</h2>
                                    <p>{item.nameofseller}</p>
                                    <p>Price: {item.prize}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button onClick={() => window.open(`/product?id=${item.id}&name=${encodeURIComponent(item.nameofproduct)}&imageUrl=${encodeURIComponent(item.url)}&email=${encodeURIComponent(item.nameofseller)}`)}>More</button>
                                <hr></hr>
                                <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                            </div>
                        ))}
                    </ul>
                    <h1 style={{ paddingBottom: '1cm' }}> Total Price: Rs. {totalPrice.toFixed(2)} </h1>
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {/* <p style={{ paddingBottom: '5cm' }} className='text-right'><button className='btn btn-success' onClick={makePayment} type='button'>Checkout</button></p> */}
            <p style={{ paddingBottom: '5cm' }} className='text-right'>
                <button className='btn btn-success' onClick={handleCheckout} type='button'>
                    <Link className="checkout"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={`/pay/userId/${userId}`}>
                        <strong>Checkout</strong>
                    </Link>
                </button>
            </p>
        </div>
    );
};

export default Cart;


