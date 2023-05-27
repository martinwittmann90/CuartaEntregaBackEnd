//IMPORTS
/* const newProductManager = new ProductManager('./src/db/products.json'); */
import express from 'express'
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import {apiRouter} from "./routes/api.routes.js";
import {viewsRouter} from "./routes/view.Routes.js";
import websockets from "./websockets/websockets.js";
import handlebars from 'express-handlebars';
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
//VARIABLES
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
//SERVIDORES
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);
websockets(io);
// SETTING MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
// SETTING HANDLEBARS
app.engine ('handlebars', exphbs.engine());
app.set('views',__dirname + "/views");
app.set("view engine", "handlebars");
// SETTING ROUTES
app.use("/", viewsRouter);
app.use("/api", apiRouter);
//SERVER START
const server = httpServer.listen(PORT, () =>
  console.log(
    `🚀 Server started on port ${PORT}. 
      at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));

app.get('/*', async (req, res) => {
    return res.status(404).json({ status: 'error', message: 'incorrect route' })
  })
