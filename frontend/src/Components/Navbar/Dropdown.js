import React, { useState } from "react";
import "./Dropdown.css";
import { Link } from "react-router-dom";

function Dropdown({ userId, onRouteChange, isSigned }) {
    const [click, setClick] = useState(false);
    
    const handleClick = () => {
        if (window.innerWidth <= 768) {
            setClick(!click);
        }
    };

    const handleHover = () => {
        if (window.innerWidth > 768) {
            setClick(!click);
        }
    };
    return (
        <>
            <ul
                onClick={handleClick}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                className={click ? "dropdown-menu mobile-view" : "dropdown-menu"}
            >
                <li>
                    <Link className="myaccount"
                      style={{ textDecoration: 'none', color: 'inherit' }} 
                      onClick={() => onRouteChange('myaccount')}
                      to={`/MyAccount/${userId}`}
                    >
                        <strong>My Account : {userId}</strong>
                    </Link>
                </li>
                <li>
                    <Link className="sign-out" style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                        <strong>Sign Out</strong>
                    </Link>
                </li>
            </ul>
        </>
    );
}

export default Dropdown;



