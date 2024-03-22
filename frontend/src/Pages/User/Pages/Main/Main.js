import React, { useState, useEffect } from "react";
import CardList from '../../../../Components/Carousels/Products/CardList';
import SearchBox from '../../../../Components/Carousels/SearchBox';
import Scroll from '../../../../Components/Carousels/Scroll';
// import { products } from '../../../../Components/Carousels/Products/Products';

import './Main.css';

const Main = ({ userId }) => {
    const [searchfield, setSearchfield] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const[products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        setFilteredProducts(products.filter(product => product.nameofproduct?.toLowerCase().includes(searchfield.toLowerCase())));
    }, [searchfield]);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    return (
        <div className='tc' >
            <h1 className='f1'>Product Catalog</h1>
            <h1> Just start searching, products will be visible !!! </h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <CardList userId={userId} products={filteredProducts} />
            </Scroll>
        </div>
    );
}

export default Main;
