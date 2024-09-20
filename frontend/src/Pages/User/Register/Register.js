import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            mobile: '',
            error: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value, error: '' });
    };

    onSubmitRegister = () => {
        const { firstname, lastname, email, city, state, country, pincode, mobile, password } = this.state;
        if (!firstname || !lastname || !email || !city || !state || !country || !pincode || !mobile || !password) {
            this.setState({ error: 'Please fill in all the fields' });
            return;
        }

        fetch('http://localhost:3000/buyer/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                firstname,
                lastname,
                city,
                state,
                country,
                pincode,
                mobile,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({ error: 'Registration failed. Please try again.' });
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                this.setState({ error: 'Registration failed. Please try again.' });
            });
    };

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="register-container">
                <div className="register-form">
                    <h2 className="register-title">Register</h2>
                    <div className="input-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            onChange={this.handleChange}
                            placeholder="First Name"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            onChange={this.handleChange}
                            placeholder="Last Name"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            onChange={this.handleChange}
                            placeholder="City"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            onChange={this.handleChange}
                            placeholder="State"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            id="country"
                            onChange={this.handleChange}
                            placeholder="Country"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="pincode">Pincode:</label>
                        <input
                            type="text"
                            id="pincode"
                            onChange={this.handleChange}
                            placeholder="Pincode"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mobile">Mobile No.:</label>
                        <input
                            type="text"
                            id="mobile"
                            onChange={this.handleChange}
                            placeholder="Mobile No."
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            placeholder="Password"
                        />
                    </div>
                    <button className="register-button" onClick={this.onSubmitRegister}>
                        Register
                    </button>
                    <p className="register-link" onClick={() => onRouteChange('signin')}>
                        Already have an account? Register
                    </p>
                    {this.state.error && (
                        <p className="error-message">{this.state.error}</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Register;
