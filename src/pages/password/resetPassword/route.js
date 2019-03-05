import React from 'react';
import Loadable from 'react-loadable';
import RouteLoading from 'components/RouteLoading';

export default [
  // {
  //   exact: true,
  //   path: '/',
  //   owner: '/',
  //   redirect: '/home'
  // },
  {
    exact: false,
    path: '/resetpwd',
    owner: '/',
    component: Loadable({
      loader: () => import('./index'),
      loading: () => <RouteLoading />
    })
  }
];