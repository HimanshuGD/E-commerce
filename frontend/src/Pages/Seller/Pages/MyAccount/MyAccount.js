import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './MyAccount.css';
import logo from '../../../../assets/logo192.png';

function MyAccount({ userId }) {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/seller/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
                setEditedData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleChange = (e, field) => {
        setEditedData({ ...editedData, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/seller/profile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedData),
            });
            if (!response.ok) {
                throw new Error("Failed to update user data");
            }
            setUserData(editedData);
            setEditing(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(`http://localhost:3000/seller/profile/${userId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete account");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!userData) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="my-account-container">
            <Link to="/" className="logo-link">
                <img src={logo} alt='logo' className="logo-image" />
            </Link>
            <div className="user-info">
                <h1 className="section-title">User Information</h1>
                {['firstname', 'lastname', 'email', 'business', 'city', 'state', 'country', 'pincode', 'mobile'].map((field) => (
                    <div className="user-field" key={field}>
                        <label className="field-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        {editing ? (
                            <input
                                type="text"
                                className="field-input"
                                value={editedData[field]}
                                onChange={(e) => handleChange(e, field)}
                            />
                        ) : (
                            <span className="field-value">{userData[field]}</span>
                        )}
                    </div>
                ))}
                {editing ? (
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                ) : (
                    <button className="edit-btn" onClick={handleEditToggle}>Edit</button>
                )}
            </div>
            <div className="delete-account">
                <h1 className="section-title">Delete Your Account</h1>
                <p className="delete-warning">Are you sure you want to delete your account?</p>
                <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        </div>
    );
}

export default MyAccount;
