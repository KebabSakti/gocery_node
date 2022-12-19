import express from "express";
import OrderHandler from "../../../adapter/service/express/customer/order_handler";

const router = express.Router();
const handler = new OrderHandler();

router.post("/", handler.updateOrderSummary);

export default router;
