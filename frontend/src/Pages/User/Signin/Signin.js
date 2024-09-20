import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: '',
        };
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value, error: '' });
    };

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value, error: '' });
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/buyer/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            }),
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.onRouteChange('home', user.id);
                } else {
                    this.setState({ error: user.error || 'Invalid email or password' });
                }
            })
            .catch(error => {
                console.error('Error during sign-in:', error);
                this.setState({ error: 'Sign-in failed. Please try again.' });
            });
    };

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="signin-container">
                <div className="signin-form">
                    <h2 className="signin-title">Sign In</h2>
                    <div className="input-group">
                        <label htmlFor="email-address">Email:</label>
                        <input
                            type="email"
                            id="email-address"
                            onChange={this.onEmailChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={this.onPasswordChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="signin-button" onClick={this.onSubmitSignIn}>
                        Sign In
                    </button>
                    <p className="register-link" onClick={() => onRouteChange('register')}>
                        Don't have an account? Register
                    </p>
                    {this.state.error && (
                        <p className="error-message">{this.state.error}</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Signin;

