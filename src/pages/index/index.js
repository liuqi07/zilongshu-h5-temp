import React from 'react'
// import TabBar from './component/TabBar'
import renderRoutes from 'libs/routes';
import { NavLink } from 'react-router-dom'
import './index.scss'

class Index extends React.Component {

  render() {
    return (
      <div className="index-container">
        <div className="main-container">
          {renderRoutes('/index')}
        </div>
        <div className="bottom-placeholder"></div>
        <div className='tab-bar'>
          <NavLink className="menu-item" to="/index/home">
            <span className="iconfont-zilongshu icon-zilong-school"></span>
            <span className="item-text">首页</span>
          </NavLink>
          <NavLink className="menu-item" to="/index/course">
            <span className="iconfont-zilongshu icon-zilong-suishishangke"></span>
            <span className="item-text">上课</span>
          </NavLink>
          <NavLink className="menu-item" to="/index/mine">
            <span  className="iconfont-zilongshu icon-zilong-xuesheng"></span>
            <span className="item-text">我</span>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Index