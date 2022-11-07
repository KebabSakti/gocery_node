import express, { Request, Response } from "express";
import CategoryRepository from "../../../../feature/customer/category/repository/category_repository";
import CategoryMysql from "../../../../feature/customer/category/datasource/category_mysql";
import CategoryModel from "../../../../feature/customer/category/model/category_model";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import PaginationOption from "../../../model/pagination_option";

const router = express.Router();
const categoryRepo: CategoryRepository = new CategoryMysql();

router.get("*", async (req: Request, res: Response) => {
  try {
    const page: number =
      req.query.page == undefined ? 1 : parseInt(req.query.page as string);

    const paginationOption: PaginationOption = {
      perPage: 4,
      currentPage: page,
    };

    const categories: CategoryModel[] | null = await categoryRepo.categories(
      paginationOption
    );

    res.json(categories);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
