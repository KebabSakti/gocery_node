import express, { Request, Response } from "express";
import ProductMongo from "../../../../feature/customer/product/datasource/product_mongo";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import PagingOption from "../../../model/paging_option";
import { ProductModel } from "../../../model/product_structure";
import ErrorHandler from "../../../service/error_handler";
import { BadRequest } from "./../../../config/errors";

const router = express.Router();
const productRepository: ProductRepository = new ProductMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    const productIndexOption = {
      bundle: req.query.bundle as string,
      search: req.query.search as string,
      category: req.query.category as string,
      cheapest: req.query.cheapest as string,
      discount: req.query.discount as string,
      point: req.query.point as string,
      sold: req.query.sold as string,
      view: req.query.view as string,
      favs: req.query.favs as string,
    };

    const page = isNaN(parseInt(req.query.page as string))
      ? 1
      : parseInt(req.query.page as string);

    const limit = isNaN(parseInt(req.query.limit as string))
      ? 10
      : parseInt(req.query.limit as string);

    if (limit >= 20) {
      throw new BadRequest();
    }

    const pagingOption = new PagingOption(page, limit);

    const results: ProductModel[] = await productRepository.index(
      pagingOption,
      productIndexOption
    );

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:id/show", async (req: Request, res: Response) => {
  try {
    const result = await productRepository.show(req.params.id);

    await productRepository.incrementView(req.params.id);

    res.json(result);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
