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
            <img alt={name} src={url} className='card-image' />
            <div className='card-details'>
                <h2 className='card-title'>{name}</h2>
                <p className='card-seller'>Seller: {seller}</p>
                <p className='card-price'>Price: {prize}</p>
            </div>
            <div className='card-actions'>
                <button className='card-button' onClick={openProductPage}>More</button>
                <button className='card-button' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Card;
