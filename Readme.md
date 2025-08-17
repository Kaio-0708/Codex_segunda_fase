# Login

## Funcionalidades

### 1. Exibir um campo de texto

- Campo de texto para digitar o nome do(a) usuário(a).
- Botão **"Entrar"**.

### 2. Saudação com Nome

- Após clicar em **"Entrar"**, exibir uma nova tela com a mensagem:
  > **Bem vindo, `<nome da pessoa>`**

### 3. Edição do Nome

- Botão **"Editar"** que retorna à tela de login com o nome já preenchido, permitindo alterações.

### 4. Logout (Sair)

- Botão **"Sair"** que:
  - Apaga o nome armazenado.
  - Retorna à tela de login inicial.

---

## Funcionalidades Extras Implementadas

### 5. Design responsivo

- Adaptável a diferentes tamanhos de tela.

### 6. Modo escuro/claro

- Interruptor que alterna entre o tema escuro e claro da tela inicial. 

---

## Tecnologias Utilizadas

### HTML5

- Estrutura das páginas.

### CSS3

- Responsável pela estilização visual da interface, incluindo layout responsivo e efeitos visuais.

### JavaScript

- Linguagem de programação utilizada para adicionar interatividade e lógica no lado cliente.

### Node.js

- Plataforma baseada em JavaScript para construir a lógica de servidor e a integração com banco de dados.

### MongoDB

- Banco de dados NoSQL orientado a documentos, usado para armazenar dados em formato JSON de forma flexível e escalável.

---

## Como Rodar/Testar a Aplicação

### 1. Clone o Repositório

```bash
   git clone https://github.com/Kaio-0708/Codex_segunda_fase.git
   cd Codex_segunda_fase
```
### 2. Instale as dependências

```
   npm install
```

### 3. Configure as variáveis de ambiente

- Crie um arquivo ```.env``` na raiz do projeto.
- Adicione sua string de conexão com o MongoDB

```env
   MONGO_URI=mongodb://localhost:27017/nomedobanco
```

### 4. Execute o servidor em modo de desenvolvimento

```
   npm run dev
```

- Ou, para rodar em modo padrão:

```
   npm start
```

### 5. Acesse a aplicação no navegador

```
http://localhost:3000

```
- Se você definir a variável ```PORT``` no ```.env```, substitua ```3000``` pela porta especificada.

---

## Divisão de Tarefas do Grupo

### FrontEnd

#### Gledson Perdival

- Utilização do html, css e javaScript para a criação da página inicial de login ,incluindo a adição do modo escuro, e utilização do html para criação dos botões da segunda página, além da responsividade do projeto. Auxilio na implementação de backend e banco de dados. 

#### Lucas Rafael

- Utilização do css para criação do desing da segunda página, pagina da saudação com os botões de editar e voltar, assim como responsividade do projeto. Auxilio na implementação de backend e banco de dados. 

### BackEnd

#### Kaio Victor
- Implementação do banco de dados MongoDb, conexão com a interface web. implementação do registro e login do usuário, utilização do Toastify.js para mostrar mensagens ao usuário (sucesso ou erro), implementação das configurações para hospedagem do site no vercel.

#### Antonio Farias
- implementação da edição de conta do usuário na interface web, com envio para o backend. Criação do README. Auxilio na implementação de backend e banco de dados. 


---

## Site: https://codex-segunda-fase.vercel.app/
