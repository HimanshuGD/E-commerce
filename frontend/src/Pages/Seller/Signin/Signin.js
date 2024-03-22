import React from 'react';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            businessname: '',
            error:'',
            userId:'',
            redirect:false,
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onBusinessChange = (event) => {
        this.setState({ businessname: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/seller/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
                business: this.state.businessname
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
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
            <div className="" style={{ minHeight: '100vh' }}>
                <main className="">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0" style={{ height:'90%', width: '110%' }} >
                            <legend className="f1 fw6 ph0 mh0" style={{ fontSize: '1.7cm' }} >Sign In</legend>
                            <div className="mt3" style={{ padding: '0.4cm' }} >
                                <label className="db fw6 lh-copy f6" htmlFor="email-address" style={{ fontSize: '1cm' }}>Email : </label>
                                <input 
                                    style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mt3" style={{ padding: '0.4cm' }} >
                                <label className="db fw6 lh-copy f6" htmlFor="email-address" style={{ fontSize: '1cm' }}>Business name : </label>
                                <input
                                    style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="business"
                                    onChange={this.onBusinessChange}
                                />
                            </div>
                            <div className="mv3" style={{ padding: '0.4cm' }}>
                                <label className="db fw6 lh-copy f6" htmlFor="password" style={{ fontSize: '1cm' }}>Password : </label>
                                <input
                                    style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="" style={{ cursor:'pointer', padding: '0.7cm' }}>
                            <input style={{cursor:'pointer'  , fontSize: '1cm', borderColor: 'red' }}
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3" style={{ cursor:'pointer' }}>
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer" style={{fontSize:' 1cm'}}>Register</p>
                        </div>
                        {this.state.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-3 rounded" >
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