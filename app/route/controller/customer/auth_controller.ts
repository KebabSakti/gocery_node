import express from "express";
import CustomerHandler from "../../../adapter/service/express/customer/customer_handler";

const router = express.Router();
const handler = new CustomerHandler();

router.post("/", handler.createUser);

export default router;
