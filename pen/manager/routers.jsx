import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Icon, Menu } from "antd"
import asyncComponent from './components/AsyncComponent'
import Home from './components/Home'

const { Item } = Menu

const Menus = () => (
  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
    <Item key="1">
      <Link to="/user">
        <Icon type="user" />
        <span>user</span>
      </Link>
    </Item>
    <Item key="2">
      <Link to="/camera">
        <Icon type="video-camera" />
        <span>camera</span>
      </Link>
    </Item>
    <Item key="3">
      <Link to="/upload">
        <Icon type="upload" />
        <span>upload</span>
      </Link>
    </Item>
  </Menu>
)

const Routers = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={asyncComponent(() => import('./components/User'))} />
    <Route path="/camera" component={asyncComponent(() => import('./components/Camera'))} />
    <Route path="/upload" component={asyncComponent(() => import('./components/Upload'))} />
  </Switch>
)

export { Menus, Routers }
