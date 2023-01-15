const Flow = {
  goTo: (url, params = {}) => {
    localStorage.setItem(['url', url].join('.'), JSON.stringify({ params }))
      ;;
    (window.location = url)
  },
  getParams: (url) => {
    const storage = localStorage.getItem(['url', url].join('.'))
    const { params } = JSON.parse(storage)
    return params
  },
}
