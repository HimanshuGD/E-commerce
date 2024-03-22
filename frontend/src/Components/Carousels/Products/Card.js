import React from 'react';
import './Card.css';

const Card = ({ userId, name, url, id, seller, prize }) => {
    const addToCart = () => {
        fetch('http://localhost:3000/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId, 
                productId: id,
                quantity: 1
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            alert('Item added to cart successfully!');
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        });
    };

    const openProductPage = () => {
        const newurl = `/product?id=${id}&name=${encodeURIComponent(name)}&imageUrl=${encodeURIComponent(url)}&email=${encodeURIComponent(seller)}`;
        window.open(newurl, '_blank');
    };

    return (
        <div className='card'>
            <img alt={name} src={url} style={{ width: '250px', height: 'auto', padding: '0.6cm' }} />
            <div>
                <h1>{id}</h1>
                <h2>{name}</h2>
                <p>{seller}</p>
                <p>{prize}</p>
            </div>
            <button onClick={openProductPage}>More</button>
            <hr></hr>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default Card;
