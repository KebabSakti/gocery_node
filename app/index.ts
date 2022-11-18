import express, { Express, Response } from "express";
import customerAuthController from "./core/http/controller/customer/auth_controller";
import bannerController from "./core/http/controller/customer/banner_controller";
import bundleController from "./core/http/controller/customer/bundle_controller";
// import cartController from "./core/http/controller/customer/cart_controller";
import categoryController from "./core/http/controller/customer/category_controller";
import orderController from "./core/http/controller/customer/order_controller";
import productController from "./core/http/controller/customer/product_controller";
import searchController from "./core/http/controller/customer/search_controller";
import customerUserController from "./core/http/controller/customer/user_controller";
import helperController from "./core/http/controller/helper_controller";
import baseMiddleware from "./core/http/middleware/base_middleware";
import MongoDB from "./core/service/mongose_database";

const app: Express = express();
const port: Number = 1001;

MongoDB.connect();

app.use(baseMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/customer/auth", customerAuthController);
app.use("/api/customer/users", customerUserController);
app.use("/api/customer/categories", categoryController);
app.use("/api/customer/banners", bannerController);
app.use("/api/customer/products", productController);
app.use("/api/customer/bundles", bundleController);
app.use("/api/customer/searches", searchController);
// app.use("/api/customer/carts", cartController);
app.use("/api/customer/orders", orderController);

app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res: Response) => res.status(404).json("Resource Not Found"));

app.listen(port);
