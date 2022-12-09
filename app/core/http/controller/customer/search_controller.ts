import express, { Request, Response } from "express";
import SearchModel from "../../../../feature/customer/search/entity/model/search_model";
import SearchOption from "../../../../feature/customer/search/entity/model/search_option";
import SearchValidatorJoi from "../../../../feature/customer/search/framework/joi/search_validator_joi";
import SearchMongodb from "../../../../feature/customer/search/framework/mongodb/search_mongodb";
import SearchUsecase from "../../../../feature/customer/search/usecase/search_usecase";
import { BadRequest } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import PagingValidator from "../../../validator/paging_validator";

const router = express.Router();
const usecase = new SearchUsecase(
  new SearchMongodb(),
  new SearchValidatorJoi()
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const { error } = PagingValidator.validate(req.query);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }

    const { keyword, page, limit } = req.query;

    const option: SearchOption = {
      customer: req.app.locals.user,
      keyword: keyword,
      pagination: new PagingOption(
        parseInt(page as string),
        parseInt(limit as string)
      ),
    };

    const results = await usecase.index(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { keyword } = req.body;

    const searchModel: SearchModel = {
      customer: req.app.locals.user,
      keyword: keyword,
    };

    await usecase.store(searchModel);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await usecase.remove(id);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
