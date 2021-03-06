/* global window */
/* global document */
import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types' 
import { Switch, Route } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp'
// import { connect } from 'dva'
import { Loader, MyLayout } from '../components';
import { BackTop, Layout } from '../components/antd'
import { classnames, config } from '../utils'
import { Helmet } from 'react-helmet'
import { observer } from 'mobx-react'
// import { withRouter } from 'dva/router'
import Error from '../pages/404'
import Dashboard from '../pages/dashboard';
import Users from '../pages/user';
import ECharts from '../pages/chart/ECharts';
import HighCharts from '../pages/chart/highCharts';
import ReCharts from '../pages/chart/ReCharts';
import '../themes/index.less'
import './app.less'

const { Content, Footer, Sider } = Layout
const { Header, Bread, styles } = MyLayout
// const { prefix, openPages } = config

// let lastHref

@observer
export default class App extends React.Component {

  get store() {
    return this.props.rootStore.appScreenStore
  }

  render() {
    const {location} = this.props;
    const {
      user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, siderFoldAction, navOpenKeysAction,
    } = this.store;
    // let { pathname } = location
    // pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
    const { iconFontJS, iconFontCSS, logo } = config
    // const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname))
    // const hasPermission = current.length ? permissions.visit.includes(current[0].id) : false
    // const hasPermission = true 
    // const { href } = window.location
  
    // if (lastHref !== href) {
    //   NProgress.start()
    //   if (!loading.global) {
    //     NProgress.done()
    //     lastHref = href
    //   }
    // }
  
    const headerProps = {
      menu,
      user,
      location,
      siderFold,
      isNavbar,
      menuPopoverVisible,
      navOpenKeys,
      switchMenuPopover () {
        // dispatch({ type: 'app/switchMenuPopver' })
      },
      logout () {
        // dispatch({ type: 'app/logout' })
      },
      switchSider () {
        siderFoldAction();
      },
      changeOpenKeys (openKeys) {
        // dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
      },
    }
  
    const siderProps = {
      menu,
      location,
      siderFold,
      darkTheme,
      navOpenKeys,
      changeTheme () {
        // dispatch({ type: 'app/switchTheme' })
      },
      changeOpenKeys (openKeys) {
        navOpenKeysAction(openKeys);
        // window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
        // dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
      },
    }
  
    const breadProps = {
      menu,
      location,
    }
  
    // if (openPages && openPages.includes(pathname)) {
    //   return (<div>
    //     <Loader fullScreen spinning={loading.effects['app/query']} />
    //     {children}
    //   </div>)
    // }
  
    return (
      <div>
        <Loader fullScreen spinning={false} />
        <Helmet>
          <title>BRAND NAME</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href={logo} type="image/x-icon" />
          {iconFontJS && <script src={iconFontJS} />}
          {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
        </Helmet>
  
        <Layout className={classnames({ [styles.dark]: false, [styles.light]: true })}>
          {!isNavbar && <Sider
            trigger={null}
            collapsible
            collapsed={siderFold}
          >
            {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
          </Sider>}
          <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
            <BackTop target={() => document.getElementById('mainContainer')} />
            <Header {...headerProps} />
            <Content>
              <Bread {...breadProps} />
              {/* {hasPermission ? children : <Error />} */}
               {/* <Error /> */}
               <Switch>
                  {/* <Route exact name="dashboard" path="/dashboard" render={Dashboard} /> */}
                  <Route exact name="users" path="/user" render={Users} />
                  <Route exact name="users" path="/chart/ECharts" render={ECharts} />
                  <Route exact name="users" path="/chart/highCharts" render={HighCharts} />
                  <Route exact name="users" path="/chart/Recharts" render={ReCharts} />
                  <Route component={Dashboard}/>
               </Switch>
               <div></div>
            </Content>
            <Footer >
              {config.footerText}
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  
  }

}

// const App = ({
//   children, dispatch, app, loading, location,
// }) => {
// }

App.propTypes = {
  // children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

// export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
// export default App
