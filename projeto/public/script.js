document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("registrar");
  const loginBtn = document.getElementById("login");
  const trilho = document.getElementById("trilho");
  const body = document.querySelector("body");

  trilho?.addEventListener("click", () => {
    trilho.classList.toggle("dark");
    body.classList.toggle("dark");
  });

  registerBtn?.addEventListener("click", () =>
    container.classList.add("active")
  );
  loginBtn?.addEventListener("click", () =>
    container.classList.remove("active")
  );

  const criarContaForm = document.getElementById("criarContaForm");
  criarContaForm?.addEventListener("submit", criarConta);

  const params = new URLSearchParams(window.location.search);
  const nomeEdicao = params.get("editar");
  const emailEdicao = params.get("email");

  // parte de edição

  if (window.location.pathname.endsWith("home.html")) {
    const paramsHome = new URLSearchParams(window.location.search);
    const nome = paramsHome.get("nome");
    const email = paramsHome.get("email");

    if (nome && email) {
      document.getElementById(
        "mensagemLogin"
      ).innerText = `Seja bem-vindo, ${nome}!`;

      document.getElementById("sairBtn").addEventListener("click", () => {
        window.location.href = "index.html";
      });

      document.getElementById("editarBtn").addEventListener("click", () => {
        window.location.href = `index.html?editar=${nome}&email=${email}`;
      });
    }
  }
});

async function criarConta(event) {
  event.preventDefault();
  const nome = document.getElementById("nomeConta").value.trim();
  const email = document.getElementById("emailConta").value.trim();
  const senha = document.getElementById("senhaConta").value.trim();

  if (!nome || !email || !senha) {
    mostrarToast("Preencha todos os campos", "erro");
    return;
  }

  try {
    const res = await fetch("/criar-conta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();
    mostrarToast(data.mensagem, data.sucesso ? "sucesso" : "erro");
  } catch (err) {
    mostrarToast("Erro ao criar conta", "erro");
  }
}

async function logar(event) {
  event.preventDefault();
  const nome = document.getElementById("nomeUsuario").value.trim();
  const senha = document.getElementById("senhaUsuario").value.trim();

  if (!nome || !senha) {
    mostrarToast("Preencha todos os campos", "erro");
    return;
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
    });
    const data = await res.json();

    if (data.sucesso) {
      const email = data.usuario.email;
      window.location.href = `home.html?nome=${nome}&email=${email}`;
    } else {
      mostrarToast(data.mensagem, "erro");
    }
  } catch (err) {
    mostrarToast("Erro ao logar", "erro");
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
