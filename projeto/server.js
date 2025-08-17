const express = require("express");
const path = require("path");
const connect = require("./config/db");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let usuariosCollection;

connect()
  .then((db) => {
    usuariosCollection = db.collection("usuarios");
    console.log("Conexão com MongoDB estabelecida!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/criar-conta", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.json({ sucesso: false, mensagem: "Preencha todos os campos" });
  }

  try {
    const existe = await usuariosCollection.findOne({ nome });
    if (existe) {
      return res.json({ sucesso: false, mensagem: "Nome já existe" });
    }

    await usuariosCollection.insertOne({ nome, email, senha });
    res.json({ sucesso: true, mensagem: "Conta criada com sucesso!" });
  } catch (err) {
    res.json({ sucesso: false, mensagem: "Erro ao criar conta" });
  }
});

app.post("/api/login", async (req, res) => {
  const { nome, senha } = req.body;

  try {
    const usuario = await usuariosCollection.findOne({ nome, senha });
    if (!usuario) {
      return res.json({
        sucesso: false,
        mensagem: "Usuário ou senha incorretos",
      });
    }

    res.json({ sucesso: true, usuario });
  } catch (err) {
    res.json({ sucesso: false, mensagem: "Erro ao fazer login" });
  }
});

app.put("/api/editar/:nome", async (req, res) => {
  const { nome } = req.params;
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.json({ sucesso: false, mensagem: "Preencha todos os campos" });
  }

  try {
    const resultado = await usuariosCollection.updateOne(
      { nome },
      { $set: { email, senha } }
    );

    if (resultado.matchedCount === 0) {
      return res.json({ sucesso: false, mensagem: "Usuário não encontrado" });
    }

    res.json({ sucesso: true, mensagem: "Dados atualizados com sucesso!" });
  } catch (err) {
    res.json({ sucesso: false, mensagem: "Erro ao atualizar dados" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);

module.exports = app;
