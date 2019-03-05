import React, { Component } from 'react';
import './index.scss'
class Checkbox extends Component {
    render() {
        const {label,ischecked,changeCb}=this.props;
        return (
            <label className="checkbox-container" htmlFor="checkbox"><input checked={ischecked} onChange={()=>changeCb(!ischecked)} value="123" id="checkbox" type="checkbox"/><em><i></i></em><span>{label}</span></label>
        );
    }
}

export default Checkbox;