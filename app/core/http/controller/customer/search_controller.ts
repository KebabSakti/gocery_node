import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import SearchModel from "../../../../feature/customer/search/model/search_model";
import SearchRepository from "../../../../feature/customer/search/repository/search_repository";
import SearchMysql from "../../../../feature/customer/search/datasource/search_mysql";
import SearchOption from "../../../../feature/customer/search/model/search_option";
import PaginationOption from "../../../model/pagination_option";

const router = express.Router();
const searchRepository: SearchRepository = new SearchMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const perPage: number | undefined =
      req.query.per_page == undefined
        ? undefined
        : parseInt(req.query.per_page as string);

    const customer_uid: string | undefined =
      req.query.customer_uid == undefined
        ? undefined
        : (req.query.customer_uid as string);

    const keyword: string | undefined =
      req.query.keyword == undefined
        ? undefined
        : (req.query.keyword as string);

    const searchOption: SearchOption = {
      customer_uid: customer_uid,
      keyword: keyword,
    };

    const paginationOption: PaginationOption | undefined =
      page == undefined || perPage == undefined
        ? undefined
        : {
            perPage: perPage,
            currentPage: page,
          };

    const searches: SearchModel[] = await searchRepository.searches(
      searchOption,
      paginationOption
    );

    res.json(searches);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const searchModel: SearchModel = {
      customer_uid: req.body.customer_uid,
      keyword: req.body.keyword,
    };

    await searchRepository.store(searchModel);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete("/", async (req: Request, res: Response) => {
  try {
    await searchRepository.remove(req.body.uid);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
