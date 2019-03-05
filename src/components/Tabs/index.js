import React from 'react'
import './index.scss'

/**
 * 
  tabs: [
    { title: '全部课程', active: 'active', type: 'all' },
    { title: '英语', active: '' },
    { title: '数学', active: '' },
    { title: '编程', active: '' },
  ]

  // 切换tab
  changeTab = (e) => {
    const tabIndex = e.target.dataset.tabIndex
    const { tabs } = this.state
    tabs.map((tab, index) => {
      tab.active = tabIndex == index ? 'active' : ''
    })
    this.setState({ tabs })
  }
 */

class Tabs extends React.Component {

  render() {
    const { tabs, changeTab } = this.props
    return(
      <div className="tab-container" onClick={changeTab}>
        {
          tabs.map((tab, index) => (
            <span
              className={`tab-item ${tab.active} ${tab.type}`}
              data-tab-index={index}
              key={index}
            >
              {tab.title}
            </span>
          ))
        }
      </div>
    )
  }
}

export default Tabs