import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import CategoryOption from "../../../../entity/customer/category_option";
import PagingOption from "../../../../entity/customer/paging_option";
import CategoryUsecase from "../../../../port/interactor/customer/category_usecase";
import CategoryMongodb from "../../../data/mongodb/customer/category_mongodb";
import PagingValidator from "../../joi/customer/paging_validator";

class CategoryHandler {
  private usecase = new CategoryUsecase(new CategoryMongodb());

  async getAllCategories(req: Request, res: Response) {
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

      const results = await this.usecase.index(option);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default CategoryHandler;
