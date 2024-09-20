import React from 'react';

function BigView({ email, id, name, onClose }) {
    return (
        <div className="big-view-container">
            <div className="big-view-card">
                <h2>{name}</h2>
                <p>{email}</p>
                <p>Price: ${id}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default BigView;

