const { Request, Response } = require('./libs/http')
const logger = require('./libs/logger')
const { PORT } = require('./config')
const app = require('./app')

require('net')

.createServer((listener) => {
  listener.on('data', (chunk) => {
    const req = new Request(chunk.toString())
    const res = new Response(req)

    let bucket = {}

    try {
      bucket = app.run(req, res)
    } catch (e) {
      bucket = res.setError(e)
    }

    listener.end(bucket.toString())
  })
})

.listen(PORT, () => logger.info('Listening', { port: PORT }))
