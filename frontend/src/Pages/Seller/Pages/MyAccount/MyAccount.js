import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './MyAccount.css';
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
                const response = await fetch(`http://localhost:3000/seller/profile/${userId}`);
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

    if (error) {
        return <div style={{ minHeight:'100vh', fontSize:'2cm', padding:'2cm' }}>Error: {error}</div>;
    }

    if (!userData) {
        return <div style={{ minHeight: '100vh', fontSize: '2cm', padding: '2cm' }}>Loading...</div>;
    }

    const handleEdit = (field) => {
        setEditing(true);
        setEditedData({ ...editedData, [field]: userData[field] });
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

    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={logo} alt='' style={{ width: '5cm', display: 'flex', justifyContent: 'left', padding: '1cm' }} />
                </Link>
                <div>
                    <div className="my-account-container" style={{ minHeight: '100vh' }}>
                        {error ? (
                            <div style={{ minHeight: '100vh' }}>
                                <div style={{ minHeight:'100vh' }}>
                                    <p className="error-message">{error}</p>
                                </div>
                            </div>
                        ) : userData ? (
                            <div className="user-info" style={{ minHeight: '100vh' }}>
                                <h1 style={{ fontSize:'2cm' }}> User Information</h1>
                                <div className="user-field">
                                    <label><strong>First Name : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.firstname}
                                            onChange={(e) => handleChange(e, "firstname")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.firstname}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("firstname")}>Edit</button>
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
                                        <span style={{ padding: '20px' }}>{userData.lastname}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("lastname")}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label> <strong>Email : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.email}
                                            onChange={(e) => handleChange(e, "email")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.email}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit('email')}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label><strong>Business : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.business}
                                            onChange={(e) => handleChange(e, "business")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.business}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("business")}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label><strong>City : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.city}
                                            onChange={(e) => handleChange(e, "city")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.city}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("city")}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label><strong>State : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.state}
                                            onChange={(e) => handleChange(e, "state")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.state}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("state")}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label><strong>Country : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.country}
                                            onChange={(e) => handleChange(e, "country")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.country}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("country")}>Edit</button>
                                </div>
                                <div className="user-field">
                                    <label><strong>Pincode : </strong></label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            value={editedData.pincode}
                                            onChange={(e) => handleChange(e, "pincode")}
                                        />
                                    ) : (
                                        <span style={{ padding: '20px' }}>{userData.pincode}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit("pincode")}>Edit</button>
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
                                        <span style={{ padding: '20px' }}>{userData.mobile}</span>
                                    )}
                                    <button className="edit-btn" onClick={() => handleEdit('mobile')}>Edit</button>
                                </div>
                                
                                {editing && (
                                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                                )}
                                <h1 style={{ fontSize: '2cm' }}> Delete your Account </h1>
                                <p style={{ fontSize:'0.8cm' }}>You sure you want to delete your account?</p>
                                <button className="delete-btn" onClick={handleDeleteAccount}>
                                    <a href='/'> Delete Account</a></button>
                            </div>
                        ) : (
                            <div style={{ minHeight: '100vh' }}>
                                <p className="loading-message">Loading...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyAccount;

