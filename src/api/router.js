const logger = require('./libs/logger')

const routes = []

const run = (req, res) => {
  logger.info('api:run', { req, res })

  const { pathname } = req
  let route = routes.find(({ name }) => pathname === name)
  if (!route) route = { func: () => res }
  return route.func(req, res)
}

const post = (name = [], func) => {
  logger.info('api:post', { name, func })

  return routes.push({ name: name.join('/'), func })
}

module.exports = {
  run,
  post,
}
