// src/components/js/Header.js
import React from 'react';
import '../css/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo"><img src="http://localhost/ridgelinemountaineers/src/components/assets/logo/logo1.png" height="60px"/></div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/trips">Treks</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/contactus">Contact Us</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
