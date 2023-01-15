class ApplicationError extends Error {
  constructor(message = 'Application Error', extras = {}) {
    super(message)

    this.extras = extras
  }

  getMessage() {
    return this.message
  }

  getStack() {
    return this.stack
  }
}

module.exports = {
  ApplicationError,
}
