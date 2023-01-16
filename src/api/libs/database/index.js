const path = require('path')
const fs = require('fs')

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

    fs.mkdirSync(path.resolve(this.dirname, this.id), { recursive: true })
  }

  name() {
    logger.info('libs/database:DatabaseObject.name', {})

    return path.resolve(this.dirname, this.id)
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

  read(name, def = null) {
    logger.info('libs/database:DatabaseObject.read', { name, def })

    return fs.readFileSync(path.resolve(this.name(), name)) || def
  }
}

class Database {
  dirname = ''

  constructor(dirname) {
    logger.info('libs/database:Database', { dirname })

    this.dirname = dirname

    fs.mkdirSync(this.dirname, { recursive: true })
  }

  in(dirname = '') {
    logger.info('libs/database:Database.in', { dirname })

    return new Database(path.resolve(this.dirname, this.dirname))
  }

  new() {
    logger.info('libs/database:Database.new', {})

    return new DatabaseObject(path.resolve(this.dirname, uuid()))
  }

  list() {
    logger.info('libs/database:Database.list', {})

    return fs.readdirSync(this.dirname)
      .map((item) => path.resolve(this.dirname, item))
  }

  listJSON() {
    logger.info('libs/database:Database.listJSON', {})

    return this.list()
      .map((dirname) => new DatabaseObject(this.dirname, dirname))
      .map((obj) => obj.toJSON())
  }
}

module.exports = new Database(PATH)
