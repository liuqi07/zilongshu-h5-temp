import React from 'react';
// import { Spin } from 'antd';
import './index.scss';

export default () => {
  return (
    <div className="route-loading">
      {/*<Spin tip="页面加载中..." />*/}
      <div>loading...</div>
    </div>
  );
};
