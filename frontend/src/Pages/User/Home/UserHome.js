import React, { Component } from 'react';
import Navigation from '../../../Components/Navbar/Navigation';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Main from '../Pages/Main/Main';
import MyAccount from '../Pages/MyAccount/MyAccount';
import MyCart from '../Pages/Cart/Cart';

import './UserHome.css';

const initialState = {
    input: '',
    route: 'signin',
    isSignedIn: false,
    userId: '',
    user: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        city: '',
        state: '',
        country: '',
        pincode:'',
        mobile:'',
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                userId: data.id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                city: data.city,
                state: data.state,
                country: data.country,
                pincode: data.pincode,
                mobile: data.mobile,
            }
        })
    }

    onRouteChange = (route, userId) => {
        if (route === 'signout') {
            this.setState(initialState);
        }
        else if (route === 'home') {
            this.setState(prevState => ({
                ...prevState,
                route: route,
                isSignedIn: true,
                userId: userId
            }));
        } else if (route === 'myaccount') {
            this.setState(prevState => ({
                ...prevState,
                route: route,
                isSignedIn: true,
                userId: userId
            }))
        } else if (route === 'mycart') {
            this.setState(prevState => ({
                ...prevState,
                route: route,
                isSignedIn: true,
                userId: userId
            }))
        } 
        else {
            this.setState({ route });
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, route, userId } = this.state;
        return (
            <div className="User" style={{ minHeight: '100vh' }}>
                <Navigation 
                userId={userId} 
                isSignedIn={isSignedIn}
                onRouteChange={this.onRouteChange} 
                style={{ position :'fixed'}}/>
                {route === 'home' ? (
                    <Main userId={userId} />
                ) : (
                    route === 'myaccount' ? (
                        <MyAccount userId={userId} />
                    ) : (
                        route === 'mycart' ? (
                            <MyCart onRouteChange={this.onRouteChange} userId={userId} />
                        ) : (
                            route === 'signin' ? (
                                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            ) : (
                                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            )
                        )
                    )
                )}
            </div>
        );
    }
}

export default App;


