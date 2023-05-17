import { Router } from "express";
import ProductManager from "../appManager/productManager.js";

export const viewsRouter = Router()
const newProductManager = new ProductManager('./src/db/products.json');

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await newProductManager.getProducts();
        return res.status(200).render("home", {products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error' })
    }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await newProductManager.getProducts();
        return res.status(200).render("realTimeProducts", {products});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error' })
    }
});