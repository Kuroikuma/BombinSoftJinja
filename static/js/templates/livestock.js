import { addEvent, TypeEvent } from "../config/eventListener.js";
import { dtb }  from "../config/dataTable.js";
import Alert from "../config/Alert.js"

//('[atributo="valor"]')

let table = dtb("myTable");

const actionModal = (a) => {
  let id = a.parentNode.parentNode.children[0].innerHTML

  let idModal = a.dataset.bsTarget

  let modal = document.querySelector(idModal)

  let buttonDelete =  modal.querySelector('.btn-delete') || modal.querySelector('.btn-save')

  buttonDelete.dataset.id =  id
}

const deleteLivetock = (e) => {

  let  id = e.dataset.id
  let tr = document.getElementById(id)

  var row = table.row(tr.closest('tr'));
  row.remove().draw();

  e.dataset.id = ""
  e.parentNode.querySelector(".btn-secondary").click()

  new Alert(
    "No se realizo la edición, puede ser de que la edición ya este cerrada para esta fecha.",
    { type: "danger" }
  );
  
}

addEvent(TypeEvent.click, `[data-bs-toggle="modal"]`, (e) => actionModal(e));

addEvent(TypeEvent.click, ".btn-delete", (e) => deleteLivetock(e));