import * as dotenv from "dotenv";
import express from "express";
import http from "http";
import FirebaseAdmin from "./common/service/firebase_admin";
import MongoDB from "./common/service/mongose_database";
import SocketIO from "./common/service/socketio";
import callbackController from "./route/controller/callback_controller";
import customerAuthController from "./route/controller/customer/auth_controller";
import bannerController from "./route/controller/customer/banner_controller";
import bundleController from "./route/controller/customer/bundle_controller";
import cartController from "./route/controller/customer/cart_controller";
import categoryController from "./route/controller/customer/category_controller";
import orderController from "./route/controller/customer/order_controller";
import productController from "./route/controller/customer/product_controller";
import searchController from "./route/controller/customer/search_controller";
import helperController from "./route/controller/helper_controller";
import socketController from "./route/controller/socket_controller";
import customerMiddleware from "./route/middleware/customer/customer_middleware";

dotenv.config();
FirebaseAdmin.init();
MongoDB.connect();

const app = express();
const server = http.createServer(app);
const port = 1001;
const io = new SocketIO(server);

//socketio
socketController(io.I);

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
app.use("/api/customer/orders", customerMiddleware, orderController);

//global
app.use("/api/callback", callbackController);
app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Resource Not Found"));

server.listen(port);
