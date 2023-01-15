const logger = require('./libs/logger')

const app = require('./router')

app.post(['api', 'v1', 'forms'], (req, res) => {
  logger.info('routes:app.post:api.v1.forms', { req, res })

  return res.setJSON({ list: [] })
})

app.post(['api', 'v1', 'forms', 'save'], (req, res) => {
  logger.info('routes:app.post:api.v1.forms.save', { req, res })

  return res.json({ id: null })
})

module.exports = app
