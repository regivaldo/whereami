const save = (form) => {
  form.preventDefault()

  let url = form.target.url.value
  let enviroment = form.target.enviroment.value
  let type = form.target.type.value
  let color = form.target.color.value
  let border = form.target.border.value

  const connect = window.indexedDB.open('whereami', 1)

  connect.onupgradeneeded = function (event) {
    let db = event.target.result
    let store = db.createObjectStore('links', {
      keyPath: 'id',
      autoIncrement: true,
    })
  }

  connect.onsuccess = function () {
    var db = connect.result
    var tx = db.transaction('links', 'readwrite')
    var store = tx.objectStore('links')

    store.add({ url, enviroment, type, color, border })
    location.reload()
  }

  return false
}

const getType = (type) => {
  switch (type) {
    case 'border-top':
      return 'Borda no topo'
    case 'border-all':
      return 'Borda completa'
    case 'balloon':
      return 'Balão'
  }
}

const view = () => {
  const connect = window.indexedDB.open('whereami', 1)

  connect.onsuccess = function () {
    console.log('Conectado')

    var db = connect.result
    var tx = db.transaction('links', 'readonly')
    var store = tx.objectStore('links')
    var request = store.getAll()

    let tbody = document.querySelector('table tbody')

    request.onsuccess = function (event) {
      event.target.result.forEach((row) => {
        let tr = document.createElement('tr')
        tr.setAttribute('id', `row-${row.id}`)

        let url = document.createElement('td')
        let enviroment = document.createElement('td')
        let type = document.createElement('td')
        let color = document.createElement('td')
        let border = document.createElement('td')
        let action = document.createElement('td')

        let divColor = document.createElement('div')
        divColor.className = 'color'
        divColor.style.backgroundColor = row.color

        let edit = document.createElement('button')
        edit.className = 'edit'
        let del = document.createElement('button')
        del.className = 'delete'

        edit.innerHTML = `<svg viewBox="0 0 24 24"><path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" /></svg>`
        del.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`

        url.innerText = row.url
        enviroment.innerText = row.enviroment
        type.innerText = getType(row.type)
        border.innerText = row.border + 'px'

        color.append(divColor)

        action.append(edit)
        action.append(del)

        tr.append(url)
        tr.append(enviroment)
        tr.append(type)
        tr.append(color)
        tr.append(border)
        tr.append(action)

        tbody.append(tr)
      })
    }
  }
}

document.getElementById('options').addEventListener('submit', save)
view()
