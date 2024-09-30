import dbService from "../db/mongo.js";

const contactsCollection = "contacts";

// Obter todas as orders
const getContacts = async () => {
  const db = await dbService.getDb();
  const contacts = await db.collection(contactsCollection).find().toArray();
  return contacts;
};

// Adicionar uma nova order
const createContacts = async (newContact) => {
  const db = await dbService.getDb();
  const result = await db.collection(contactsCollection).insertOne({
    ...newContact,
    createdAt: new Date(), // Adiciona a data de criação
  });
  return result.insertedId;
};

export default {
  getContacts,
  createContacts,
};
