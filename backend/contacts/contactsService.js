import contactsData from "./contactsData.js";

const getContacts = async () => {
  const contacts = await contactsData.getContacts();
  return contacts;
};

const createContacts = async (newContact) => {
  const updatedContacts = await contactsData.createContacts(newContact);
  return updatedContacts;
};

export default {
  getContacts,
  createContacts,
};
