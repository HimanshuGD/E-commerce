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
                <div className="form-group">
                    <label>Card Number:</label>
                    <input name="cardno" value={formData.cardno} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Expiry Date:</label>
                    <input name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>CVV:</label>
                    <input name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Postal Code:</label>
                    <input name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>

                <p className='text-right'>
                    <button className='btn btn-success' style={{ paddingRight:'2cm', backgroundColor: 'white' }} onClick={cancel} type='submit'>
                        <strong style={{ color:'black' }}>Back</strong>
                    </button>
                    <button className='btn btn-success' onClick={success} type='submit'>
                        <strong>Pay Now</strong>
                    </button>
                </p>
            </form>
        </div>
    );
};

export default CheckoutPage;
