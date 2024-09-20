import React, { useState, useEffect } from 'react';
import NavigationSeller from '../../../Components/Navbar/SellerNav';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Main from '../Pages/Main/Main';
import MyAccount from '../Pages/MyAccount/MyAccount';
import './SellerHome.css';

const SellerHome = () => {
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
        business: '',
    });

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('sellerUser');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsSignedIn(true);
                setUserId(parsedUser.id);
                if (route !== 'signin' && route !== 'register') {
                    setRoute('home');
                }
            } else {
                setRoute('signin');
            }
        } catch (error) {
            console.error('Failed to retrieve user from localStorage', error);
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
            business: data.business,
        });
        localStorage.setItem('sellerUser', JSON.stringify(data));
        setUserId(data.id);
    };

    const onRouteChange = (route, userId) => {
        if (route === 'signout') {
            localStorage.removeItem('sellerUser');
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
                business: '',
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
        <div className="SellerHome" style={{ minHeight: '100vh' }}>
            <NavigationSeller
                userId={userId}
                isSignedIn={isSignedIn}
                onRouteChange={onRouteChange}
                style={{ position: 'fixed' }}
            />
            {route === 'home' ? (
                <Main userId={userId} />
            ) : route === 'myprofile' ? (
                <MyAccount onRouteChange={onRouteChange} userId={userId} />
            ) : route === 'signin' ? (
                <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
            ) : (
                <Register loadUser={loadUser} onRouteChange={onRouteChange} />
            )}
        </div>
    );
};

export default SellerHome;
