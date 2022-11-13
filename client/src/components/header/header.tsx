import React from 'react';
import './header.css';

import logo from '../../assets/openclass.png';

function Header() {
    return (
        <div className="header">
            <div className="line"></div>
            <div className='content'>
                <img src={logo}/>
                <h1>emptyroom</h1>
                <div className='space'></div>
                <a href='https://github.com/s-alad/emptyroom' target='blank'><h2>about</h2></a>
            </div>
        </div>
    );
}

export default Header;