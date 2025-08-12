const container = document.getElementById('container');
const registerBtn = document.getElementById('registrar');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () =>{
    container.classList.add("active");
})

loginBtn.addEventListener('click', () =>{
    container.classList.remove("active");
})

var contas = new Map();


function criarConta(event){
    event.preventDefault();
    var nomeConta = document.getElementById('nomeConta').value.trim();
    var email = document.getElementById('emailConta').value.trim();
    var senhaConta = document.getElementById('senhaConta').value.trim();
    
    if(contas.has(nomeConta)) {
        alert("Um usuário ja possui esse nome");
        return;
    }

    if(!nomeConta || !email || !senhaConta) {
        alert("Preencha todos os campos para poder criar a sua conta");
        return;
    }

    contas.set(nomeConta, senhaConta);
    alert("Conta criada com sucesso! Mude para a pagina de login e entre no site para aproveitar");
}


function logar(event){
    event.preventDefault();
    var login = document.getElementById('nomeUsuario').value.trim();
    var senha = document.getElementById('senhaUsuario').value.trim();

    if(contas.has(login) && contas.get(login) === senha) {
        localStorage.setItem("nomeLogin", login);
        location.href = "home.html";
        }else{
            alert('usuario ou senha incorretos');
        }
    }

