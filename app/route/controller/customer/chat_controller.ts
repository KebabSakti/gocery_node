import express from "express";
import ChatHandler from "../../../adapter/service/express/customer/chat_handler";

const router = express.Router();
const handler = new ChatHandler();

router.get("/:session", handler.getChatSession);

export default router;
