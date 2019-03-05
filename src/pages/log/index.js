import React from 'react'
import Helmet from 'react-helmet'
import { List } from 'antd-mobile'
import './index.scss'
const Item = List.Item

export default class extends React.Component {

  render() {
    const viewport = document.querySelector('meta[name="viewport"]').getAttribute('content')
    const userAgent = window.navigator.userAgent
    const devicePixelRatio = window.devicePixelRatio
    const html = document.querySelector('html')
    const htmlDpr = html.getAttribute('data-dpr')
    const htmlStyle = html.getAttribute('style')
    return (
      <div className="log-container">
        <Helmet title="日志" />
        <List>
          <Item extra="机型信息" multipleLine align="top" wrap>{userAgent}</Item>
          <Item extra="viewport" wrap>{viewport}</Item>
          <Item extra="devicePixelRatio" wrap>{devicePixelRatio}</Item>
          <Item extra="dom-html dpr" wrap>{htmlDpr}</Item>
          <Item extra="dom-html font-size" wrap>{htmlStyle}</Item>
        </List>
        <div className="px_test">
          <div className="line px_1">1px</div>
          <div className="line px_05">0.5px</div>
          <div className="line PX_1">1PX</div>
          <div className="line PX_05">0.5PX</div>
          <div className="line rem_1">1px转rem</div>
          <div className="line rem_05">0.5px转rem</div>
        </div>
      </div>
    )
  }
}