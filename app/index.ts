import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import callbackController from "./core/http/controller/callback_controller";
import customerAuthController from "./core/http/controller/customer/auth_controller";
import bannerController from "./core/http/controller/customer/banner_controller";
import bundleController from "./core/http/controller/customer/bundle_controller";
import categoryController from "./core/http/controller/customer/category_controller";
import productController from "./core/http/controller/customer/product_controller";
import searchController from "./core/http/controller/customer/search_controller";
import helperController from "./core/http/controller/helper_controller";
import socketController from "./core/http/controller/socket_controller";
import customerMiddleware from "./core/http/middleware/customer/customer_middleware";
import socketAuth from "./core/http/middleware/socket_auth";
import FirebaseAdmin from "./core/service/firebase_admin";
import MongoDB from "./core/service/mongose_database";
import SocketIO from "./core/service/socketio";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = 1001;
const io = new SocketIO(server);

FirebaseAdmin.init();
MongoDB.connect();

// socket middleware
io.I.use(socketAuth);
//socket events
io.I.on("connection", (socket) => {
  socketController(socket, io);
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
// app.use("/api/customer/carts", authMiddleware, cartController);
// app.use("/api/customer/orders", authMiddleware, orderController);

//global
app.use("/api/callback", callbackController);
app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Resource Not Found"));

server.listen(port);

export { io };
