const express = require("express");
const path = require("path");
const getCollection = require("./config/db");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/criar-conta", async (req, res) => {
  const { nome, email, senha } = req.body;
  const collection = await getCollection();

  if (!nome || !email || !senha) return res.json({ sucesso: false, mensagem: "Preencha todos os campos" });

  try {
    const existe = await collection.findOne({ nome });
    if (existe) return res.json({ sucesso: false, mensagem: "Nome já existe" });

    await collection.insertOne({ nome, email, senha });
    res.json({ sucesso: true, mensagem: "Conta criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.json({ sucesso: false, mensagem: "Erro ao criar conta" });
  }
});

app.post("/login", async (req, res) => {
  const { nome, senha } = req.body;
  const collection = await getCollection();

  try {
    const usuario = await collection.findOne({ nome, senha });
    if (!usuario) return res.json({ sucesso: false, mensagem: "Usuário ou senha incorretos" });

    res.json({ sucesso: true, usuario });
  } catch (err) {
    console.error(err);
    res.json({ sucesso: false, mensagem: "Erro ao fazer login" });
  }
});

app.put("/editar/:nome", async (req, res) => {
  const { nome } = req.params;
  const { email, senha } = req.body;
  const collection = await getCollection();

  if (!email || !senha) return res.json({ sucesso: false, mensagem: "Preencha todos os campos" });

  try {
    const resultado = await collection.updateOne(
      { nome },
      { $set: { email, senha } }
    );

    if (resultado.matchedCount === 0) return res.json({ sucesso: false, mensagem: "Usuário não encontrado" });

    res.json({ sucesso: true, mensagem: "Dados atualizados com sucesso!" });
  } catch (err) {
    console.error(err);
    res.json({ sucesso: false, mensagem: "Erro ao atualizar dados" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = app;
