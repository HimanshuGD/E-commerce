import React, { useState } from "react";

const Main = ({ userId }) => {
    const [productName, setProductName] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [url, setUrl] = useState('');
    const [prize, setPrize] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const onProductNameChange = (event) => {
        setProductName(event.target.value);
    }

    const onSellerNameChange = (event) => {
        setSellerName(event.target.value);
    }

    const onUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const onPrizeChange = (event) => {
        setPrize(event.target.value);
    }

    const onSubmitSignIn = () => {
        if (!productName || !sellerName || !url || !prize) {
            setError('Please fill in all the fields');
            return;
        }
        fetch('http://localhost:3000/products', {
            method: 'POST', // Corrected method
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: productName, // Corrected field names
                seller: sellerName,
                url: url,
                price: prize,
                sellerid: userId, // Assuming userId is the ID of the seller
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(response => {
                setSuccessMessage('Product added successfully');
                setProductName('');
                setSellerName('');
                setUrl('');
                setPrize('');
                setError('');
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError('Error adding product. Please try again.');
            });
    }


    return (
        <>
            <div className="Main" style={{ minHeight: '100vh' }}>
                <h1>Add your Products here!!!</h1>
                <div className="mt3" style={{ padding: '0.4cm' }}>
                    <label className="db fw6 lh-copy f6"
                        htmlFor="name"
                        style={{ fontSize: '1cm' }}>
                        Name of Product : </label>
                    <input style={{ fontSize: '1cm', borderColor: 'red' }}
                        className="bg-transparent hover-bg-black hover-white w-100"
                        onChange={onProductNameChange}
                        value={productName}
                    />
                </div>
                <div className="mt3" style={{ padding: '0.4cm' }}>
                    <label className="db fw6 lh-copy f6"
                        htmlFor="name"
                        style={{ fontSize: '1cm' }}>
                        Name of Seller : </label>
                    <input style={{ fontSize: '1cm', borderColor: 'red' }}
                        className="bg-transparent hover-bg-black hover-white w-100"
                        onChange={onSellerNameChange}
                        value={sellerName}
                    />
                </div>
                <div className="mt3" style={{ padding: '0.4cm' }}>
                    <label className="db fw6 lh-copy f6"
                        htmlFor="name"
                        style={{ fontSize: '1cm' }}>
                        Url of Product's image : </label>
                    <input style={{ fontSize: '1cm', borderColor: 'red' }}
                        className="bg-transparent hover-bg-black hover-white w-100"
                        onChange={onUrlChange}
                        value={url}
                    />
                </div>
                <div className="mt3" style={{ padding: '0.4cm' }}>
                    <label className="db fw6 lh-copy f6"
                       htmlFor="name"
                        style={{ fontSize: '1cm' }}>
                        Prize of your product : </label>
                    <input style={{ fontSize: '1cm', borderColor: 'red' }}
                        className="bg-transparent hover-bg-black hover-white w-100"
                        onChange={onPrizeChange}
                        value={prize}
                    />
                </div>
                {error &&
                    <div className="mt3" style={{ padding: '0.4cm', color: 'red' }}>
                        {error}
                    </div>
                }
                {successMessage &&
                    <div className="mt3" style={{ padding: '0.4cm', fontSize: '1cm', color: 'green' }}>
                        {successMessage}
                    </div>
                }
                <div className="" style={{ cursor: 'pointer', padding: '1cm' }}>
                    <input style={{ fontSize: '1cm', borderColor: 'red', cursor: 'pointer' }}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Add"
                        onClick={onSubmitSignIn}
                    />
                </div>
            </div>
        </>
    );
}

export default Main;



