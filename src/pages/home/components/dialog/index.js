import React from 'react'
import './index.scss'

export default class extends React.Component {

  render() {
    const { isShow=false, okLink, linkTo } = this.props
    return (
      <div className="dialog-container" style={{display: `${isShow ? 'block' : 'none' }`}}>
        <div className="dialog-wrap">
          <p className="title">您的预约已提交</p>
          <p className="sub-title">点击“<a href={linkTo} >我-我的预约</a>”查看预约进度</p>
          <a className="ok-btn" href={okLink} >我知道啦</a>
        </div>
        <div className="mask"></div>
      </div>
    )
  }
}