const logger = require('../../libs/logger')

class Request {
  chunk = null

  constructor(chunk) {
    logger.info('libs/http/request:Request', { chunk: chunk.toString() })

    this.chunk = chunk.toString()

    this.method = this.parseMethod(chunk)
    this.pathname = this.parsePathname(chunk)
    this.query = this.parseQuery(chunk)
    this.http_version = this.parseHttpVersion(chunk)

    this.headers = this.parseHeaders(chunk)

    this.body = this.parseBody(chunk)
  }

  splitLines(chunk) {
    logger.info('libs/http/request:Request.splitLines', { chunk: chunk.toString() })

    const [first, ...others] = chunk.toString().split(/\r\n/ig)

    const ix = others.indexOf('')

    const headers = others.splice(ix)

    const body = others.find(() => true)

    return {
      first: first.split(' '),
      headers,
      body,
    }
  }

  parseMethod(chunk) {
    logger.info('libs/http/request:Request.parseMethod', { chunk })

    const { first: [method,] } = this.splitLines(chunk)

    return method
  }

  parsePathname(chunk) {
    logger.info('libs/http/request:Request.parsePathname', { chunk })

    const { first: [, pathname] } = this.splitLines(chunk)

    return pathname.substr(1)
  }

  parseQuery(chunk) {
    logger.info('libs/http/request:Request.parseQuery', { chunk })

    return {}
  }

  parseHttpVersion(chunk) {
    logger.info('libs/http/request:Request.parseHttpVersion', { chunk })

    const { first: [, , version] } = this.splitLines(chunk)

    return version
  }

  parseHeaders(chunk) {
    logger.info('libs/http/request:Request.parseHeaders', { chunk })

    return {}
  }

  parseBody(chunk) {
    logger.info('libs/http/request:Request.parseBody', { chunk })

    return {}
  }

}

module.exports = Request
