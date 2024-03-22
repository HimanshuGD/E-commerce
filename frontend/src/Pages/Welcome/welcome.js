import React, { useState } from 'react';
import seller from '../../assets/seller.jpeg';
import buyer from '../../assets/buyer.png';
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
            <h1 style={{fontSize: '2cm' , justifyContent: 'top'}}>Welcome to your OnlineShop!</h1>
            <h1 style={{}}>First, let us tell about yourself...</h1>
            <h1>Are you a buyer or a seller?</h1>
            <div className="choices-container">
                <label className={`choice-label ${userType === 'user' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="userType"
                        value="user"
                        checked={userType === 'user'}
                        onChange={() => handleSelection('user')}
                    />
                    <h1 id='buyer'>Buyer</h1>
                    <Link to="/userhome">
                        <img src = {buyer} style={{width: '400px'}} alt="User" />
                    </Link>
                </label>
                <label className={`choice-label ${userType === 'seller' ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="userType"
                        value="seller"
                        checked={userType === 'seller'}
                        onChange={() => handleSelection('seller')}
                    />
                    <h1 id='seller'>Seller</h1>
                    <Link to="/sellerhome">
                        <img src={seller} style={{width:'300px'}} alt="Seller" />
                    </Link>
                </label>
            </div>
            <div style={{padding:'1cm'}}>
            <button style={{ cursor:'pointer' ,fontSize: '1cm'}} onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default Welcome;
