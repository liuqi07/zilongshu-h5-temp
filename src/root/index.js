import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import renderRoutes from 'libs/routes';
import './index.scss';
import 'assets/fonts/iconfont.css'
// import 'antd-mobile/dist/antd-mobile.css';

class Root extends React.PureComponent {
  render() {
    return (
	    <Router>
	      {renderRoutes('/')}
	    </Router>
    );
  }
}

export default Root;
