import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swaggerDocument";
import booksRouter from "./routes/books";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${4000}`);
  console.log(`Swagger disponível em http://localhost:${4000}/api-docs`);
});