import { Router } from "express";
import CartManager from "../appManager/cartManager.js";

const cartManager = new CartManager('./src/db/carts.json');
export const cartRouter = Router()

cartRouter.post("/", async (req, res) => {
    try {
        const product = await cartManager.createCart();
        return res.status(201).json({ mesage: "complete cart creation" });
    } catch (error) {
        if (error.message === "error, reading or writting file") {
            res.status(409).json({ message: "cant create cart" })
        }
    }
});

cartRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit
        const carts = await cartManager.getCarts();
        if (limit) {
            res.status(200).json(carts.slice(0, limit));
        } else {
            res.status(200).json(carts);
        }
    } catch (error) {
        res.status(500).json({ message: 'error' })
    }
});

cartRouter.post("/:cartId/product/:productsId", async (req, res) => {
    try {
        const cartId = req.params.cartId
        const productsId = req.params.productsId
        await cartManager.addProductToCart(cartId, productsId);
        return res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
        if (error.message === "Cart not found") {
            res.status(404).json({ message: "Cart not found" });
        } 
    }
});


cartRouter.delete("/:cartId/product/:productsId", async (req, res) => {
    try {
        const cartId = req.params.cartId
        const productsId = req.params.productsId
        await cartManager.removeProductFromCart(cartId, productsId);
        return res.status(201).json({ message: "Product removed from cart" });
    } catch (error) {
        if (error.message === "Cart not found") {
            res.status(404).json({ message: "Cart not found" });
        }
    }
});
