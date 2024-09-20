import React, { useState, useEffect } from "react";
import CardList from '../../../../Components/Carousels/Products/CardList';
import SearchBox from '../../../../Components/Carousels/SearchBox';
import Scroll from '../../../../Components/Carousels/Scroll';
import './Main.css';

const Main = ({ userId }) => {
    const [searchfield, setSearchfield] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        setFilteredProducts(products.filter(product =>
            product.nameofproduct?.toLowerCase().includes(searchfield.toLowerCase())
        ));
    }, [searchfield, products]);

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    };

    return (
        <div className='main-container'>
            <header className='main-header'>
                <h1 className='main-title'>Product Catalog</h1>
                <p className='main-subtitle'>Just start searching, products will be visible!</p>
            </header>
            <div className='search-container'>
                <SearchBox searchChange={onSearchChange} />
            </div>
            <Scroll>
                <CardList userId={userId} products={filteredProducts} />
            </Scroll>
        </div>
    );
}

export default Main;
