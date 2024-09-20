import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer bg-gray-800">
            <div className="mx-auto p-4 md:flex md:items-center md:justify-between">
                <span className="text-xl font-bold text-gray-500 sm:text-center dark:text-gray-400">
                    &copy; 2023-2024 {"  "}
                    <Link to="" className="hover:underline ">
                        Himanshu
                    </Link>
                    . All Rights Reserved.
                </span>
                
            </div>
        </footer>
    );
}
