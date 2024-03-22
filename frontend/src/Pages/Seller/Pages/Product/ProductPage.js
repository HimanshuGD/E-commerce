import React from 'react';
import { useLocation, useParams } from 'react-router-dom';


import './ProductPage.css';
const ProductPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Retrieve product information from URL parameters
    const name = searchParams.get('name');
    const url = searchParams.get('url');
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    console.log(name);
    console.log(url);
    console.log(email);
    return (
        <div className='productpage'>
            <h1>{name}</h1>
            <h1>{id}</h1>
            <img alt={name} src={url} style={{ width: '250px', height: 'auto', padding: '0.6cm' }} />
            <p>Email: {email}</p>
        </div>
    );
}

export default ProductPage;


//     const { name, imageUrl, email } = useParams();

//     return (
//         <div className='productpage'>
//             <h1>Namejdnfnjdnfjkandjfn</h1>
//             <h1>Name: {decodeURIComponent(name)}</h1>
//             <p>Email: {decodeURIComponent(email)}</p>
//             <img src={decodeURIComponent(imageUrl)} alt="Product" />
//             <img src={imageUrl} alt={name} />
//             <p>Email: {email}</p>
//         </div>
//     );
// }

// export default ProductPage;
