import React from 'react'
import Helmet from 'react-helmet'
import './index.scss'

export default class extends React.Component {

  render() {
    return (
      <div>
        <Helmet title="龙编程" />
        <h1 style={{width: '100%', textAlign: 'center'}}>龙编程</h1>
      </div>
    )
  }
}