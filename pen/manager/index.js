import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'antd'
import { Menus, Routers } from "./Routers"
import './index.css'
import * as serviceWorker from './serviceWorker'

const { Sider, Content } = Layout

class App extends Component {
  state = {
    collapsed: false
  }

  render() {
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menus />
          </Sider>
          <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Routers />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
