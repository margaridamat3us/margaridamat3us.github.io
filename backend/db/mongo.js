import {MongoClient} from "mongodb";

// Variável para armazenar a conexão a BD
let db;
let client;

// Função para inicializar a conexão a BD
async function initializeDb() {
  console.log("Initializing DB...");

  if (db) {
    // Já está inicializado
    return;
  }

  // URL de conexão e nome da BD
  const url = process.env.DB_URL; // URL de conexão
  const dbName = process.env.DB_NAME; // Nome da BD

  // Cria uma nova instância de MongoClient
  client = new MongoClient(url);

  try {
    // Conecta ao servidor MongoDB
    await client.connect();
    console.log("Connected to DB!");

    // Obtém a instância do banco de dados
    db = client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
}

// Função para obter a instância da conexão a BD
function getDb() {
  if (!db) {
    throw new Error("DB not initialized, initialize first.");
  }
  return db;
}

// Exporta as funções
export default {
  initializeDb,
  getDb,
};
