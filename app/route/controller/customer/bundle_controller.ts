import express from "express";
import BundleHandler from "../../../adapter/service/express/customer/bundle_handler";

const router = express.Router();
const handler = new BundleHandler();

router.get("/", handler.getAllBundles);

export default router;
