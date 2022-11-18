import express, { Request, Response } from "express";
import CategoryMongo from "../../../../feature/customer/category/datasource/category_mongo";
import CategoryModel from "../../../../feature/customer/category/model/category_model";
import CategoryRepository from "../../../../feature/customer/category/repository/category_repository";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const categoryRepo: CategoryRepository = new CategoryMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    let pagingOption: PagingOption | undefined = undefined;

    if (req.query.page != undefined && req.query.limit != undefined) {
      pagingOption = new PagingOption(
        parseInt(req.query.page as string),
        parseInt(req.query.limit as string)
      );
    }

    const categories: CategoryModel[] = await categoryRepo.index(pagingOption);

    res.json(categories);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
