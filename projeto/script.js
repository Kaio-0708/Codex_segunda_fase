let trilho = document.getElementById("trilho");
let body = document.querySelector("body");
const container = document.getElementById("container");
const registerBtn = document.getElementById("registrar");
const loginBtn = document.getElementById("login");

trilho.addEventListener("click", () => {
  trilho.classList.toggle("dark");
  body.classList.toggle("dark");
});

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

var contas = new Map();

function criarConta(event) {
  event.preventDefault();
  var nomeConta = document.getElementById("nomeConta").value.trim();
  var email = document.getElementById("emailConta").value.trim();
  var senhaConta = document.getElementById("senhaConta").value.trim();

  if (contas.has(nomeConta)) {
    mostrarToast("Um usuário já possui esse nome", "erro");
    return;
  }

  if (!nomeConta || !email || !senhaConta) {
    mostrarToast(
      "Preencha todos os campos para poder criar a sua conta",
      "erro"
    );
    return;
  }

  contas.set(nomeConta, senhaConta);
  mostrarToast("Conta criada com sucesso! Agora faça login", "sucesso");
}

function logar(event) {
  event.preventDefault();
  var login = document.getElementById("nomeUsuario").value.trim();
  var senha = document.getElementById("senhaUsuario").value.trim();

  if (!contas.has(login)) {
    mostrarToast("Esse usuário não existe", "erro");
    return;
  }
  if (contas.has(login) && contas.get(login) === senha) {
    localStorage.setItem("nomeLogin", login);
    location.href = "home.html";
  } else {
    mostrarToast("Usuário ou senha incorretos", "erro");
  }
}

function mostrarToast(mensagem, tipo) {
  Toastify({
    text: mensagem,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor:
      tipo === "sucesso"
        ? "linear-gradient(200deg, #0b152c, #092050)"
        : "linear-gradient(200deg, #500000, #a00000)",
  }).showToast();
}
