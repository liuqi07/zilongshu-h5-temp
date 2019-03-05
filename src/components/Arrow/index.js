import React, { Component } from 'react';
class Arrow extends Component {
    render() {
        const {direction='right',size=0.32,color='#999999'}=this.props;
        const style = {
            marginLeft: `${direction==='left'?size/2:0}rem`,
            marginRight: `${direction==='left'?0:size/2}rem`,
            display: 'inline-block',
            width: `${size}rem`,
            height: `${size}rem`,
            borderTop: `2px solid ${color}`,
            borderLeft: `2px solid ${color}`,
            transform: `rotate(${direction==='left'?-45:135}deg)`,
        }
        return (
            <span style={style}></span>
        );
    }
}

export default Arrow;