import { addEvent, TypeEvent } from '../config/eventListener.js'
import { dtb } from '../config/dataTable.js'
import Alert from '../config/Alert.js'

//('[atributo="valor"]')

let table = dtb('myTable')

const loadData = async () => {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

  let userId = '66fa58fa8a062aa10edb5d98'

  let response = await axios.get(`http://127.0.0.1:5000/api/finca/${userId}`, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  console.log(response.data)

  response.data.forEach((element) => {
    let boton = `
            <button class="btn btn-sm btn-primary btn-ganado">Ganado</button>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#farmEdit">Editar</button>
            <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#farmDelete">Eliminar</button>`

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
}

const deleteFinca = (e) => {

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

  let id = e.dataset.id
  let tr = document.getElementById(id)
  

  var row = table.row(tr.closest('tr'))
  row.remove().draw()

  e.dataset.id = ''
  e.parentNode.querySelector('.btn-secondary').click()

  axios.delete(`http://127.0.0.1:5000/api/finca/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert(
    'No se realizo la edición, puede ser de que la edición ya este cerrada para esta fecha.',
    { type: 'danger' }
  )
}

const navigateLivestock = (a) => {
  let id = a.parentNode.parentNode.id
  window.location.href = `/Ganado/PorFinca/${id}`
}

addEvent(TypeEvent.click, `[data-bs-toggle="modal"]`, (e) => actionModal(e))

addEvent(TypeEvent.click, '.btn-delete', (e) => deleteFinca(e))

addEvent(TypeEvent.click, ".btn-ganado", (e) => navigateLivestock(e))
