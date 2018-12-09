import rp from 'request-promise'
import _ from 'lodash'

function _copyHeaders(headers) {
  return _.pickBy(headers, (v, k) => k.startsWith('x-t'))
}

function factory(headers) {
  const _headers = headers

  return function createAPI(name) {
    let rootURI = name
    rootURI = rootURI.replace('{name}', name)
    if (!rootURI.startsWith('http://')) {
      rootURI = `http://${rootURI}`
    }

    function _getContext(uri, method, data) {
      const json = (method === 'GET') ? true : data
      const context = {
        startTime: _.now(),
        method,
        headers: _headers,
        json,
      }
      const opt = _.isString(uri) ? { uri } : uri
      opt.path = opt.uri
      opt.uri = rootURI + opt.path
      return _.assign(context, opt)
    }

    function _getRequestOption(context) {
      return _.pick(context, ['uri', 'method', 'headers', 'json'])
    }

    function _get(uri) {
      const context = _getContext(uri, 'GET')
      return rp(_getRequestOption(context))
    }

    function _post(uri, data, done) {
      const context = _getContext(uri, 'POST', data)
      return rp(_getRequestOption(context))
    }

    function _put(uri, data, done) {
      const context = _getContext(uri, 'PUT', data)
      return rp(_getRequestOption(context))
    }

    function _head(uri, done) {
      const context = _getContext(uri, 'HEAD')
      return rp(_getRequestOption(context))
    }

    function _setHeader(key, value) {
      _headers[key] = value
    }

    return {
      get: _get,
      post: _post,
      put: _put,
      head: _head,
      setHeader: _setHeader,
    }
  }
}

export default {
  factory,
}
  
