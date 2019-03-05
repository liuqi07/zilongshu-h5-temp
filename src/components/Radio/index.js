import React, { Component } from 'react';
import './index.scss'
class Checkbox extends Component {
    
    render() {
        const {label,ischecked,rId,Rname,Rvalue,clickCb,changeCb}=this.props;
        return (
            <label className="raido-container" htmlFor={rId} onClick={clickCb}><span>{label}</span><input id={rId} name={Rname} checked={ischecked} onChange={()=>changeCb(Rvalue)} value={Rvalue} type="radio"/><em><i></i></em></label>
        );
    }
}

export default Checkbox;