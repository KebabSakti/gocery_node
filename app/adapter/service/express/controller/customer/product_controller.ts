import express, { Request, Response } from "express";
import ErrorHandler from "../../../../../common/error/error_handler";
import {
  BadRequest,
  ResourceNotFound,
} from "../../../../../common/error/exception";
import PagingOption from "../../../../../entity/customer/paging_option";
import ProductOption from "../../../../../entity/customer/product_option";
import ProductViewOption from "../../../../../entity/customer/product_view_option";
import ProductUsecase from "../../../../../port/interactor/customer/product_usecase";
import ProductMetaMongodb from "../../../../data/mongodb/customer/product_meta_mongodb";
import ProductMongodb from "../../../../data/mongodb/customer/product_mongodb";
import ProductViewMongodb from "../../../../data/mongodb/customer/product_view_mongodb";
import PagingValidator from "../../../joi/customer/paging_validator";

const router = express.Router();

const usecase = new ProductUsecase(
  new ProductMongodb(),
  new ProductViewMongodb(),
  new ProductMetaMongodb()
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      bundle,
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
      bundle: bundle,
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

    const results = await usecase.getAllProduct(option);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:id/show", async (req: Request, res: Response) => {
  try {
    const results = await usecase.getProductByIdWithIncrement({
      customer: req.app.locals.user,
      product: req.params.id,
    });

    if (results == null) {
      throw new ResourceNotFound();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/views", async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.params;

    const userId = req.app.locals.user;

    let option: ProductViewOption = {};

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

    const results = await usecase.getAllProductView(userId, option);

    if (results == null) {
      throw new ResourceNotFound();
    }

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
