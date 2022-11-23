import express, { Express, Response } from "express";
import customerAuthController from "./core/http/controller/customer/auth_controller";
import bannerController from "./core/http/controller/customer/banner_controller";
import bundleController from "./core/http/controller/customer/bundle_controller";
import cartController from "./core/http/controller/customer/cart_controller";
import categoryController from "./core/http/controller/customer/category_controller";
import orderController from "./core/http/controller/customer/order_controller";
import productController from "./core/http/controller/customer/product_controller";
import searchController from "./core/http/controller/customer/search_controller";
import viewController from "./core/http/controller/customer/view_controller";
import customerUserController from "./core/http/controller/customer/user_controller";
import helperController from "./core/http/controller/helper_controller";
import baseMiddleware from "./core/http/middleware/base_middleware";
import customerMiddleware from "./core/http/middleware/customer/customer_middleware";
import MongoDB from "./core/service/mongose_database";
import FirebaseAdmin from "./core/service/firebase_admin";

const app: Express = express();
const port: Number = 1001;

const authMiddleware = customerMiddleware;

FirebaseAdmin.init();
MongoDB.connect();

app.use(baseMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res: Response) => res.status(404).json("Resource Not Found"));

app.listen(port);
