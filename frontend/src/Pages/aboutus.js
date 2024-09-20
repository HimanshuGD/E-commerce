import React from "react";
import Footer from '../Components/Carousels/footer';
import {Link} from 'react-router-dom';
import logo from '../assets/logo192.png';

function AboutUs() {
    return (
        <>
            <header>
                <div className="logo" style={{paddingLeft: '43%'}}>
                    <Link to="/" className="nav-item">
                        <img src={logo} alt="Logo" />
                        <strong style={{color: 'black'}}>MyShop</strong>
                    </Link>
                </div>
            </header>

            <main>
                <p style={{ padding: '20px', justifyContent: 'center'}}>
                    MyShop is an Ecommerce website project, an e-commerce platform 
                    built with React for the frontend, Node.js and Express for the backend, 
                    and PostgreSQL as the database. The website offers two login options: 
                    user and seller. Upon logging in as a user, a product list is displayed 
                    with search functionality, the ability to add items to the cart, adjust 
                    quantities, and modify the user profile. Sellers can log in to add products, 
                    which are then included in the product list for users to browse and purchase.
                </p>
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default AboutUs;
