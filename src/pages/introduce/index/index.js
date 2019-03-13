import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tabs, IntroduceBanner } from 'components'
import renderRoutes from 'libs/routes';
import * as util from 'libs/utils'
import './index.scss'
import Swiper from '../components/swiper/'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      tabs: util.introduceTabList(),
      bannerCopyWriter: { title: '看多彩世界？先学英语！', subTitle: 'see the world ? learn english first !', href: '#/index/free-course-list' },
    }
  }

  componentDidMount() {
    const type = this.props.location.pathname.split('/')[2]
    const { tabs } = this.state
    let tabIndex = null
    switch(type) {
      case 'english':
        tabIndex = 0
        break
      case 'math':
        tabIndex = 1
        break
      case 'program':
        tabIndex = 2
        break
    }
    tabs.map((tab, index) => {
      tab.active = tabIndex == index ? 'active' : ''
    })
    this.setState({ tabs, tabIndex })
  }

  // 切换tab
  changeTab = (e) => {
    const { tabs, tabIndex } = this.state
    const _tabIndex = e.target.dataset.tabIndex
    if(!_tabIndex) return;
    if(tabIndex == _tabIndex) return;
    tabs.map((tab, index) => {
      tab.active = _tabIndex == index ? 'active' : ''
    })
    const { path, intro_title: title, intro_sub_title: subTitle, href } = tabs[_tabIndex]
    this.setState({
      tabs, tabIndex: _tabIndex,
      bannerCopyWriter: { title, subTitle, href }
    }, this.props.history.push(path))
  }

  render() {
    const { tabs, bannerCopyWriter } = this.state
    const { title, subTitle, href } = bannerCopyWriter
    return (
      <div className="introduce-container">
        <div className="swiper-container">
          <Swiper />
        </div>
        <Tabs tabs={tabs} changeTab={this.changeTab} />
        <div className="main-conteiner">
          {renderRoutes('/introduce')}
        </div>
      </div>
    )
  }
}