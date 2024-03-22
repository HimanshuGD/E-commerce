import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
    return (
        <div style={{padding:'1cm'}} className='pa2'>
            <input
                style={{ fontSize:'0.8cm', width:'12cm', color:'green', padding:'0.3cm' }}
                className='pa3 ba b--green bg-lightest-blue'
                type='search'
                placeholder='search products'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;
