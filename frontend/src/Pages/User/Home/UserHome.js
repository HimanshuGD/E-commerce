import React, { useState, useEffect } from 'react';
import Navigation from '../../../Components/Navbar/Navigation';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Main from '../Pages/Main/Main';
import MyAccount from '../Pages/MyAccount/MyAccount';
import MyCart from '../Pages/Cart/Cart';

import './UserHome.css';

const App = () => {
    const [route, setRoute] = useState('signin');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        mobile: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsSignedIn(true);
            setUserId(parsedUser.id);
            setRoute('home');
        }
    }, []);

    const loadUser = (data) => {
        setUser({
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            city: data.city,
            state: data.state,
            country: data.country,
            pincode: data.pincode,
            mobile: data.mobile,
        });
        localStorage.setItem('user', JSON.stringify(data));
        setUserId(data.id);
    };

    const onRouteChange = (route, userId) => {
        if (route === 'signout') {
            localStorage.removeItem('user');
            setUser({
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                city: '',
                state: '',
                country: '',
                pincode: '',
                mobile: '',
            });
            setIsSignedIn(false);
            setUserId('');
            setRoute('signin');
        } else {
            setRoute(route);
            setIsSignedIn(route !== 'signin' && route !== 'register');
            setUserId(userId || '');
        }
    };

    return (
        <div className="User" style={{ minHeight: '100vh' }}>
            <Navigation
                userId={userId}
                isSignedIn={isSignedIn}
                onRouteChange={onRouteChange}
                style={{ position: 'fixed' }}
            />
            {route === 'home' ? (
                <Main userId={userId} />
            ) : route === 'myaccount' ? (
                <MyAccount onRouteChange={onRouteChange} userId={userId} />
            ) : route === 'mycart' ? (
                <MyCart onRouteChange={onRouteChange} userId={userId} />
            ) : route === 'signin' ? (
                <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
            ) : (
                <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            )}
        </div>
    );
};

export default App;
