import express from 'express'
import {apiRouter} from "./routes/api.routes.js";
import { __dirname } from './utils.js';
import path from "path";
import handlebars from 'express-handlebars';
import {viewsRouter} from "./routes/view.Routes.js";
import { Server } from "socket.io";
import ProductManager from './appManager/productManager.js';


const newProductManager = new ProductManager('./src/db/products.json');

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT} at ${new Date().toLocaleString()}`);
  });

const socketServer = new Server (httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine ('handlebars', handlebars.engine());
app.set('view engine','handlebars');
app.set('views', __dirname + '/views');

app.use("/", viewsRouter);
app.use("/api", apiRouter);

socketServer.on("connection",(socket) => {
    console.log("Client connected" + socket.id);
    socket.on('createProduct', async (pdata) =>{
        try {
            const product = await newProductManager.addProduct(pdata);
            socket.emit("createProductSuccess", pdata); 

        } catch (error) {
            console.log(error.message);
            socket.emit("createProductFailure",error.message); 
        }
    });
    socket.on('deleteProduct', async (id) =>{
        try {
            const product = await newProductManager.deleteProduct(id);
            socket.emit("createProductSuccess", pdata); 

        } catch (error) {
            console.log(error.message);
            socket.emit("createProductFailure",error.message); 
        }
    });
});
