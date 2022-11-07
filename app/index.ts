import express, { Express, Response } from "express";
import baseMiddleware from "./core/http/middleware/base_middleware";
import customerMiddleware from "./core/http/middleware/customer/customer_middleware";
import customerAuthController from "./core/http/controller/customer/auth_controller";
import customerUserController from "./core/http/controller/customer/user_controller";
import categoryController from "./core/http/controller/customer/category_controller";
import bannerController from "./core/http/controller/customer/banner_controller";
import helperController from "./core/http/controller/helper_controller";

const app: Express = express();
const port: Number = 1001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(baseMiddleware);

app.use("/api/customer/auth", customerAuthController);
app.use("/api/customer/user", customerUserController);
app.use("/api/customer/categories", categoryController);
app.use("/api/customer/banners", bannerController);

app.use("/api/helper", helperController);

//route not found 404
app.use("*", (_, res: Response) => res.status(404).json("Resource Not Found"));

app.listen(port);
