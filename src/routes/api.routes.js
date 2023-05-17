import { Router } from "express";
import {productRouter} from "./products.routes.js";
import {cartRouter} from "./carts.routes.js";

export const apiRouter = Router()

apiRouter.use("/products", productRouter)
apiRouter.use("/carts", cartRouter)