import ProductManager from "../appManager/productManager.js";
const path = "src/db/products.json";
const newProductManager = new ProductManager(path);

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New client websocket: ", socket.id);
    socket.on("new-product", async (data) => {
      console.log(data);
      try {
        await newProductManager.addProduct(data);
        const productListUpdated = await newProductManager.getProducts();
        io.sockets.emit("refresh-products", productListUpdated);
      } catch (err) {
        console.log(err);
      }
    });
  });
};
