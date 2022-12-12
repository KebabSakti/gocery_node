import express, { Request, Response } from "express";
import BundleOption from "../../../../feature/customer/bundle/entity/model/bundle_option";
import BundleMongodb from "../../../../feature/customer/bundle/framework/mongodb/bundle_mongodb";
import BundleUsecase from "../../../../feature/customer/bundle/usecase/bundle_usecase";
import { BadRequest } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import PagingValidator from "../../../validator/paging_validator";

const router = express.Router();
const usecase = new BundleUsecase(new BundleMongodb());

router.get("/", async (req: Request, res: Response) => {
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

    const results = await usecase.index(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
