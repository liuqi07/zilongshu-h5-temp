import React from 'react';
import Loadable from 'react-loadable';
import RouteLoading from 'components/RouteLoading';

export default [
  {
    exact: true,
    path: '/introduce/english',
    owner: '/introduce',
    component: Loadable({
      loader: () => import('./index'),
      loading: () => <RouteLoading />
    })
  }
];