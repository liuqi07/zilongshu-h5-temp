import React from 'react'
import './index.scss'

export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      initPoint: 0,
    }
  }
  componentDidMount() {
    const { initPoint=0 } = this.props
    this.setState({ initPoint }, this.increaseProgress)
  }

  timer = null

  increaseProgress = () => {
    this.timer = setInterval(() => {
      const { initPoint } = this.state
      if(initPoint>=100){
        clearInterval(this.timer)
        this.timer = null
      }else {
        this.setState({ initPoint: initPoint+5})
      }
    }, 150);  
  }

  render() {
    const { initPoint } = this.state
    return (
      <div className="progress-bar-comp">
        <p>超过答题时间进入下一题</p>
        <div className="out-line">
          <span className="in-line" style={{width: `${initPoint}%`}}></span>
        </div>
      </div>
    )
  }
}