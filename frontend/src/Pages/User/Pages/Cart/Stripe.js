import React, { useState, useEffect } from "react";




export default function Stripe( { price } ) {
    const [message, setMessage] = useState("");


    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    const Message = ({ message }) => (
        <section>
            <p>{message}</p>
        </section>
    );

    const ProductDisplay = () => (
        <div style={{ paddingBottom: '2cm' }} >
            <section>
                <form action="/create-checkout-session" method="POST">
                    <button type="submit">
                        Checkout
                    </button>
                </form>
            </section>
        </div>
    );
    
    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}

