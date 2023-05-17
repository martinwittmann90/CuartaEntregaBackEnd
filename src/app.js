import express from "express";
import path from "path";
import { viewsRouter } from "./routes/views.routes.js";
import { productsHtmlRoutes } from "./routes/products.html.routes.js";
import { registerHtmlRoutes } from "./routes/register.html.routes.js";
import { productRouter } from "./routes/product.Routes.js";
import { cartRoutes } from "./routes/cart.Routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
const app = express();
const PORT = 8080 || process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//usando el engine handlerbars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT} at ${new Date().toLocaleString()}`);
});

const socketServer = new Server(httpServer);


//HANDLERS SOCKET
socketServer.on("connection", (socket) => {
  console.log("Un cliente se ha conectado: " + socket.id);

  //ACA RECIBO LOS DATOS DEL FRONT
  socket.on("msg_front_to_back", (data) => {
    console.log(JSON.stringify(data));
  });

  socket.emit("msg_back_to_front", { msg: "hola desde el back al socket" });

  socket.broadcast.emit("msg_back_to_todos_menos_socket", {
    msg: "hola desde el back a todos menos el socket",
  });

  socketServer.emit("msg_back_todos", { msg: "hola desde el back a todos" });

  setInterval(() => {
    socket.emit("msg", { msg: Date.now() + " hola desde el front" });
  }, 3000);
});

//API REST CON JSON
app.use("/api/products", productRouter);
app.use("/api/carts", cartRoutes);

//HTML RENDER SERVER SIDE
app.use("/", viewsRouter);
app.use("/products", productsHtmlRoutes);
app.use("/realTimeProducts", registerHtmlRoutes);


app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no encontrado",
    data: {},
  });
});


