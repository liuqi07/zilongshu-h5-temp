import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { cookie } from 'libs/utils'
import NotFound from 'components/NotFound';

const req = require.context('../pages', true, /route\.jsx?$/);
const allRoutes = [].concat.apply([], req.keys().map(k => req(k).default));

/**
 * key[string]: 用来获取路由的标识，必须;
 * authority[object]: 路由权限，例如{abc: true}形式;是否需要登录才能访问，如需要登录但未登陆，跳转到登陆页
 * owner[string]: 标识路由的归属，务必定义成父路由，必须;
 * 注意:
 * 1.因为key被作用于404的路由，所以owner务必定义成父路由;
 **/
export default key => {
  if (typeof key !== 'string') return null;
  const routes = allRoutes.filter(v => v.owner === key);
  //添加404
  routes.push({ exact: false, path: key, component: NotFound });
  const authority = cookie.get('authority')
  return (
    <Switch>
      {routes.map(route => {
        if (route.authority && !authority) {
          return null;
        }
        if (route.redirect) {
          //重定向路由
          return <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={() => <Redirect to={route.redirect} />}
          />
        } 
        //一般路由
        return <Route
          key={route.path}
          exact={route.exact}
          path={route.path}
          component={route.component}
        />
      })}
    </Switch>
  )
}
