import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss'
/**
 *
 *
 * @class SuccessNotice
 * @extends {Component}
 * props:{
 *  text:String-提示信息
 *  btnTest:String-按钮文字
 *  link:String-跳转信息
 *  show:Boolean-是否显示
 * }
 */
class SuccessNotice extends Component {
    render() {
        const {text,btnTest,link,show} = this.props;
        return (
            show && <div className="mask">
                <div className="success-notice">
                    <h1>{text}</h1>
                    <Link to={link}>{btnTest}</Link>
                </div>   
            </div>
        );
    }
}

export default SuccessNotice;