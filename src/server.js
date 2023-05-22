import express from 'express'
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import { __dirname } from './utils.js';
import path from "path";

import {apiRouter} from "./routes/api.routes.js";
import {viewsRouter} from "./routes/view.Routes.js";

import { ProductManager } from './appManager/productManager.js';
import CartManager from './appManager/cartManager.js';

const newProductManager = new ProductManager('./src/db/products.json');

const app = express();
const PORT = 8080;

// SETTING MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
// SETTING HANDLEBARS
app.engine ('handlebars', handlebars.engine());
app.set('view engine','handlebars');
app.set('views', __dirname + '/views');
// SETTING ROUTES
app.use("/", viewsRouter);
app.use("/api", apiRouter);
// STARTING SERVER
const httpServer = app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} at ${new Date().toLocaleString()}`);
  });
//WEBSOCKET CONNECTION
const socketServer = new Server (httpServer);
//New client connection
socketServer.on("connection",(socket) => {
    console.log("Client connected" + socket.id);
    
    socket.on("new-product", async (newProd) =>{
        try {
            const productList = await newProductManager.getProducts ();
            await newProductManager.addProduct( {...newProd});
            socket.emit("createProductSuccess", productList ); 

        } catch (error) {
            console.log(error.message);
            socket.emit("createProductFailure",error.message); 
        }
    });
    
socket.on("delete-product", async (deleteProd) =>{
    try {
        await newProductManager.deleteProduct(deleteProd);
        const productList = await newProductManager.getProducts (); 
        socket.emit("createProductSuccess", productList); 

    } catch (error) {
        console.log(error.message);
        socket.emit("createProductFailure",error.message); 
    }
});
});

app.get('/*', async (req, res) => {
    return res.status(404).json({ status: 'error', message: 'incorrect route' })
  })

export const productManager = new ProductManager("productos.json");

