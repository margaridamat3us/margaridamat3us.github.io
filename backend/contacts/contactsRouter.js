import express from "express";
import contactsService from "./contactsService.js";
import contactsSchemas from "./contactsSchemas.js";

const router = express.Router();

router.get("/contacts", async (req, res) => {
  const contacts = await contactsService.getContacts();
  res.json(contacts);
});

router.post("/contacts", async (req, res) => {
  const { error, value } = contactsSchemas.createContactSchema.validate(
    req.body
  );

  if (error) {
    return res.status(400).send(error.message);
  }

  const updatedContactsList = await contactsService.createContacts(value);
  res.json(updatedContactsList);
});

export default router;
