import React, { Component } from 'react';
import bg1 from './images/bg1.png';
import logo from './images/logo.png';
import './index.scss'
class register extends Component {
    render() {
        return (
            <div className="register-banner">
                <img className="banner-bg" src={bg1} alt=""/>
                <div className="banner-content">
                    <img src={logo} alt=""/>
                    <div>
                        <h1>改变世界？从学习开始</h1>
                        <h2>CHANGE THE WORLD, LEARN FIRST!</h2>
                        <h3>-免费试听-</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default register;