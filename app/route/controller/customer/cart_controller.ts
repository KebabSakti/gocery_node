import express from "express";
import CartHandler from "../../../adapter/service/express/customer/cart_handler";

const router = express.Router();
const handler = new CartHandler();

router.get("/", handler.getCartDetail);
router.post("/", handler.updateCart);
router.delete("/", handler.clearCart);

export default router;
