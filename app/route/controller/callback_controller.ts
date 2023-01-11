import express from "express";
import CallbackHandler from "../../adapter/service/express/customer/callback_handler";

const router = express.Router();
const callbackHandler = new CallbackHandler();

router.post("/xendit", callbackHandler.xendit);

export default router;
