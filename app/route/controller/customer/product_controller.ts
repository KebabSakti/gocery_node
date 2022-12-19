import express from "express";
import ProductHandler from "../../../adapter/service/express/customer/product_handler";

const router = express.Router();
const handler = new ProductHandler();

router.get("/", handler.getAllProduct);
router.get("/:id/show", handler.getProductDetail);
router.get("/views", handler.getViewHistories);

export default router;
