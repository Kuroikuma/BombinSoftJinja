import { addEvent, TypeEvent } from '../config/eventListener.js'
import { dtb } from '../config/dataTable.js'
import Alert from '../config/Alert.js'

let table = dtb('myTable')
let livesctockData = [];

let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJKdW5pb3IiLCJhcGVsbGlkbyI6Ikh1cnRhZG8iLCJlZGFkIjoiIiwiZW1haWwiOiJvZGlzZW9qNjc2QGdtYWlsLmNvbSIsInRlbGVmb25vIjoiIiwicm9sIjoiIiwiZGlyZWNjaW9uIjoiIiwidGlwb1N1c2NyaXBjaW9uIjoiIiwiZXhwIjoxNzI3ODM0MDExfQ.2ctvbua5b4rpw3diNutggc05IxkQGC9DJE5ewV0h-dY'

let boton = `
            <button class="btn btn-sm btn-primary">Detalle</button>
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#livestockEdit">Editar</button>
            <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#livestockDelete">Eliminar</button>`

let baseURl = `https://bombinsoftjinja.onrender.com/`

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

const closeModal = (e) => {
  let btn = e.querySelector(`[data-bs-dismiss="modal"]`)
  btn.click()
}

function seleccionarValor(estado, modal, idSelect) {
  // Obtener el elemento <select> por su ID
  const selectElement = modal.querySelector(`#${idSelect}`);

  // Verificar si el elemento existe
  if (selectElement) {
      // Establecer el valor del <select> al estado pasado como parámetro
      selectElement.value = estado;
  } else {
      console.error('Elemento <select> no encontrado');
  }
}

const loadDatawithEdit = (id, modal) => {
  let data = livesctockData.find((item) => item._id === id)

  modal.querySelector('#Nombre').value = data.nombre
  modal.querySelector('#Raza').value = data.raza
  seleccionarValor(data.estadoSalud.toUpperCase(), modal, "EstadoSalud")
  modal.querySelector("#Edad").value = data.edad
  modal.querySelector("#FechaNacimiento").value = data.fechaNacimiento
  modal.querySelector("#Peso").value = data.peso
  seleccionarValor(data.tipo.toUpperCase(), modal, "Tipo")
  seleccionarValor(data.genero.toUpperCase(), modal, "Genero")
}

const createLivestock = async (a) => {
  let isViewByFarm = location.pathname.includes('/Ganado/PorFinca/')

  let fincaId = isViewByFarm
    ? location.pathname.replace('/Ganado/PorFinca/', '')
    : null

  let modal = document.querySelector('#livestockCreate')

  let nombre = modal.querySelector('#Nombre').value
  let raza = modal.querySelector('#Raza').value
  let estado = modal.querySelector('#EstadoSalud').value
  let edad = modal.querySelector('#Edad').value
  let peso = modal.querySelector('#Peso').value
  let tipo = modal.querySelector('#Tipo').value
  let genero = modal.querySelector('#Genero').value
  let fechaNacimiento = modal.querySelector('#FechaNacimiento').value


  let formData = {
    nombre,
    raza,
    estadoSalud: estado.toUpperCase(),
    edad,
    peso,
    tipo: tipo.toUpperCase(),
    genero: genero.toUpperCase(),
    fechaNacimiento,
    fincaId
  }

  let response = await axios.post(`${baseURl}/api/bovino`, formData, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  livesctockData.push(response.data)

  new Alert('Se creo el bovino exitosamente.', { type: 'success' })

  let updatedData  = [
    response.data.codigo,
    nombre,
    raza,
    edad,
    peso,
    estado.toUpperCase(),
    boton
  ]

  let node = table.row.add(updatedData).draw(true).node()

  node.id = response.data._id

  closeModal(modal)
}

const editLivestock = (a) => {
  let id = a.dataset.id
  let modal = document.querySelector('#livestockEdit')

  let nombre = modal.querySelector('#Nombre').value
  let raza = modal.querySelector('#Raza').value
  let estado = modal.querySelector('#EstadoSalud').value
  let edad = modal.querySelector('#Edad').value
  let peso = modal.querySelector('#Peso').value
  let tipo = modal.querySelector('#Tipo').value
  let genero = modal.querySelector('#Genero').value

  let formData = {
    nombre,
    raza,
    estadoSalud: estado.toUpperCase(),
    edad,
    peso,
    tipo: tipo.toUpperCase(),
    genero: genero.toUpperCase(),
  }

  axios.put(`${baseURl}/api/bovino/${id}`, formData, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  new Alert('Se actulizo el bovino exitosamente.', { type: 'success' })

  let tr = document.getElementById(id)

  var row = table.row(tr.closest('tr'))

  let updatedData  = [
    row.data()[0],
    nombre,
    raza,
    edad,
    peso,
    estado.toUpperCase(),
    boton
  ]

  row.data(updatedData).draw();

  closeModal(modal)
}

const deleteLivetock = (e) => {

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

  let isViewByFarm = location.pathname.includes('/Ganado/PorFinca/')

  let fincaID = isViewByFarm
    ? location.pathname.replace('/Ganado/PorFinca/', '')
    : null
  let url = fincaID
    ? `${baseURl}/api/bovino/byFarm/${fincaID}`
    : `${baseURl}/api/bovino/byUsers/66fa58fa8a062aa10edb5d98`

  let response = await axios.get(url, {
    headers: {
      Authorization: 'Bearer ' + token, // Enviar el token en el encabezado
    },
  })

  livesctockData = response.data

  response.data.forEach((element) => {

    let array = [
      element.codigo,
      element.nombre,
      element.raza,
      element.edad,
      element.peso,
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

addEvent(TypeEvent.click, '#livestockCreate .btn-save', (e) => createLivestock(e))
