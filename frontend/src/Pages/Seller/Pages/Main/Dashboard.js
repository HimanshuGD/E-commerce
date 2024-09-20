import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate('/signin'); 
    };

    return (
        <div className="dashboard-container">
            <main className="dashboard-main">
                <div className="dashboard-content">
                    <div className="dashboard-section">
                        <h2>Welcome, Seller!</h2>
                        <p>Here you can manage your store, view orders, and more.</p>
                    </div>
                    <div className="dashboard-navigation">
                        <Link className="dashboard-nav-link" >Manage Products</Link>
                        <Link className="dashboard-nav-link" >View Orders</Link>
                        <Link className="dashboard-nav-link" >Profile</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
