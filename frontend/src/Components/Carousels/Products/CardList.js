import React from 'react';
import Card from './Card';

const CardList = ({ products, userId }) => {
    return (
        <div className="card-list">
            {products.map(product => (
                <Card
                    key={product.id}
                    id={product.id}
                    userId={userId}
                    name={product.nameofproduct}
                    seller={product.nameofseller}
                    url={product.url}
                    prize={product.prize}
                />
            ))}
        </div>
    );
}

export default CardList;
