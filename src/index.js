import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './root/serviceWorker';
import Root from './root';
// import 'antd-mobile/dist/antd-mobile.css'
// import 'lib-flexible/flexible'
ReactDOM.render(<Root />,document.getElementById('root'));

//  +++++ 热更新 +++++
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
