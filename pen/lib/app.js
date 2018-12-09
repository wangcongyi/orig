import _ from 'lodash'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import api from './lib/api'
import wrap from './lib/wrap'
import IndexRoutes from './pages/routes'

import styleSheet from 'styled-components/lib/models/StyleSheet';

styleSheet.flush();

const app = express();

async function login(req, res, next) {
  if (req.query && req.query.auth_key) {
    req.session.authToken = req.query.auth_key
  }

  if (!req.session.authToken && req.cookies.tzj_MOBILE_API_AUTH_KEY) {
    req.session.authToken = req.cookies.tzj_MOBILE_API_AUTH_KEY
  }


  if (!_.get(req, 'session.authToken')) {
    res.locals.createAPI = api.factory({})
    return next()
  }

  const headers = {}
  headers['X-Auth-Token'] = req.session.authToken
  res.locals.createAPI = api.factory(headers)

  const accountAPI = res.locals.createAPI('my.gw')

  let base = null
  try {
    base = await accountAPI.get('/account')
  } catch (e) {
    base = null
  }
  if (base === null) {
    req.session.authToken = null
  }
  next()
}
const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');
app.use('/static', express.static(__dirname + '/static'))

app.use(cookieParser())
app.use(session({
  secret: 'touzhijia_activity_20161212',
  resave: false,
  saveUninitialized: true,
}))

app.use(wrap(login));


// 路由设置
app.use('/', IndexRoutes)

app.use((err, req, res, next) => {
  console.log(err.stack)
  const body = _.get(err, 'response.body')
  const message = _.get(body, 'message', '出错了')
  res.status(err.statusCode || 500)
  res.json({ message })
})

export default app
