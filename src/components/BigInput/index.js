import React, { Component } from 'react';
import './index.scss'
class SendMessage extends Component {
    
    render() {
        const {placeholder,errormsg,changeCb,blurCb,maxlength=30,type="text",transVal=''} = this.props;
        return (
            <p className="biginput-container">
                <input className="phoneNum" value={transVal} type={type} maxLength={maxlength}  onChange={changeCb} onBlur={blurCb} placeholder={ placeholder }/>
                <span className="errmsg">{errormsg}</span>
            </p>
        );
    }
}

export default SendMessage;