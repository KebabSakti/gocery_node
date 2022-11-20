import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { SearchModel } from "../../../../feature/customer/search/model/search_model";
import SearchOption from "../../../../feature/customer/search/model/search_option";
import SearchRepository from "../../../../feature/customer/search/repository/search_repository";
import SearchMongo from "../../../../feature/customer/search/datasource/search_mongo";
import PagingOption from "../../../model/paging_option";
import { BadRequest } from "../../../config/errors";

const router = express.Router();
const searchRepository: SearchRepository = new SearchMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    const searchOption: SearchOption = {
      customerId: req.app.locals.user,
      keyword: req.query.keyword as string,
    };

    const page = isNaN(parseInt(req.query.page as string))
      ? 1
      : parseInt(req.query.page as string);

    const limit = isNaN(parseInt(req.query.limit as string))
      ? 5
      : parseInt(req.query.limit as string);

    if (limit >= 20) {
      throw new BadRequest();
    }

    const pagingOption = new PagingOption(page, limit);

    const results: SearchModel[] = await searchRepository.index(
      searchOption,
      pagingOption
    );

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await searchRepository.store({
      customer: req.app.locals.user,
      keyword: req.body.keyword,
    });

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await searchRepository.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
