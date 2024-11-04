import { addEvent, TypeEvent } from '../config/eventListener.js'
import { dtb } from '../config/dataTable.js'
import Alert from '../config/Alert.js'

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

let boton = `
    <button class="btn btn-sm btn-primary btn-ganado">Ganado</button>
    <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#farmEdit">Editar</button>
    <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#farmDelete">Eliminar</button>`

let userId = '66fa58fa8a062aa10edb5d98'

let farmData = []

let baseURl = `https://bombinsoftjinja.onrender.com/`

const closeModal = (e) => {
  let btn = e.querySelector(`[data-bs-dismiss="modal"]`)
  btn.click()
}

let table = dtb('myTable')

const loadData = async () => {
  let response = await axios.get(`${baseURl}/api/finca/${userId}`, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  farmData = response.data

  response.data.forEach((element) => {
    let array = [element.nombre, element.direccion, element.tamano, boton]
    let node = table.row.add(array).draw(true).node()

    node.id = element._id
  })
}

loadData()

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

const deleteFinca = (e) => {
  let id = e.dataset.id
  let tr = document.getElementById(id)

  var row = table.row(tr.closest('tr'))
  row.remove().draw()

  e.dataset.id = ''
  e.parentNode.querySelector('.btn-secondary').click()

  axios.delete(`${baseURl}/api/finca/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert(
    'Se elimino la finca exitosamente.',
    { type: 'danger' }
  )
}

const createFarm = async (a) => {
  let modal = document.querySelector('#farmCreate')

  let nombre = modal.querySelector('#Nombre').value
  let tamano = modal.querySelector('#Tamaño').value
  let direccion = modal.querySelector('#Direccion').value

  var forms = modal.querySelector('.needs-validation')

  let validated = true

  // Bucle sobre ellos y evitar el envío
debugger
  if (!forms.checkValidity()) {
    validated = false
  }

  debugger

  forms.classList.add('was-validated')

  if (!validated) return new Alert("No se logro agregar la finca", { type: 'danger' })

  let formData = {
    nombre,
    tamano,
    direccion,
    idUsuario: userId
  }

  let response = await axios.post(`${baseURl}/api/finca`, formData, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  farmData.push({...formData, _id: response.data.id})

  new Alert('Se creo la finca exitosamente.', { type: 'success' })

  let updatedData = [nombre, tamano, direccion, boton]

  let node = table.row.add(updatedData).draw(true).node()

  node.id = response.data.id

  closeModal(modal)
}

const loadDatawithEdit = (id, modal) => {
  let data = farmData.find((item) => item._id === id)

  modal.querySelector('#Nombre').value = data.nombre
  modal.querySelector('#Tamaño').value = data.tamano
  modal.querySelector('#Direccion').value = data.direccion
}

const editLivestock = (a) => {
  let id = a.dataset.id
  let modal = document.querySelector('#farmEdit')

  let nombre = modal.querySelector('#Nombre').value
  let tamano = modal.querySelector('#Tamaño').value
  let direccion = modal.querySelector('#Direccion').value

  let formData = {
    nombre,
    tamano,
    direccion,
  }

  axios.put(`${baseURl}/api/finca/${id}`, formData, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert('Se actulizo la finca exitosamente.', { type: 'success' })

  let tr = document.getElementById(id)

  var row = table.row(tr.closest('tr'))

  let updatedData  = [
    nombre,
    tamano,
    direccion,
    boton
  ]

  row.data(updatedData).draw();

  closeModal(modal)
}

const navigateLivestock = (a) => {
  let id = a.parentNode.parentNode.id
  window.location.href = `/Ganado/PorFinca/${id}`
}

addEvent(TypeEvent.click, `[data-bs-toggle="modal"]`, (e) => actionModal(e))

addEvent(TypeEvent.click, '.btn-delete', (e) => deleteFinca(e))

addEvent(TypeEvent.click, '.btn-ganado', (e) => navigateLivestock(e))

addEvent(TypeEvent.click, '#farmCreate .btn-save', (e) => createFarm(e))

addEvent(TypeEvent.click, '#farmEdit .btn-save', (e) => editLivestock(e))
