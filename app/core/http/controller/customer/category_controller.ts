import express, { Request, Response } from "express";
import CategoryRepository from "../../../../feature/customer/category/repository/category_repository";
import CategoryMysql from "../../../../feature/customer/category/datasource/category_mysql";
import CategoryModel from "../../../../feature/customer/category/model/category_model";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";

const router = express.Router();
const categoryRepo: CategoryRepository = new CategoryMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const categories: CategoryModel[] | null = await categoryRepo.index();

    if (categories.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(categories);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
