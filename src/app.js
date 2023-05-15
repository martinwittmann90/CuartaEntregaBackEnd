import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import path from "path";
import { petsRouter } from "./routes/pets.router.js";
import { usersHtmlRouter } from "./routes/users.html.router.js";
import { productRouter } from "./routes/product.Routes.js";

import { productsHtmlRoutes } from "./routes/products.html.routes.js";

import { productRoutes } from "./routes/product.Routes.js";
import { cartRoutes } from "./routes/cart.Routes.js";

import { usersRouter } from "./routes/users.router.js";
import { viewsRouter } from "./routes/views.Routes.js";

import { Server } from "socket.io";

const app = express();
const PORT = 8080 || process.env.PORT;

const httpServer = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT} at ${new Date().toLocaleString()}`);
});

const socketServer = new Server(httpServer);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

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
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

//HTML RENDER SERVER SIDE
app.use("/", viewsRouter);
app.use("/users", usersHtmlRouter);
app.use("/products", productsHtmlRoutes);


app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no encontrado",
    data: {},
  });
});


