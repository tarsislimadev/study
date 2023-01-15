const { ApplicationError } = require('../../libs/errors')
const logger = require('../../libs/logger')

class Response {
  request = null

  status = 200

  headers = {
    'Content-Type': 'application/json',
  }

  body = {
    status: 'ok',
    message: null,
    data: {},
  }

  constructor(request) {
    logger.info('libs/http/request:Response', { request })

    this.request = request
  }

  setError(err = new Error) {
    logger.info('libs/http/request:Response.setError', { err })

    this.status = 400

    this.body.status = 'error'

    if (err instanceof ApplicationError) {
      this.body.message = err.getMessage()
      this.body.data = { stack: err.getStack() }
    } else {
      this.body.message = err.message
      this.body.data = { stack: err.stack }
    }

    return this
  }

  setJSON(json = {}) {
    logger.info('libs/http/request:Response.setJSON', { json })

    this.status = 200

    this.body.status = 'ok'
    this.body.message = null
    this.body.data = json

    return this
  }

  toJSON() {
    logger.info('libs/http/request:Response.toJSON', {})

    return this.body
  }

  parseStatusMessage(status = 200) {
    logger.info('libs/http/request:Response.parseStatusMessage', { status })

    switch (status.toString()) {
      case '200': return 'OK'
    }

    return 'ERROR'
  }

  getFirstLineString() {
    logger.info('libs/http/request:Response.getFirstLineString', {})

    const message = this.parseStatusMessage(this.status)
    return (`HTTP/1.1 ${this.status} ${message}`)
  }

  toString() {
    logger.info('libs/http/request:Response.toString', {})

    const { headers } = this

    const lines = []

    lines.push(this.getFirstLineString())

    Object.keys(headers)
      .map(header => `${header}: ${headers[header]}`)
      .map(line => lines.push(line))

    lines.push('')

    lines.push(JSON.stringify(this.toJSON()))

    return lines.join('\r\n')
  }
}

module.exports = Response
