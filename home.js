const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("dbMessage")) ?? [];

const setLocalStorage = (dbMessage) =>
  localStorage.setItem("dbMessage", JSON.stringify(dbMessage));

const modal = document.querySelector(".modal fade");

// -----> C.R.U.D - Create*Read*Update*Delete <-----

// -----> C.R.U.D - Delete <-----
const delMessage = (index) => {
  let dbMessage = readMessage();
  dbMessage.splice(index, 1);
  setLocalStorage(dbMessage);
};

// -----> C.R.U.D - Update <-----
const updateMessage = (index, message) => {
  let dbMessage = readMessage();
  dbMessage[index] = message;
  setLocalStorage(dbMessage);
};

// -----> C.R.U.D - Read <-----
const readMessage = () => getLocalStorage();

// -----> C.R.U.D - Create <-----
const createMessage = (message) => {
  const dbMessage = getLocalStorage();
  dbMessage.push(message);
  setLocalStorage(dbMessage);
};

// -----> INTERAÇÃO COM O LAYOUT <-----
const isValidFields = () => {
  return document.getElementById("modal-adds");
};

const clearFields = () => {
  const fields = document.querySelectorAll(".form-control");
  fields.forEach((field) => (field.value = ""));
};

const saveMessage = () => {
  if (isValidFields()) {
    let message = {
      titulo: document.getElementById("txtTitulo").value,
      descricao: document.getElementById("txtDescricao").value,
    };

    const index = document.getElementById("txtTitulo").dataset.index;
    if (index == "new") {
      createMessage(message);
      updateTable();
      clearFields();
    } else {
      updateMessage(index, message);
      updateTable();
    }
  }
  clearFields();
};

const createRow = (message, index) => {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
  <th scope="col">${message.id}</th>
  <th scope="col">${message.titulo}</th>
  <th scope="col">${message.descricao}</th>
  <th scope="col" style="width: 50px;">
    <button type="button" id="btnEditar-${index}" class="btn btn-outline-dark" data-dismiss="modal" data-toggle="modal"
    data-target="#modalRegistro">Editar</button>
  </th>
  <th scope="col" style="width: 50px;">
    <button type="button" id="btnExcluir-${index}" class="btn btn-outline-danger">Excluir</button>
  </th>
  `;
  document.querySelector("#tblDados>tbody").appendChild(newRow);
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tblDados>tbody tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
  let dbMessage = readMessage();
  clearTable();
  dbMessage.forEach(createRow);
};

const fillFields = (dbMessage) => {
  document.getElementById("txtTitulo").value = dbMessage.titulo;
  document.getElementById("txtDescricao").value = dbMessage.descricao;
  document.getElementById("txtTitulo").dataset.index = dbMessage.index;
};

const editMessage = (index) => {
  let dbMessage = readMessage()[index];
  dbMessage.index = index;
  fillFields(dbMessage);
  clearTable();
};

const editDelete = (event) => {
  if (event.target.type == "button") {
    const [action, index] = event.target.id.split("-");

    if (action == "btnEditar") {
      editMessage(index);
    } else {
      const response = confirm("Deseja realmente excluir a mensagem?");
      if (response) {
        delMessage(index);
        updateTable();
        clearFields();
      }
    }
  }
};

updateTable();

function sairLogin() {
  window.sessionStorage.clear();
  window.location = "./index.html";
}

// -----> EVENTOS <-----
document.getElementById("btnSalvar").addEventListener("click", saveMessage);
document.querySelector("#tblDados>tbody").addEventListener("click", editDelete);
document.querySelector("#logout").addEventListener("click", sairLogin);
