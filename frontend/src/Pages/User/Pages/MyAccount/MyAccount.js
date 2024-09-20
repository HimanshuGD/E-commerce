import React, { useState, useEffect } from 'react';
import './MyAccount.css';

function MyAccount({ userId }) {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/buyer/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleEdit = (field) => {
        setEditing(true);
        setEditedData({ ...editedData, [field]: userData[field] });
    };

    const handleChange = (e, field) => {
        setEditedData({ ...editedData, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3000/buyer/profile/${userId}`, {
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
            const response = await fetch(`http://localhost:3000/buyer/profile/${userId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete account");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="my-account-page">
            <header className="header">
                <h1 className="page-title">My Account</h1>
            </header>
            <div className="my-account-container">
                {error && <p className="error-message">{error}</p>}
                {userData ? (
                    <div className="account-info">
                        <h2>User Information</h2>
                        {['email', 'firstname', 'lastname', 'mobile'].map(field => (
                            <div key={field} className="account-field">
                                <label><strong>{`${field.charAt(0).toUpperCase() + field.slice(1)}:`}</strong></label>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={editedData[field]}
                                        onChange={(e) => handleChange(e, field)}
                                    />
                                ) : (
                                    <span>{userData[field]}</span>
                                )}
                                <button className="edit-btn" onClick={() => handleEdit(field)}>Edit</button>
                            </div>
                        ))}
                        {editing && (
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        )}
                        <h2>Delete Your Account</h2>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                ) : (
                    <p className="loading-message">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default MyAccount;
