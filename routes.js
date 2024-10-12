import express from "express";
import { createTask, deleteTodo, findByName, getAll, upsert } from "./crud.js";
import { agenda } from "./chatgpt.js";

export const router = express.Router();

router.get("/api/find/:taskID", findByName);
router.get("/api/loadAll", getAll);
router.post("/api/create", createTask);
router.post("/api/update/:taskID", upsert);
router.delete("/api/delete/:taskID", deleteTodo);
router.get("/chatgpt", agenda);
