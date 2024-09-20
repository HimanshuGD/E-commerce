import React from 'react';
import './Signin.css'; // Make sure to import the CSS file

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            businessname: '',
            error: '',
        };
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    };

    onBusinessChange = (event) => {
        this.setState({ businessname: event.target.value });
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/seller/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
                business: this.state.businessname,
            }),
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
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
                <div className="signin-main">
                    <h2 className="signin-title">Sign In</h2>
                    <form className="signin-form">
                        <div className="signin-form-group">
                            <label className="signin-label" htmlFor="email-address">Email:</label>
                            <input
                                className="signin-input"
                                type="email"
                                id="email-address"
                                onChange={this.onEmailChange}
                                required
                            />
                        </div>
                        <div className="signin-form-group">
                            <label className="signin-label" htmlFor="business-name">Business Name:</label>
                            <input
                                className="signin-input"
                                type="text"
                                id="business-name"
                                onChange={this.onBusinessChange}
                                required
                            />
                        </div>
                        <div className="signin-form-group">
                            <label className="signin-label" htmlFor="password">Password:</label>
                            <input
                                className="signin-input"
                                type="password"
                                id="password"
                                onChange={this.onPasswordChange}
                                required
                            />
                        </div>
                        {this.state.error && (
                            <div className="signin-error">{this.state.error}</div>
                        )}
                        <button className="signin-submit" onClick={this.onSubmitSignIn} type="button">Sign In</button>
                    </form>
                    <div className="signin-register-link" onClick={() => onRouteChange('register')}>
                        Don't have an account? Register here
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;
