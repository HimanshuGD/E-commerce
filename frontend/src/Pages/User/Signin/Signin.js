import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            userId: '',
            error: '',
            redirect: false,
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value, error: '' })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value, error: '' })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/buyer/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.onRouteChange('home', user.id);
                } else {
                    if (user.error) {
                        this.setState({ error: user.error });
                    } else {
                        this.setState({ error: 'Invalid email or password' });
                    }
                }
            })
            .catch(error => {
                console.error('Error during sign-in:', error);
                this.setState({ error: 'Sign-in failed. Please try again.' });
            });
    }
    
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="" >
                <main className="pa4 black-80">
                    <div className="measure  flex-wrap">
                        <div id="sign_up" style={{ border:'solid' }} >
                            <legend style={{ fontSize: '1.7cm' }}>Sign In</legend>
                            <div style={{ padding: '0.4cm' }}>
                                <label style={{ fontSize: '1cm' }} htmlFor="email-address">Email : </label>
                                <input
                                    style={{ fontSize: '1cm', borderColor: 'red' }}
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div style={{ padding: '0.4cm' }}>
                                <label style={{ fontSize: '1cm' }} htmlFor="password">Password : </label>
                                <input
                                    style={{ fontSize: '1cm', borderColor: 'red' }}
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </div>
                        <div className="" style={{ padding: '0.8cm' }}>
                            <input style={{ cursor: 'pointer', fontSize: '1cm', borderColor: 'red' }}
                                onClick={this.onSubmitSignIn}
                                userId = {this.userId}
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3" style={{ cursor: 'pointer' }}>
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer" style={{ cursor: 'pointer', fontSize: '1cm' }}>Register</p>
                        </div>
                        {this.state.error && (
                            <div>
                                <p style={{ fontSize: '1cm', color: 'red' }} className="f6 red">{this.state.error}</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }
}

export default Signin;
