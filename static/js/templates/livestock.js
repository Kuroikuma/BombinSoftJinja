import { addEvent, TypeEvent } from '../config/eventListener.js'
import { dtb } from '../config/dataTable.js'
import Alert from '../config/Alert.js'

//('[atributo="valor"]')

var livesctockData = []

let table = dtb('myTable')

const actionModal = (a) => {
  let id = a.parentNode.parentNode.id

  let idModal = a.dataset.bsTarget

  let modal = document.querySelector(idModal)

  let buttonDelete =
    modal.querySelector('.btn-delete') || modal.querySelector('.btn-save')

  buttonDelete.dataset.id = id

  if (idModal.includes('Edit')) {
    loadDatawithEdit(id, modal)
  }
}

const loadDatawithEdit = (id, modal) => {
  let data = livesctockData.find((item) => item._id === id)

  modal.querySelector('#Nombre').value = data.nombre
  modal.querySelector('#Raza').value = data.raza
  modal.querySelector('#EstadoSalud').value = data.estadoSalud
}

const editLivestock = (a) => {
  let id = a.dataset.id
  let modal = document.querySelector('#livestockEdit')

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

  let nombre = modal.querySelector('#Nombre').value
  let raza = modal.querySelector('#Raza').value
  let estado = modal.querySelector('#EstadoSalud').value

  const formData = new FormData()

  formData.append('nombre', nombre)
  formData.append('raza', raza)
  formData.append('estadoSalud', estado)

  axios.put(`http://127.0.0.1:5000/api/bovino/${id}`, formData, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert('Se actulizo el bovino exitosamente.', { type: 'success' })
}

const deleteLivetock = (e) => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

  let id = e.dataset.id
  let tr = document.getElementById(id)

  var row = table.row(tr.closest('tr'))
  row.remove().draw()

  e.dataset.id = ''
  e.parentNode.querySelector('.btn-secondary').click()

  axios.delete(`http://127.0.0.1:5000/api/bovino/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert('Se elimino el bovino exitosamente.', { type: 'danger' })
}

const loadData = async () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

  let isViewByFarm = location.pathname.includes('/Ganado/PorFinca/')

  let fincaID = isViewByFarm
    ? location.pathname.replace('/Ganado/PorFinca/', '')
    : null
  let url = fincaID
    ? `http://127.0.0.1:5000/api/bovino/byFarm/${fincaID}`
    : 'http://127.0.0.1:5000/api/bovino/byUsers/66fa58fa8a062aa10edb5d98'

  let response = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  livesctockData = response.data

  response.data.forEach((element) => {
    let boton = `
            <button class="btn btn-sm btn-primary">Detalle</button>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#livestockEdit">Editar</button>
            <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#livestockDelete">Eliminar</button>`

    let array = [
      element._id,
      element.nombre,
      element.raza,
      4,
      1200,
      element.estadoSalud,
      boton,
    ]
    let node = table.row.add(array).draw(true).node()

    node.id = element._id
  })
}

loadData()

addEvent(TypeEvent.click, `[data-bs-toggle="modal"]`, (e) => actionModal(e))

addEvent(TypeEvent.click, '.btn-delete', (e) => deleteLivetock(e))

addEvent(TypeEvent.click, '#livestockEdit .btn-save', (e) => editLivestock(e))
