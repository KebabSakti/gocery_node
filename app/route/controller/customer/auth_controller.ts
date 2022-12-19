import express from "express";
import AuthHandler from "../../../adapter/service/express/customer/auth_handler";

const router = express.Router();
const handler = new AuthHandler();

router.post("/", handler.createUser);

export default router;
