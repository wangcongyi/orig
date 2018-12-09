function wrap(fn) {
  if (!(fn instanceof Function)) {
    throw new Error('Must supply a function');
  }

  return (req, res, next) => {
    const promise = fn(req, res, next)
    if (!promise.catch) return
    promise.catch(err => {
      next(err)
    })
  }
}

export default wrap  

