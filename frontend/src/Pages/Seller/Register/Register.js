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
            business: '',
            error: '',
        };
    }

    onInputChange = (event, field) => {
        this.setState({ [field]: event.target.value });
    };

    onSubmitRegister = () => {
        const {
            firstname, lastname, business, email, city, state, country, pincode, mobile, password
        } = this.state;

        if (!firstname || !lastname || !business || !email || !city || !state || !country || !pincode || !mobile || !password) {
            this.setState({ error: 'Please fill in all the fields' });
            return;
        }

        fetch('http://localhost:3000/seller/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password, firstname, lastname, city, state, country, pincode, mobile, business
            }),
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
            .catch(() => this.setState({ error: 'Registration failed. Please try again.' }));
    };

    render() {
        const { onRouteChange } = this.props;
        const { error } = this.state;

        return (
            <div className="register-container">
                <main className="register-main">
                    <div className="register-form">
                        <h2 className="register-title">Register</h2>
                        {[
                            { label: 'First Name', field: 'firstname' },
                            { label: 'Last Name', field: 'lastname' },
                            { label: 'Email', field: 'email', type: 'email' },
                            { label: 'City', field: 'city' },
                            { label: 'State', field: 'state' },
                            { label: 'Country', field: 'country' },
                            { label: 'Pincode', field: 'pincode' },
                            { label: 'Mobile No.', field: 'mobile' },
                            { label: 'Password', field: 'password', type: 'password' },
                            { label: 'Business Name', field: 'business' }
                        ].map(({ label, field, type = 'text' }) => (
                            <div key={field} className="register-form-group">
                                <label className="register-label" htmlFor={field}>{label}:</label>
                                <input
                                    className="register-input"
                                    type={type}
                                    id={field}
                                    onChange={(event) => this.onInputChange(event, field)}
                                />
                            </div>
                        ))}
                        <button className="register-submit" onClick={this.onSubmitRegister}>
                            Register
                        </button>
                        <div className="signin-register-link" onClick={() => onRouteChange('signin')}>
                            Already have an account! Signin here
                        </div>
                        {error && (
                            <div className="register-error">
                                {error}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;
