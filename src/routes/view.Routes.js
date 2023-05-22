import { Router } from "express";
import { ProductManager } from "../appManager/productManager.js";
const newProductManager = new ProductManager("./src/db/products.json");
export const viewsRouter = Router()

viewsRouter.get("/", async (req, res) => {
    try {
        const products = await newProductManager.getProducts();
        return res.status(200).render("home", { products: products });
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