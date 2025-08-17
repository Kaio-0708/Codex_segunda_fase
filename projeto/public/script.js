document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const registerBtn = document.getElementById("registrar");
  const loginBtn = document.getElementById("login");
  const trilho = document.getElementById("trilho");
  const body = document.querySelector("body");

  // Função para alternar tema dark/light
  trilho?.addEventListener("click", () => {
    trilho.classList.toggle("dark");
    body.classList.toggle("dark");
  });

  // Alternar entre formulários de login/cadastro
  registerBtn?.addEventListener("click", () => container.classList.add("active"));
  loginBtn?.addEventListener("click", () => container.classList.remove("active"));

  // Verificar se está em modo de edição
  const params = new URLSearchParams(window.location.search);
  const nomeEdicao = params.get("editar");
  const emailEdicao = params.get("email");
  
  if (nomeEdicao) {
    configurarModoEdicao(nomeEdicao, emailEdicao);
  }

  // Configurações específicas da home.html
  if (window.location.pathname.endsWith("home.html")) {
    configurarHomePage();
  }
});

// Função para configurar o modo de edição
function configurarModoEdicao(nomeEdicao, emailEdicao) {
  const container = document.getElementById("container");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");
  const nomeInput = document.getElementById("nomeConta");
  const emailInput = document.getElementById("emailConta");
  const senhaInput = document.getElementById("senhaConta");

  formTitle.innerText = "Edite sua conta";
  submitBtn.innerText = "Salvar Alterações";
  container.classList.add("active");

  nomeInput.value = nomeEdicao;
  nomeInput.readOnly = true;
  emailInput.value = emailEdicao || "";
  senhaInput.value = "";

  submitBtn.replaceWith(submitBtn.cloneNode(true));
  const novoSubmitBtn = document.getElementById("submitBtn");

  novoSubmitBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!email || !senha) {
      mostrarToast("Preencha todos os campos", "erro");
      return;
    }

    try {
      const res = await fetch(`/api/editar/${nomeEdicao}`, {  // Adicionado /api/
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      
      if (!res.ok) throw new Error(res.statusText);
      
      const data = await res.json();
      mostrarToast(data.mensagem, data.sucesso ? "sucesso" : "erro");

      if (data.sucesso) {
        setTimeout(() => {
          window.location.href = `home.html?nome=${nomeEdicao}&email=${email}`;
        }, 1500);
      }
    } catch (err) {
      console.error("Erro ao editar:", err);
      mostrarToast("Erro ao atualizar dados", "erro");
    }
  });
}

// Função para configurar a página home
function configurarHomePage() {
  const paramsHome = new URLSearchParams(window.location.search);
  const nome = paramsHome.get("nome");
  const email = paramsHome.get("email");

  if (nome && email) {
    document.getElementById("mensagemLogin").innerText = `Seja bem-vindo, ${nome}!`;

    document.getElementById("sairBtn").addEventListener("click", () => {
      window.location.href = "index.html";
    });

    document.getElementById("editarBtn").addEventListener("click", () => {
      window.location.href = `index.html?editar=${nome}&email=${email}`;
    });
  }
}

// Função para criar conta (POST)
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
    const res = await fetch("/api/criar-conta", {  // Adicionado /api/
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });
    
    if (!res.ok) throw new Error(res.statusText);
    
    const data = await res.json();
    mostrarToast(data.mensagem, data.sucesso ? "sucesso" : "erro");
  } catch (err) {
    console.error("Erro ao criar conta:", err);
    mostrarToast("Erro ao criar conta", "erro");
  }
}

// Função para fazer login (POST)
async function logar(event) {
  event.preventDefault();
  const nome = document.getElementById("nomeUsuario").value.trim();
  const senha = document.getElementById("senhaUsuario").value.trim();

  if (!nome || !senha) {
    mostrarToast("Preencha todos os campos", "erro");
    return;
  }

  try {
    const res = await fetch("/api/login", {  // Adicionado /api/
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, senha }),
    });
    
    if (!res.ok) throw new Error(res.statusText);
    
    const data = await res.json();

    if (data.sucesso) {
      const email = data.usuario.email;
      window.location.href = `home.html?nome=${nome}&email=${email}`;
    } else {
      mostrarToast(data.mensagem, "erro");
    }
  } catch (err) {
    console.error("Erro no login:", err);
    mostrarToast("Erro ao logar", "erro");
  }
}

// Função para exibir notificações Toast
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

// Adiciona event listeners para os formulários
const criarContaForm = document.getElementById("criarContaForm");
const loginForm = document.getElementById("loginForm");

criarContaForm?.addEventListener("submit", criarConta);
loginForm?.addEventListener("submit", logar);
