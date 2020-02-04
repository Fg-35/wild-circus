import React from 'react';
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar-header mob-12 tab-12 dsk-12 mx-auto bgcolor1">
            <Link to="/">
                <img className="logo mob-6 tab-6 dsk-6" src="./logo.png" />
            </Link>
        </div>
    )
};

export default Navbar;