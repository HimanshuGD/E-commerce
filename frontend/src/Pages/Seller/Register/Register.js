import React from 'react';

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
            business: '',
        }
    }

    onFirstNameChange = (event) => {
        this.setState({ firstname: event.target.value })
    }
    onLastNameChange = (event) => {
        this.setState({ lastname: event.target.value })
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    onCityNameChange = (event) => {
        this.setState({ city: event.target.value })
    }
    onStateNameChange = (event) => {
        this.setState({ state: event.target.value })
    }
    onCountryNameChange = (event) => {
        this.setState({ country: event.target.value })
    }
    onPincodeChange = (event) => {
        this.setState({ pincode: event.target.value })
    }
    OnMobileNoChange = (event) => {
        this.setState({ mobile: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onBusinessChange = (event) => {
        this.setState({ business: event.target.value })
    }

    onSubmitSignIn = () => {
        if (!this.state.firstname || !this.state.lastname || !this.state.business || !this.state.email || !this.state.city || !this.state.state || !this.state.country || !this.state.pincode || !this.state.mobile || !this.state.password) {
            this.setState({ error: 'Please fill in all the fields' });
            return;
        }
        fetch('http://localhost:3000/seller/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                pincode: this.state.pincode,
                mobile: this.state.mobile,
                business: this.state.business
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <div className="center" style={{ minHeight:'100vh' }}>
                <main className="">
                    <div className="measure">
                        <div id="sign_up" className="" style={{ minWidth: '100%', boxShadow: '0 0 255px rgba(0, 0, 0, 0.1)' }}>
                            <legend className="f1 fw6 ph0 mh0" style={{ fontSize: '1.7cm' }}>Register</legend>
                            <div className="mt3" style={{ padding: '0.4cm' }}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>First Name : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onFirstNameChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}> Last Name : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onLastNameChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}> Email : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>City : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onCityNameChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>State : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onStateNameChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>Country : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onCountryNameChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>Pincode : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onPincodeChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>Mobile No. : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.OnMobileNoChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>Password : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mt3"style={{padding: '0.4cm'}}>
                                <label className="db fw6 lh-copy f6" htmlFor="name" style={{ fontSize: '1cm' }}>Business name : </label>
                                <input style={{ fontSize: '1cm', borderColor: 'red' }}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onBusinessChange}
                                />
                            </div>
                        </div>
                        <div className="" style={{ cursor:'pointer', padding:'1cm' }}>
                            <input style={{ fontSize: '1cm', borderColor: 'red', cursor:'pointer' }}
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                        {this.state.error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-3 rounded">
                                <p style={{ fontSize: '1cm', color: 'red' }} className="f6 red">{this.state.error}</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;