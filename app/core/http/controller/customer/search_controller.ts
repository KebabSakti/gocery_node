import express, { Request, Response } from "express";
import SearchOption from "../../../../feature/customer/search-new/entity/search_option";
import SearchUsecase from "../../../../feature/customer/search-new/usecase/search_usecase";
import SearchMongodb from "../../../../feature/customer/search-new/framework/mongodb/search_mongodb";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const usecase = new SearchUsecase(new SearchMongodb());

router.get("/", async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;

    const option: SearchOption = {
      customer: req.app.locals.user,
      keyword: keyword,
    };

    const results = await usecase.index(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
