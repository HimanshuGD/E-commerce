import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div style={{ backgroundColor:'white' }} >
            <h1> successfull</h1>
            <hr>
            </hr>
            <Link to='/'>Click me</Link>
        </div>
    );
}

