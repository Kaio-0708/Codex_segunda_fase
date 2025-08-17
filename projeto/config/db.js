const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${user}:${password}@cluster0.aa30dnf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    console.log("MongoDB Atlas conectado!");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
}

module.exports = connect;
