import React, { useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 2rem;
`;

const Form = styled.form`
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #343a40;
`;

const Label = styled.label`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #495057;
    display: block;
`;

const Input = styled.input`
    font-size: 1rem;
    padding: 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 1.5rem;
    &:focus {
        border-color: #61dafb;
        outline: none;
        box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.5);
    }
`;

const Button = styled.button`
    font-size: 1rem;
    padding: 0.75rem;
    background-color: #61dafb;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #21a1f1;
    }
`;

const Message = styled.div`
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    text-align: center;
`;

const ErrorMessage = styled(Message)`
    background-color: #f8d7da;
    color: #721c24;
`;

const SuccessMessage = styled(Message)`
    background-color: #d4edda;
    color: #155724;
`;

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

    const onSubmit = () => {
        if (!productName || !sellerName || !url || !prize) {
            setError('Please fill in all the fields');
            return;
        }
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: productName,
                seller: sellerName,
                url: url,
                price: prize,
                sellerid: userId,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(() => {
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
        <MainContainer>
            <Form>
                <Title>Add Your Products </Title>
                <Label htmlFor="product-name">Name of Product</Label>
                <Input
                    type="text"
                    id="product-name"
                    onChange={onProductNameChange}
                    value={productName}
                />
                <Label htmlFor="seller-name">Name of Seller</Label>
                <Input
                    type="text"
                    id="seller-name"
                    onChange={onSellerNameChange}
                    value={sellerName}
                />
                <Label htmlFor="product-url">URL of Product's Image</Label>
                <Input
                    type="text"
                    id="product-url"
                    onChange={onUrlChange}
                    value={url}
                />
                <Label htmlFor="product-price">Price of Your Product</Label>
                <Input
                    type="text"
                    id="product-price"
                    onChange={onPrizeChange}
                    value={prize}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                <Button type="button" onClick={onSubmit}>
                    Add Product
                </Button>
            </Form>
        </MainContainer>
    );
}

export default Main;
