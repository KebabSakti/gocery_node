import express from "express";
import BannerHandler from "../../../adapter/service/express/customer/banner_handler";

const router = express.Router();
const handler = new BannerHandler();

router.get("/", handler.getAllBanners);

export default router;
