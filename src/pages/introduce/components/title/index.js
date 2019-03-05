import React from 'react'
import './index.scss'

export default class extends React.PureComponent {

  render() {
    return (
      <div className="comp-title">{this.props.title}</div>
    )
  }
}