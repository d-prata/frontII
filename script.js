const caixaForm = document.querySelector(".caixaForm");
const btnEntrar = document.querySelector(".btnEntrar");
const btnCadastrar = document.querySelector(".btnCadastrar");
const body = document.querySelector("body");

// -----> FUNÇÕES <-----
btnCadastrar.onclick = function () {
  caixaForm.classList.add("active");
  body.classList.add("active");
};

btnEntrar.onclick = function () {
  caixaForm.classList.remove("active");
  body.classList.remove("active");
};

// -----> CADASTRAR USUÁRIO <-----

const cadastroConta = document.querySelector("#cadastroConta");

const labelUsuario = document.querySelector("#labelUsuario");
const inputUsuario = document.querySelector("#inputUsuario");
let validaUsuario = false;

const labelSenha = document.querySelector("#labelSenha");
const inputSenha = document.querySelector("#inputSenha");
let validaSenha = false;

const labelConfirmaSenha = document.querySelector("#labelConfirmaSenha");
const inputConfirmaSenha = document.querySelector("#inputConfirmaSenha");
let validaConfirmaSenha = false;

const regraSenha =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// -----> EVENTOS <-----

inputUsuario.addEventListener("keyup", verificarUsuario);
inputSenha.addEventListener("keyup", verificarSenha);
inputConfirmaSenha.addEventListener("keyup", verificarConfirmaSenha);
cadastroConta.addEventListener("submit", verificarInputs);

// -----> FUNCÕES <-----

function verificarUsuario() {
  if (inputUsuario.value.length < 3) {
    labelUsuario.style.color = "#ff0000";
    labelUsuario.innerHTML = `<small>Deve conter o mínimo de 3 letras</small>`;
    inputUsuario.style.border = "3px solid #ff0000";
    validaUsuario = false;
  } else {
    labelUsuario.style.color = "#1E90FF";
    labelUsuario.innerHTML = "";
    inputUsuario.style.border = "3px solid #1E90FF";
    validaUsuario = true;
  }
}

function verificarSenha() {
  let senhaValida = inputSenha.value.match(regraSenha);

  if (inputSenha.value.length < 8) {
    labelSenha.style.color = "#ff0000";
    labelSenha.innerHTML = `<small>Deve conter letra maiúscula, número e caractere especial. (8 dígitos)</small>`;
    inputSenha.style.border = "3px solid #ff0000";
    validaSenha = false;
  } else if (senhaValida === null) {
    labelSenha.innerHTML = `<small>Deve conter letra maiúscula, número e caractere especial. (8 dígitos)</small>`;
    validaSenha = false;
  } else {
    labelSenha.style.color = "#1E90FF";
    labelSenha.innerHTML = "";
    inputSenha.style.border = "3px solid #1E90FF";
    validaSenha = true;
  }
}

function verificarConfirmaSenha() {
  if (inputSenha.value !== inputConfirmaSenha.value) {
    labelConfirmaSenha.style.color = "#ff0000";
    labelConfirmaSenha.innerHTML = `<small>As senhas devem corresponder</small>`;
    inputConfirmaSenha.style.border = "3px solid #ff0000";
    validaConfirmaSenha = false;
  } else {
    labelConfirmaSenha.style.color = "#1E90FF";
    labelConfirmaSenha.innerHTML = "";
    inputConfirmaSenha.style.border = "3px solid #1E90FF";
    validaConfirmaSenha = true;
  }
}

function verificarInputs(e) {
  e.preventDefault();
  if (
    inputUsuario.value == "" ||
    inputSenha.value == "" ||
    inputConfirmaSenha.value == ""
  ) {
    alert("Verifique os campos e tente novamente.");
    return;
  } else if (!validaUsuario || !validaSenha || !validaConfirmaSenha) {
    alert("Campos incorretos! Verifique o preenchimento e tente novamente.");
    return;
  } else {
    alert("Conta cadastrada com sucesso!");
    window.location = "./index.html";
  }
  salvarLocalStorage();
}

function salvarLocalStorage() {
  let loginUser = document.querySelector(".usuarioUser").value;
  let senhaUser = inputSenha.value;
  let recadosUser = [];
  let listaUsers = buscaListaUser();
  let dadosUser = {
    loginUser,
    senhaUser,
    recadosUser,
  };

  console.log(dadosUser);
  listaUsers.push(dadosUser);

  atualizaUser();

  function buscaListaUser() {
    return JSON.parse(localStorage.getItem("usuario")) || [];
  }

  function atualizaUser() {
    return window.localStorage.setItem("usuario", JSON.stringify(listaUsers));
  }
}

// -----> LOGIN USUÁRIO <-----

let login = window.sessionStorage.getItem("caixaForm");

if (login) {
  window.location = "./home.html";

  let inputUsuarioLogin = document.querySelector("#inputUsuarioLogin");
  let inputSenhaLogin = document.querySelector("#inputSenhaLogin");
  let formLogin = document.querySelector("#formLogin");
}

// *EVENTOS:

formLogin.addEventListener("submit", verificaUsuario);

// *FUNÇÕES:

function verificaUsuario(evento) {
  evento.preventDefault();

  let usuarios = buscaListaUser();
  let user = inputUsuarioLogin.value;
  let senha = inputSenhaLogin.value;

  let validaLogin = usuarios.some((elemento) => elemento.loginUser === user);

  let validaSenha = usuarios.some((elemento) => elemento.senhaUser === senha);

  if (validaLogin) {
    if (validaSenha) {
      let posicao = usuarios.findIndex(
        (elemento) => elemento.loginUser === user
      );

      window.sessionStorage.setItem("login", true);
      window.sessionStorage.setItem("indexUser", posicao);
      window.location = "./home.html";
    } else {
      alert("Senha incorreta");
    }
  } else {
    alert("Usuário não localizado");
  }
}

function buscaListaUser() {
  return JSON.parse(localStorage.getItem("usuario")) || [];
}
