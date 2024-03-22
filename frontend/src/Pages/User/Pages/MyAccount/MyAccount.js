import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './MyAccount.css'; 
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo192.png';

function MyAccount() {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [error, setError] = useState(null);
    let { userId } = useParams();

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
        <>
        <h1>userId : {userId}</h1>
        {/* <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt='' 
              style={{ width: '2cm', display: 'flex', 
                justifyContent: 'left', padding: '1cm' }} 
        />
        </Link> */}
        <div>
        <div className="my-account-container">
            {error ? (
                <p className="error-message">{error}</p>
            ) : userData ? (
                <div className="user-info">
                    <h1> User Information</h1>
                    <div className="user-field">
                        <label> <strong>Email : </strong></label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editedData.email}
                                    onChange={(e) => handleChange(e, "email")}
                                />
                            ) : (
                                <span>{userData.email}</span>
                            )}
                        <button className="edit-btn" onClick={() => handleEdit('email')}>Edit</button>
                    </div>
                        <div className="user-field">
                            <label><strong>First Name : </strong></label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editedData.firstname}
                                    onChange={(e) => handleChange(e, "firstname")}
                                />
                            ) : (
                                <span>{userData.firstname}</span>
                            )}
                            <button onClick={() => handleEdit("firstname")}>Edit</button>
                        </div>
                        <div className="user-field">
                            <label><strong>Last Name : </strong></label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editedData.lastname}
                                    onChange={(e) => handleChange(e, "lastname")}
                                />
                            ) : (
                                <span>{userData.lastname}</span>
                            )}
                            <button onClick={() => handleEdit("lastname")}>Edit</button>
                        </div>
                        <div className="user-field">
                            <label><strong>Mobile : </strong></label>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editedData.mobile}
                                    onChange={(e) => handleChange(e, "mobile")}
                                />
                            ) : (
                                <span>{userData.mobile}</span>
                            )}
                        <button onClick={() => handleEdit('mobile')}>Edit</button>
                    </div>
                    {editing && (
                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                    )}
                    <h1 style={{ fontSize: '2cm' }}> Delete your Account </h1>
                    <p style={{ fontSize: '0.8cm' }}>You sure you want to delete your account?</p>
                    <button className="delete-btn" onClick={handleDeleteAccount}>
                        <a href='/'> Delete Account</a>
                    </button>
                </div>
            ) : (
                <p className="loading-message">Loading...</p>
            )}
            </div>
        </div>
        </>
    );
}

export default MyAccount;

