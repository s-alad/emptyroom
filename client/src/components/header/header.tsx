import React from 'react';
import './header.css';

function Header() {
    return (
        <div className="header">
            <div className="line"></div>
            <div className='content'>
                <h1>openclass</h1>
                <div className='space'></div>
                <h2>map</h2>
                <h2>about</h2>
            </div>
        </div>
    );
}

export default Header;