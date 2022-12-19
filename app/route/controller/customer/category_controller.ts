import express from "express";
import CategoryHandler from "../../../adapter/service/express/customer/category_handler";

const router = express.Router();
const handler = new CategoryHandler();

router.get("/", handler.getAllCategories);

export default router;
