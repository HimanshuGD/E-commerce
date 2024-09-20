import React from 'react';
import logo from '../../assets/logo192.png';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ userId, onRouteChange, isSignedIn }) => {

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" /> <strong>MyShop</strong>
            </div>
            <div className="nav-links">
                {!isSignedIn ? (
                    <>
                        <Link
                            to="/userhome"
                            className="nav-item"
                            onClick={() => onRouteChange('signin')}
                        >
                            Sign In
                        </Link>
                        <Link
                            className="nav-item"
                            onClick={() => onRouteChange('register')}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            className="nav-item"
                            onClick={() => onRouteChange('home', userId)}
                        >
                            Home
                        </Link>
                        <Link
                            to = "/about"
                            className="nav-item"
                            onClick={() => onRouteChange('about', userId)}
                        >
                            About
                        </Link>
                        <Link
                            className="nav-item"
                            onClick={() => onRouteChange('mycart', userId)}
                        >
                            Cart
                        </Link>
                        <Link
                            className="nav-item"
                            onClick={() => onRouteChange('myaccount', userId)}
                        >
                            My Profile
                        </Link>
                        <Link
                            className="nav-item"
                            to='/'
                        >
                            Sign Out
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
