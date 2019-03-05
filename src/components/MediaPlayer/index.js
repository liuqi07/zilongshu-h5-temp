/**
 *  src[string] video的url
 *  type[string] 类型,'video(默认)/audio'
 *  title[string] 标题
 *  show[bool] 打开video
 *  onClose[fn] 关闭查看器的回调
 *  */

import React from 'react';
import { Modal } from 'antd-mobile';

export default class extends React.Component {

  render() {
    const { src, type = 'video', title = '', show = true, onClose = () => {} } = this.props;
    // if (!src || !show) ;
    if (type === 'video') {
      return (
        <Modal
          style={{ width: '9rem' }}
          maskClosable={false}
          footer={true}
          title={title && title || '课程回放'}
          visible={show}
          onClose={onClose}
          closable={true}
        >
          <div style={{ width: '100%', backgroundColor: '#000', textAlign: 'center' }}>
            <video autoPlay src={src} controls width="100%">
              您的浏览器不支持视频播放，请升级
            </video>
          </div>
        </Modal>
      )
    }
    if (type === 'audio') {
      return (
        <Modal
          maskClosable={false}
          footer={false}
          title={title && title || '课程回放'}
          visible={show}
          width='90%'
          onClose={onClose}
          closable={true}
        >
          <div style={{ height: '100rem', width: '100%', textAlign: 'center' }}>
            <video autoPlay src={src} controls height="100%" width="100%">
              您的浏览器不支持播放，请升级
            </video>
          </div>
        </Modal>
      )
    }
  }
}
