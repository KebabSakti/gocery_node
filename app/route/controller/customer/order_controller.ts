import express from "express";
import OrderHandler from "../../../adapter/service/express/customer/order_handler";

const router = express.Router();
const handler = new OrderHandler();

console.log("order controller");

router.get("/:orderId", handler.getOrderDetail);
router.post("/", handler.updateOrderSummary);
router.put("/", handler.submitOrder);

export default router;
