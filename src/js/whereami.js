const createBorder = (enviroment = '') => {
  const element = document.createElement('div')

  element.classList.add('whereami-flags')
  element.classList.add('stage')
  element.title = `Você está no ambiente de ${enviroment}`
  element.id = 'whereami'

  return element
}

const hasConfiguration = () => {
  return false
}

const verify = () => {
  if (!hasConfiguration()) {
    const body = document.querySelector('body')
    const url = location.url

    var db = connect.result
    var tx = db.transaction('links', 'readonly')
    var store = tx.objectStore('links')
    var request = store.getAll()
    var result

    request.onsuccess = function (event) {
      result = event.target.result.filter((u) => u.url.include(url))
    }

    if (result) {
      body.append(createBorder('Desenvolvimento'))
    }
  }
}

verify()
