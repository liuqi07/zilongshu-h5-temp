import React from 'react'
import './index.scss'

export default class extends React.Component {

  render() {
    const { videoUrl, show, onClose } = this.props

    return (
      <div className="media-player-comp" style={{ display: `${show ? 'inline-block' : 'none'}` }}>
        <span
          className="icon iconfont-zilongshu icon-zilong-close-circle"
          onClick={onClose}>
        </span>
        <div className="video">
          <video
            style={{ display: `${videoUrl ? 'inline-block' : 'none'}` }}
            src={videoUrl}
            controls
            autoPlay
          />
        </div>
      </div>
    )
  }
}