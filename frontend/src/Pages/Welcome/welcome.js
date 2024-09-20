import React, { useState } from 'react';
import seller from '../../assets/seller.jpeg';
import buyer from '../../assets/buyer.png';
import logo from '../../assets/logo192.png'; 
import { Link } from 'react-router-dom';
import './welcome.css';

const Welcome = () => {
    const [userType, setUserType] = useState('');

    const handleSelection = (selectedType) => {
        setUserType(selectedType);
    };

    const handleContinue = () => {
        if (userType === 'user') {
            window.location.href = '/userhome';
        } else if (userType === 'seller') {
            window.location.href = '/sellerhome';
        }
    };

    return (
        <div className="welcome-container">
            <header className="header">
                <img src={logo} alt="Logo" className="logo" />
                <h1 className="site-name">MyShop</h1>
            </header>
            <div className="content">
                <h1 className="welcome-title">Welcome to MyShop!</h1>
                <p className="welcome-subtitle">First, let us know about yourself...</p>
                <h2 className="question">Are you a buyer or a seller?</h2>
                <div className="choices-container">
                    <div
                        className={`choice-card ${userType === 'user' ? 'selected' : ''}`}
                        onClick={() => handleSelection('user')}
                    >
                        <img src={buyer} className="choice-image" alt="Buyer" />
                        <h2 className="choice-title">Buyer</h2>
                    </div>
                    <div
                        className={`choice-card ${userType === 'seller' ? 'selected' : ''}`}
                        onClick={() => handleSelection('seller')}
                    >
                        <img src={seller} className="choice-image" alt="Seller" />
                        <h2 className="choice-title">Seller</h2>
                    </div>
                </div>
                <button className="continue-button" onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default Welcome;
