import React, { Component } from 'react';
import './index.scss'
class ImageCode extends Component {
    render() {
        const {placeholder,errmsg,imgSrc,clickCb=()=>null,changeCb=()=>null,blurCb=()=>null,transStyle={},transVal=''} = this.props;
        return (
            <div className="image-code" style={transStyle}>
              <div className="left">
                  <input className="sminput" value={transVal} type="text" maxLength="4" onBlur={blurCb} onChange={changeCb} placeholder={placeholder}/>
                  <span className="errmsg">{errmsg}</span>
              </div>
              <div className="right">
                  <img src={imgSrc} onClick={clickCb} alt=""/>
                  {/* <button disabled>39S</button> */}
              </div>
          </div>
        );
    }
}

export default ImageCode;