const fs = require('fs')
const { join, resolve, dirname } = require('path')
const defaultOptions = {
  rename: function (name) {
    return name
  },
  visit: function (obj) {
    return obj
  },
}

function checkFileInclusion(path, filename, options) {
  return (
    (new RegExp('\\.(' + ['js'].join('|') + ')$', 'i').test(filename)) &&
    !(options.include && options.include instanceof RegExp && !options.include.test(path)) &&
    !(options.include && typeof options.include === 'function' && !options.include(path, filename)) &&
    !(options.exclude && options.exclude instanceof RegExp && options.exclude.test(path)) &&
    !(options.exclude && typeof options.exclude === 'function' && options.exclude(path, filename))
  )
}

function traverFile(m, path, options) {
  let o = {}
  if (path && !options && typeof path !== 'string') {
    options = path
    path = null
  }
  options = options || {}
  for (let prop in defaultOptions) {
    if (typeof options[prop] === 'undefined') {
      options[prop] = defaultOptions[prop]
    }
  }

  path = !path ? dirname(m.filename) : resolve(dirname(m.filename), path)
  fs.readdirSync(path).forEach(function (filename) {
    let joined = join(path, filename),
      files,
      key,
      obj

    if (fs.statSync(joined).isDirectory()) {
      files = traverFile(m, joined, options)
      if (Object.keys(files).length) {
        o[filename] = files
      }
    } else {
      if (joined !== m.filename && checkFileInclusion(joined, filename, options)) {
        key = filename.substring(0, filename.lastIndexOf('.'))
        obj = m.require(joined)
        o[options.rename(key, joined, filename)] = options.visit(obj, joined, filename) || obj
      }
    }
  })

  return o
}
