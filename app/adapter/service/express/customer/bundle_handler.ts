import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import BundleOption from "../../../../entity/customer/bundle_option";
import PagingOption from "../../../../entity/customer/paging_option";
import BundleUsecase from "../../../../port/interactor/customer/bundle_usecase";
import BundelMongodb from "../../../data/mongodb/customer/bundle_mongodb";
import PagingValidator from "../../joi/customer/paging_validator";

class BundleHandler {
  private usecase = new BundleUsecase(new BundelMongodb());

  async getAllBundles(req: Request, res: Response) {
    try {
      const { name, page, limit } = req.query;

      let option: BundleOption = {
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

      const results = await this.usecase.getAllBundle(option);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default BundleHandler;
