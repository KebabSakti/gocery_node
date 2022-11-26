import express, { Response } from "express";
import http from "http";
import callbackController from "./core/http/controller/callback_controller";
import customerAuthController from "./core/http/controller/customer/auth_controller";
import bannerController from "./core/http/controller/customer/banner_controller";
import bundleController from "./core/http/controller/customer/bundle_controller";
import cartController from "./core/http/controller/customer/cart_controller";
import categoryController from "./core/http/controller/customer/category_controller";
import orderController from "./core/http/controller/customer/order_controller";
import productController from "./core/http/controller/customer/product_controller";
import searchController from "./core/http/controller/customer/search_controller";
import customerUserController from "./core/http/controller/customer/user_controller";
import viewController from "./core/http/controller/customer/view_controller";
import helperController from "./core/http/controller/helper_controller";
import socketController from "./core/http/controller/socket_controller";
import baseMiddleware from "./core/http/middleware/base_middleware";
import customerMiddleware from "./core/http/middleware/customer/customer_middleware";
import FirebaseAdmin from "./core/service/firebase_admin";
import MongoDB from "./core/service/mongose_database";
import SocketIO from "./core/service/socketio";

const app = express();
const server = http.createServer(app);
const port = 1001;
const io = new SocketIO(server);

const authMiddleware = customerMiddleware;

FirebaseAdmin.init();
MongoDB.connect();

app.use(baseMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//socket events
io.I.on("connection", socketController);

//route
app.use("/api/customer/auth", customerAuthController);
app.use("/api/customer/users", authMiddleware, customerUserController);
app.use("/api/customer/categories", authMiddleware, categoryController);
app.use("/api/customer/banners", authMiddleware, bannerController);
app.use("/api/customer/products", authMiddleware, productController);
app.use("/api/customer/bundles", authMiddleware, bundleController);
app.use("/api/customer/searches", authMiddleware, searchController);
app.use("/api/customer/views", authMiddleware, viewController);
app.use("/api/customer/carts", authMiddleware, cartController);
app.use("/api/customer/orders", authMiddleware, orderController);

app.use("/api/callback", callbackController);
app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res: Response) => res.status(404).json("Resource Not Found"));

server.listen(port);

export { io };
