import React, { Component } from 'react';
import './index.scss'
class SendMessage extends Component {
    render() {
        const {placeholder,errmsg,changeCb,clickCb,isDisabled,blurCb,seconds='发送验证码',transStyle={},transVal=''} = this.props;
        return (
            <div className="send-message" style={transStyle}>
              <div className="left">
                  <input className="sminput" type="tel" value={transVal} onChange={changeCb} maxLength="6" onBlur={blurCb} placeholder={placeholder}/>
                  <span className="errmsg">{errmsg}</span>
              </div>
              <div className="right">
                  <button onClick={clickCb} disabled={isDisabled}>{seconds}</button>
                  {/* <button disabled>39S</button> */}
              </div>
          </div>
        );
    }
}

export default SendMessage;