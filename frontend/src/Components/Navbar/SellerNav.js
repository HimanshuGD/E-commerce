import React, { useState } from 'react';
import logo from '../../assets/logo192.png';
import { FaChevronDown } from 'react-icons/fa';
import Dropdown from './SellerDrop';
import { Link } from 'react-router-dom';

const Navigation = ({ userId, onRouteChange, isSignedIn }) => {
    const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
            setDropdown(true);
        } else {
            setDropdown(true);
        }
    };

    const onMouseLeave = () => {
        if (window.innerWidth > 960) {
            setDropdown(false);
        } else {
            setDropdown(false);
        }
    };

    const handleDropDownClick = (e) => {
        e.stopPropagation();
        setDropdown(!dropdown);
    };

    if (isSignedIn) {
        return (
            <div className='navbar'>
                <nav className="bg-gray-800 p-4 flex justify-between items-center" style={{ backgroundColor: '#045682' }} >
                    <img className="mr-3 mb-3" alt='' src={logo} style={{ width: '3cm', padding: '0.3cm', }} />
                    <nav className='flex' style={{ justifyContent: 'flex-end', flex: '1', padding: '1cm' }} >
                        <p onClick={() => onRouteChange('signout')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ fontSize: '0.7cm', paddingRight: '0.3cm', cursor: 'pointer' }}>
                            <Link className='mycart' 
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                            to={`/AddProduct/${userId}`}>
                                <strong>Add Product</strong>
                            </Link>
                        </p>
                        <p className="block py-2 px-4 text-white text-lg font-bold font-serif hover:bg-gray-700 rounded-lg cursor-pointer relative"
                            style={{ fontSize: '0.7cm', cursor: 'pointer' }}
                            onClick={handleDropDownClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}>
                            <strong>Profile</strong>
                            <FaChevronDown className="inline w-3 h-4 mt-1 ml-2 transition-transform" />
                            {dropdown && <Dropdown userId={userId} />}
                        </p>
                    </nav>
                </nav>
            </div>
        );
     } else {
        return (
            <div className='nav2'>
                <nav style={{ display: 'flex', backgroundColor: '#045682' }} >
                    <img className="mr3 mb3" src={logo} alt='' style={{ display: 'flex', width: '3cm', padding: '0.3cm' }} />
                    <nav className='flex' style={{ justifyContent: 'flex-end', }} >
                        <p onClick={() => onRouteChange('signin')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ fontSize: '0.7cm', paddingRight: '0.3cm', cursor: 'pointer' }}>
                            Sign In
                        </p>
                        <p onClick={() => onRouteChange('register')}
                            className='f3 link dim black underline pa3 pointer'
                            style={{ fontSize: '0.7cm', paddingRight: '0.3cm', cursor: 'pointer' }} >
                            Register
                        </p>
                    </nav>
                </nav>
            </div>
        );
    }
}

export default Navigation;

