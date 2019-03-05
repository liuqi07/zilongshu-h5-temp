import React from 'react'
import './index.scss'

export default class extends React.Component {

  render() {
    const { title, subTitle, href } = this.props
    return (
      <div className="introduce-banner-container">
        <p className="title">{title}</p>
        <p className="sub-title">{subTitle}</p>
        <a className="subscribe-btn" href={href} >免费试听</a>
      </div>
    )
  }
}