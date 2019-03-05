import React, { Component } from 'react';
import './index.scss';
class Close extends Component {
    render() {
        const {size='0.53',color='#999'} = this.props;
        const style = {
            width: `${size}rem`,
            height: `${size}rem`,
            color:color,
            alignSelf: 'center',
            padding: '0.133rem',
        }
        return (
            <span className="close" style={style}></span>
        );
    }
}

export default Close;