import { Router } from "express";
import {ProductManager} from "../appManager/productManager.js";
import { uploader } from "../utils.js";

const newProductManager = new ProductManager('./src/db/products.json');
export const productRouter = Router()

productRouter.get("/", async (req, res) => {
    try {
        
        const limit = req.query.limit
        const products = await newProductManager.getProducts();
        if (limit) {
            res.status(200).json(products.slice(0, limit));
        } else {
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
    }
});

productRouter.get("/:productsId", async (req, res) => {
    try {
        const id = (req.params.productsId);
        const product = await newProductManager.getProductById(id);
        if (product) {
            res.status(200).json(product);
        }
    } catch (error) {
        if (error.message === "Product not found") {
            res.status(404).json({ message: "Product not found" })
        } else {
            console.log(error);
            res.status(500).json({ message: 'error' })
        }
    }
});

productRouter.post("/", uploader.single('thumbnails'), async (req, res) => {
    const newProduct = req.body;
    newProduct.thumbnails ="http://localhost:8080/" + req.file.filename;
    console.log(newProduct);
    try {
        const product = await newProductManager.addProduct(newProduct);
        return res.status(201).json(product);
    } catch (error) {
        if (error.message === "duplicate code") {
            res.status(409).json({ message: "error, duplicate code" })
        }
        else if (error.message === "ID is being sent") {
            res.status(409).json({ message: "problems with ID" })

        }
        else if (error.message === "data is missing") {
            res.status(404).json({ message: "At least one piece of data is missing" })

        }
    }
});

productRouter.put("/:id", async (req, res) => {
    try {
        const newProduct = req.body;
        if (newProduct.id) {
            return res.status(400).json({ error: "Cannot modify id", });
        }
        const id = req.params.id;
        const product = await newProductManager.updateProduct(id, newProduct);
        return res.status(201).json({ mesage: "Complete update ok" });
    } catch (error) {
        if (error.message === "Duplicate code product") {
            res.status(409).json({ message: "Duplicate code" })
        }
        else if (error.message === "Product not found with id") {
            res.status(404).json({ message: "Product no found" })

        } 
    }
});

productRouter.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await newProductManager.deleteProduct(id);
        return res.status(200).json({ message: 'Deleted product' })
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: "Product not found" })
        }
    }
});
