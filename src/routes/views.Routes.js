import express from "express";
import { productsArray } from "./products.html.routes.js";

export const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {
  return res.status(200).render("home", { productsArray });
});
