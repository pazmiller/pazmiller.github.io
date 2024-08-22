import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1>My Personal Website</h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/portfolio">Portfolio</Link></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
