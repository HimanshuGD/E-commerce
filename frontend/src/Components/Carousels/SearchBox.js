import React from 'react';

const SearchBox = ({ searchChange }) => {
    const searchBoxContainerStyle = {
        padding: '1rem',
        textAlign: 'center'
    };

    const searchBoxInputStyle = {
        fontSize: '1rem',
        width: '300px',
        color: '#006400', // Dark green
        padding: '0.5rem',
        border: '2px solid #006400', // Dark green
        borderRadius: '4px',
        backgroundColor: '#f0f8ff' // Lightest blue
    };

    return (
        <div style={searchBoxContainerStyle}>
            <input
                style={searchBoxInputStyle}
                type="search"
                placeholder="Search products"
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;
