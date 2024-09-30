import dotenv from "dotenv";
import express from "express";
import productsRouter from "./products/productsRouter.js";
import ordersRouter from "./orders/ordersRouter.js";
import contactsRouter from "./contacts/contactsRouter.js";
import dbService from "./db/mongo.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());
app.use(productsRouter);
app.use(ordersRouter);
app.use(contactsRouter);

await dbService.initializeDb(); // Inicializa a BD

app.listen(PORT, () => {
  console.log("Server running", PORT);
});
