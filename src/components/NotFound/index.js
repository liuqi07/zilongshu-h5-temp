import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from 'antd-mobile';
import './index.scss';

class NotFound extends React.PureComponent {
  constructor(props) {
    super(props);
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
  render() {
    return createPortal(
      <div className="page-404">
        <div className="pic-404">&nbsp;</div>
        <div className="msg-404">
          <div>
            <h1 className="tit">404</h1>
            <p className="desc">抱歉，你访问的页面不存在</p>
            <div>
              <Button href="#/" type="primary" className="backbtn">返回首页</Button>
            </div>
          </div>
        </div>
      </div>,
      this.node
    );
  }
};

export default NotFound;
