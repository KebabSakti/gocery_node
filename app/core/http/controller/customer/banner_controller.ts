import express, { Request, Response } from "express";
import BannerOption from "../../../../feature/customer/banner/entity/model/banner_option";
import BannerMongodb from "../../../../feature/customer/banner/framework/mongodb/banner_mongodb";
import BannerUsecase from "../../../../feature/customer/banner/usecase/banner_usecase";
import { BadRequest } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import PagingValidator from "../../../validator/paging_validator";

const router = express.Router();
const usecase = new BannerUsecase(new BannerMongodb());

router.get("/", async (req: Request, res: Response) => {
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

    const results = await usecase.index(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
