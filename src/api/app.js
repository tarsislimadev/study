const logger = require('./libs/logger')
const db = require('./libs/database')
const app = require('./router')

const actions = require('./actions')

app.post(['api', 'v1', 'forms', 'list'], (req, res) => {
  logger.info('routes:app.post:forms.list', { req, res })

  return actions.forms.list(req, res)
})

app.post(['api', 'v1', 'forms', 'create'], (req, res) => {
  logger.info('routes:app.post:forms.create', { req, res })

  return actions.forms.create(req, res)
})

app.post(['api', 'v1', 'forms', 'save'], (req, res) => {
  logger.info('routes:app.post:forms.save', { req, res })

  return res.setJSON({})
})

app.post(['api', 'v1', 'questions', 'create'], (req, res) => {
  logger.info('routes:app.post:questions.create', { req, res })

  return res.setJSON(db.in('questions').new())
})

app.post(['api', 'v1', 'questions', 'list'], (req, res) => {
  logger.info('routes:app.post:questions.list', { req, res })

  return res.setJSON({})
})

module.exports = app
