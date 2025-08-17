const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB;

const uri = `mongodb+srv://${user}:${password}@cluster0.aa30dnf.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
  global._mongoClientPromise = clientPromise;
} else {
  clientPromise = global._mongoClientPromise;
}

async function getCollection() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return db.collection("usuarios");
}

module.exports = getCollection;
