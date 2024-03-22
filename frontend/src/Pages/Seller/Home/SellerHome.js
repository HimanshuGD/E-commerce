import React, { Component } from 'react';
import NavigationSeller from '../../../Components/Navbar/SellerNav';
import Signin from '../Signin/Signin';
import Register from '../Register/Register';
import Main from '../Pages/Main/Main';

import './SellerHome.css';

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
        pincode: '',
        mobile: '',
        business: '',
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
                business: data.business,
            }
        })
    }

    onRouteChange = (route, userId) => {
        if (route === 'signout') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState(prevState => ({
                ...prevState,
                route: route,
                isSignedIn: true,
                userId: userId
            }));
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, route, userId } = this.state;
        return (
            <div className="App">
                <NavigationSeller 
                userId={userId} 
                isSignedIn={isSignedIn} 
                onRouteChange={this.onRouteChange} />
                {route === 'home'
                    ? <Main userId={userId} />
                    : (
                        route === 'signin'
                            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }
}

export default App;



