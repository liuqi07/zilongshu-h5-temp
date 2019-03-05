import React from 'react'
import './index.scss'

export default class extends React.Component {

  render() {
    const { isShow=false, closeDialog, cont } = this.props
    return (
      <div className="dialog-container" style={{display: `${isShow ? 'block' : 'none' }`}}>
        <div className="dialog-wrap">
          <p className="title">{cont}</p>
          <a className="ok-btn" onClick={closeDialog} >我知道啦</a>
        </div>
        <div className="mask"></div>
      </div>
    )
  }
}