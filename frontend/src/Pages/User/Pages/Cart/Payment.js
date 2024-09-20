import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css'; // Import CSS file

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cardno: '',
        date: '',
        cvv: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // You might want to call your payment API here
    };

    const success = () => {
        window.location.href = `/success`;
    };

    const cancel = () => {
        window.location.href = `/cancel`;
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                {[
                    { label: 'Card Number', name: 'cardno', type: 'text' },
                    { label: 'Expiry Date', name: 'date', type: 'text' },
                    { label: 'CVV', name: 'cvv', type: 'text' },
                    { label: 'Full Name', name: 'fullName', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Address', name: 'address', type: 'text' },
                    { label: 'City', name: 'city', type: 'text' },
                    { label: 'Postal Code', name: 'postalCode', type: 'text' },
                ].map(({ label, name, type }) => (
                    <div className="form-group" key={name}>
                        <label>{label}:</label>
                        <input
                            name={name}
                            type={type}
                            value={formData[name]}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>
                ))}

                <div className='button-group'>
                    <button className='btn btn-back' onClick={cancel} type='button'>
                        <strong>Back</strong>
                    </button>
                    <button className='btn btn-pay' onClick={success} type='submit'>
                        <strong>Pay Now</strong>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
