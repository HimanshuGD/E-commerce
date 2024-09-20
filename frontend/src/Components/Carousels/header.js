import React from "react";

export default function Heading({ text }) {
    return (
        <h1 className="mb-4 mt-4 text-[2.85rem] text-center font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl lg:text-6xl">
            {text}
        </h1>
    );
}
