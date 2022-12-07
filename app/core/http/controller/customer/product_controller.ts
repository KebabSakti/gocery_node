import express, { Request, Response } from "express";
import ProductOption from "../../../../feature/customer/ecommerce/entity/product/product_option";
import ProductMongodb from "../../../../feature/customer/ecommerce/framework/mongodb/product/product_mongodb";
import ProductUsecase from "../../../../feature/customer/ecommerce/usecase/product_usecase";
import { BadRequest } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import PagingValidator from "../../../validator/paging_validator";
import { ResourceNotFound } from "./../../../config/errors";

const router = express.Router();
const usecase = new ProductUsecase(new ProductMongodb());

router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      cheapest,
      discount,
      point,
      sold,
      view,
      favs,
      page,
      limit,
    } = req.query;

    let option: ProductOption = {
      search: search,
      category: category,
      cheapest: cheapest,
      discount: discount,
      point: point,
      sold: sold,
      view: view,
      favs: favs,
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

router.get("/:id/show", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const results = await usecase.showIncrementView(id);

    if (results == null) {
      throw new ResourceNotFound();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
