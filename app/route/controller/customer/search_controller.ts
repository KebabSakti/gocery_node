import express from "express";
import SearchHandler from "../../../adapter/service/express/customer/search_handler";

const router = express.Router();
const handler = new SearchHandler();

router.get("/", handler.getSearchKeywords);
router.post("/", handler.addSearchKeyword);
router.delete("/:id", handler.removeSearchKeyword);

export default router;
