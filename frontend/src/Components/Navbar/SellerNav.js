import React from 'react';
import logo from '../../assets/logo192.png';
import { Link } from 'react-router-dom';
import './SellerNav.css';

const Navigation = ({ userId, onRouteChange, isSignedIn }) => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <strong>MyShop</strong>
            </div>
            <div className="nav-links">
                {!isSignedIn ? (
                    <>
                        <span
                            className="nav-item"
                            onClick={() => onRouteChange('signin')}
                        >
                            Sign In
                        </span>
                        <span
                            className="nav-item"
                            onClick={() => onRouteChange('register')}
                        >
                            Register
                        </span>
                    </>
                ) : (
                    <>
                        <span
                            className="nav-item"
                            onClick={() => onRouteChange('home')}
                        >
                            Home
                        </span>
                        <Link
                            to="/about"
                            className="nav-item"
                        >
                            About
                        </Link>
                        <span
                            className="nav-item"
                            onClick={() => onRouteChange('myprofile', userId)}
                        >
                            My Profile
                        </span>
                        <span
                            className="nav-item"
                            onClick={() => onRouteChange('signout')}
                        >
                            Sign Out
                        </span>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
