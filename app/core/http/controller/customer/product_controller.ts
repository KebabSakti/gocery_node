import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import ProductModel from "../../../../feature/customer/product/model/product_model";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import ProductMysql from "../../../../feature/customer/product/datasource/product_mysql";
import ProductOption from "../../../../feature/customer/product/model/product_option";
import PaginationOption from "../../../model/pagination_option";

const router = express.Router();
const productRepository: ProductRepository = new ProductMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const bundle_uid: string | undefined =
      req.query.bundle_uid == undefined
        ? undefined
        : (req.query.bundle_uid as string);

    const search: string | undefined =
      req.query.search == undefined ? undefined : (req.query.search as string);

    const category_uid: string | undefined =
      req.query.category_uid == undefined
        ? undefined
        : (req.query.category_uid as string);

    const cheapest: string | undefined =
      req.query.cheapest == undefined
        ? undefined
        : (req.query.cheapest as string);

    const discount: string | undefined =
      req.query.discount == undefined
        ? undefined
        : (req.query.discount as string);

    const point: string | undefined =
      req.query.point == undefined ? undefined : (req.query.point as string);

    const sold: string | undefined =
      req.query.sold == undefined ? undefined : (req.query.sold as string);

    const view: string | undefined =
      req.query.view == undefined ? undefined : (req.query.view as string);

    const favourite: string | undefined =
      req.query.favourite == undefined
        ? undefined
        : (req.query.favourite as string);

    const productOption: ProductOption = {
      bundle_uid: bundle_uid,
      search: search,
      category_uid: category_uid,
      cheapest: cheapest,
      discount: discount,
      point: point,
      sold: sold,
      view: view,
      favourite: favourite,
    };

    const paginationOption: PaginationOption | undefined =
      page == undefined
        ? undefined
        : {
            perPage: 5,
            currentPage: page,
          };

    const products: ProductModel[] = await productRepository.products(
      productOption,
      paginationOption
    );

    if (products.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(products);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:uid", async (req: Request, res: Response) => {
  try {
    const product: ProductModel | null = await productRepository.product(
      req.params.uid
    );

    if (product == null) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(product);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
