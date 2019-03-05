import React, { Component } from "react"
import { Link } from "react-router-dom"
import nodata from "./images/nodata.png"
import { screenHeight } from 'libs/utils';
import "./index.scss"
class NoData extends Component {
  render() {
    const { tip, linkTo='/index/free-course-list' } = this.props
    return (
      <div className="nodata" style={{minHeight:screenHeight()}}>
        <img src={nodata} alt="" />
        <p className="notice">
          {tip}，<Link to={linkTo}>立即免费试听</Link>
        </p>
      </div>
    )
  }
}

export default NoData
