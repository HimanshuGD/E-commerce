import React, {useState, useEffect} from 'react';
import Card from './Card';


const CardList = ({products, userId}) => {

    return (
        <div style={{ display:'flex',  flexWrap:'wrap', justifyContent:'center' }} >
            {products.map((product, i) => {
                const modifiedUrl = `${product.url}/${i}`;
                return (
                    <>
                        <Card
                            id={products[i].id}
                            userId={userId} 
                            name={products[i].nameofproduct}
                            seller={products[i].nameofseller}
                            url={products[i].url}
                            prize={products[i].prize}
                            onClick={() => window.open(modifiedUrl, '_blank')}
                        />
                    </>
                );
            })}
        </div>
    );
}

export default CardList;

