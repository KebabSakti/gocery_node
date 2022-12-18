import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import callbackController from "./adapter/service/express/controller/callback_controller";
import customerAuthController from "./adapter/service/express/controller/customer/auth_controller";
import bannerController from "./adapter/service/express/controller/customer/banner_controller";
import bundleController from "./adapter/service/express/controller/customer/bundle_controller";
import cartController from "./adapter/service/express/controller/customer/cart_controller";
import categoryController from "./adapter/service/express/controller/customer/category_controller";
import productController from "./adapter/service/express/controller/customer/product_controller";
import searchController from "./adapter/service/express/controller/customer/search_controller";
import helperController from "./adapter/service/express/controller/helper_controller";
import customerMiddleware from "./adapter/service/express/middleware/customer/customer_middleware";
import FirebaseAdmin from "./common/service/firebase_admin";
import MongoDB from "./common/service/mongose_database";
import SocketIO from "./common/service/socketio";

dotenv.config();
FirebaseAdmin.init();
MongoDB.connect();

const app = express();
const server = http.createServer(app);
const port = 1001;
const io = new SocketIO(server);

// socket middleware
// io.I.use(socketAuth);

//socket events
io.I.on("connection", (socket) => {
  //socketController(socket, io);
  console.log(socket.id);
});

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route
app.use("/api/customer/auth", customerAuthController);
app.use("/api/customer/categories", customerMiddleware, categoryController);
app.use("/api/customer/banners", customerMiddleware, bannerController);
app.use("/api/customer/products", customerMiddleware, productController);
app.use("/api/customer/bundles", customerMiddleware, bundleController);
app.use("/api/customer/searches", customerMiddleware, searchController);
app.use("/api/customer/carts", customerMiddleware, cartController);
// app.use("/api/customer/orders", customerMiddleware, orderController);

//global
app.use("/api/callback", callbackController);
app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Resource Not Found"));

server.listen(port);

export { io };
