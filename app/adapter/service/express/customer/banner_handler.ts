import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import BannerOption from "../../../../entity/customer/banner_option";
import PagingOption from "../../../../entity/customer/paging_option";
import BannerUsecase from "../../../../port/interactor/customer/banner_usecase";
import BannerMongodb from "../../../data/mongodb/customer/banner_mongodb";
import PagingValidator from "../../joi/customer/paging_validator";

class BannerHandler {
  private usecase = new BannerUsecase(new BannerMongodb());

  async getAllBanners(req: Request, res: Response) {
    try {
      const { page, limit } = req.query;

      let option: BannerOption = {};

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

export default BannerHandler;
