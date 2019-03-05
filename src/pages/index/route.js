import React from 'react';
import Loadable from 'react-loadable';
import RouteLoading from 'components/RouteLoading';

export default [
  {
    exact: true,
    path: '/',
    owner: '/',
    redirect: '/index/home'
  },
  {
    exact: false,
    path: '/index',
    owner: '/',
    component: Loadable({
      loader: () => import('./index'),
      loading: () => <RouteLoading />
    })
  }
];