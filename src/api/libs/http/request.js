const logger = require('../../libs/logger')

class Request {
  chunk = null

  constructor(chunk) {
    logger.info('libs/http/request:Request', { chunk: chunk.toString() })

    this.chunk = chunk

    this.pathname = this.parsePathname(chunk)
    this.headers = this.parseHeaders(chunk)
    this.query = this.parseQuery(chunk)
    this.body = this.parseBody(chunk)
  }

  splitLines(chunk) {
    logger.info('libs/http/request:Request.splitLines', { chunk: chunk.toString() })

    const [first, ...others] = chunk.toString().split(/\r\n/ig)

    const ix = others.indexOf('')

    const headers = others.splice(ix)

    const body = others.find(() => true)

    return {
      first,
      headers,
      body,
    }
  }

  parsePathname() {
    logger.info('libs/http/request:Request.parsePathname', {})

    return {}
  }

  parseHeaders() {
    logger.info('libs/http/request:Request.parseHeaders', {})

    return {}
  }

  parseQuery() {
    logger.info('libs/http/request:Request.parseQuery', {})

    return {}
  }

  parseBody() {
    logger.info('libs/http/request:Request.parseBody', {})

    return {}
  }

}

module.exports = Request
