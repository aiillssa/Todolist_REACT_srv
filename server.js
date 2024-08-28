import express from "express";
import { MongoClient } from "mongodb";
import { router } from "./routes.js";
import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());

let db;

const uri = process.env.MONGO_URI;
const port = process.env.PORT;

const client = new MongoClient(uri);

client.connect().then(() => {
  db = client.db("updatedTodo").collection("Todos");
  console.log("connected");
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(cors());
app.use("/", router);

app.listen(port, () => {
  console.log("app running");
});
