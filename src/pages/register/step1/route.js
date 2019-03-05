// import * as c from 'libs/route_base.js'

import React from 'react';
import Loadable from 'react-loadable';
import RouteLoading from 'components/RouteLoading';

export default {
  exact: true,
  path: '/registerStep1',
  owner: '/',
  component: Loadable({
    loader: () => import('./index'),
    loading: () => <RouteLoading />
  })
};