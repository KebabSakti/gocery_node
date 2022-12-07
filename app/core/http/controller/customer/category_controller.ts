import express, { Request, Response } from "express";
import CategoryOption from "../../../../feature/customer/category/entity/category_option";
import CategoryMongodb from "../../../../feature/customer/category/framework/mongodb/category_mongodb";
import CategoryUsecase from "../../../../feature/customer/category/usecase/category_usecase";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import PagingValidator from "../../../validator/paging_validator";
import { BadRequest } from "./../../../config/errors";

const router = express.Router();
const usecase = new CategoryUsecase(new CategoryMongodb());

router.get("/", async (req: Request, res: Response) => {
  try {
    const { name, page, limit } = req.query;

    let option: CategoryOption = {
      name: name,
    };

    if (page != undefined && limit != undefined) {
      const { error } = PagingValidator.validate(req.query);

      if (error != undefined) {
        throw new BadRequest(error.message);
      }

      option = {
        ...option,
        pagination: new PagingOption(
          parseInt(page as string),
          parseInt(limit as string)
        ),
      };
    }

    const results = await usecase.index(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
