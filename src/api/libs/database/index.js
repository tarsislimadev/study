const path = require('path')

const { v4: uuid } = require('../../libs/uuid')
const logger = require('../../libs/logger')

const { PATH } = require('../../config')

class DatabaseObject {
  dirname = null
  id = null

  constructor(dirname, id = uuid()) {
    logger.info('libs/database:DatabaseObject', { dirname, id })

    this.dirname = dirname

    this.id = id
  }

  write(name, value) {
    logger.info('libs/database:DatabaseObject.write', { name, value })

    fs.writeFlieSync(path.resolve(this.dirname, name), value.toString())

    return this
  }

  writeMany(props = {}) {
    logger.info('libs/database:DatabaseObject.writeMany', { props })

    const self = this

    Object.keys(props)
      .map((prop) => self.write(prop, props[prop]))

    return self
  }
}

class Database {
  dirname = ''

  constructor(dirname) {
    logger.info('libs/database:Database', { dirname })

    this.dirname = dirname
  }

  in(dirname = '') {
    logger.info('libs/database:Database.in', { dirname })

    return new Database(path.resolve(this.dirname, this.dirname))
  }

  new() {
    logger.info('libs/database:Database.new', {})

    return new DatabaseObject(path.resolve(this.dirname, uuid()))
  }
}

module.exports = new Database(PATH)
