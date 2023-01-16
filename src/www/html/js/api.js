const constants = {
  BASE_URL: 'http://0.0.0.0'
}

class SuccessResponse {
  constructor({ responseText }) {
    const { status, message, data } = JSON.parse(responseText)

    this.status = status
    this.message = message
    this.data = data
  }

  get(name, def = null) {
    return this.data[name] || def
  }
}

class ErrorResponse {
  constructor({ responseText }) {
    const { status, message, data } = JSON.parse(responseText)

    this.status = status
    this.message = message
    this.data = data
  }

  getMessage(def = 'Error') {
    return this.message || def
  }

}

const Ajax = {}

Ajax.post = (path = [], data = {}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', [constants.BASE_URL, 'api', 'v1', ...path].join('/'), true)

    const onComplete = (xhr) =>
      ([200, '200'].indexOf(xhr.status) !== -1)
        ? resolve(new SuccessResponse(xhr))
        : reject(new ErrorResponse(xhr))

    xhr.onload = () => onComplete(xhr)
    xhr.onerror = () => onComplete(xhr)

    xhr.send(JSON.stringify(data))
  })
}

const API = {}

API.createForm = ({ } = {}) => Ajax.post(['forms', 'create'], {})

API.listForms = ({ } = {}) => Ajax.post(['forms', 'list'], {})

API.saveForm = ({ answers = [] } = {}) => Ajax.post(['forms', 'save'], { answers })

API.listQuestions = ({ } = {}) => Ajax.post(['questions', 'list'], {})

API.createQuestion = ({ } = {}) => Ajax.post(['questions', 'create'], {})
