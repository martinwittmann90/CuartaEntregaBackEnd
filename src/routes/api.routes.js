import { Router } from "express";
import router from "./products.routes.js";
import cartRouter from "./carts.routes.js";

export const apiRouter = Router()

apiRouter.use("/products", router)
apiRouter.use("/carts", cartRouter)