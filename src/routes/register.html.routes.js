import express from "express";

export const registerHtmlRoutes = express.Router();
registerHtmlRoutes.get("/", (req, res) => {
  return res.status(200).render("realTimeProducts", { });
});
