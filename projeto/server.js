const express = require("express");
const path = require("path");
const cors = require("cors"); // Adicionado CORS
const getCollection = require("./config/db");
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API Routes - Todas prefixadas com /api
app.post("/api/criar-conta", async (req, res) => {
  const { nome, email, senha } = req.body;
  const collection = await getCollection();

  if (!nome || !email || !senha) {
    return res.status(400).json({ 
      sucesso: false, 
      mensagem: "Preencha todos os campos" 
    });
  }

  try {
    const existe = await collection.findOne({ nome });
    if (existe) {
      return res.status(409).json({ 
        sucesso: false, 
        mensagem: "Nome já existe" 
      });
    }

    await collection.insertOne({ nome, email, senha });
    res.status(201).json({ 
      sucesso: true, 
      mensagem: "Conta criada com sucesso!" 
    });
  } catch (err) {
    console.error("Erro ao criar conta:", err);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: "Erro ao criar conta" 
    });
  }
});

app.post("/api/login", async (req, res) => {
  const { nome, senha } = req.body;
  const collection = await getCollection();

  try {
    const usuario = await collection.findOne({ nome, senha });
    if (!usuario) {
      return res.status(401).json({ 
        sucesso: false, 
        mensagem: "Usuário ou senha incorretos" 
      });
    }

    res.json({ 
      sucesso: true, 
      usuario: {
        nome: usuario.nome,
        email: usuario.email
      } 
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: "Erro ao fazer login" 
    });
  }
});

app.put("/api/editar/:nome", async (req, res) => {
  const { nome } = req.params;
  const { email, senha } = req.body;
  const collection = await getCollection();

  if (!email || !senha) {
    return res.status(400).json({ 
      sucesso: false, 
      mensagem: "Preencha todos os campos" 
    });
  }

  try {
    const resultado = await collection.updateOne(
      { nome },
      { $set: { email, senha } }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ 
        sucesso: false, 
        mensagem: "Usuário não encontrado" 
      });
    }

    res.json({ 
      sucesso: true, 
      mensagem: "Dados atualizados com sucesso!" 
    });
  } catch (err) {
    console.error("Erro ao editar:", err);
    res.status(500).json({ 
      sucesso: false, 
      mensagem: "Erro ao atualizar dados" 
    });
  }
});

module.exports = app;
