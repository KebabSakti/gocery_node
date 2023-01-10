import express from "express";
import PaymentHandler from "../../../adapter/service/express/customer/payment_handler";

const router = express.Router();
const handler = new PaymentHandler();

router.get("/", handler.getAllPaymentMethods);
router.get("/:id", handler.getPaymentDetailById);

export default router;
