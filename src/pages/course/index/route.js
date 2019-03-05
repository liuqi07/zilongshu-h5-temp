import React from 'react';
import Loadable from 'react-loadable';
import RouteLoading from 'components/RouteLoading';

export default [
  {
    exact: false,
    path: '/index/course',
    owner: '/index',
    component: Loadable({
      loader: () => import('./index'),
      loading: () => <RouteLoading />
    })
  }
];