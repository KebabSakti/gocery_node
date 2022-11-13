import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import {
  ProductModel,
  ProductViewModel,
  ProductFavouriteModel,
  ProductOption,
} from "../../../../feature/customer/product/model/product_model";
import {
  ProductRepository,
  ProductViewRepository,
  ProductFavouriteRepository,
} from "../../../../feature/customer/product/repository/product_repository";
import {
  ProductMysql,
  ProductViewMysql,
  ProductFavouriteMysql,
} from "../../../../feature/customer/product/datasource/product_mysql";
import PaginationOption from "../../../model/pagination_option";
import HelperService from "../../../service/helper_service";

const router = express.Router();
const productRepository: ProductRepository = new ProductMysql();
const productViewRepository: ProductViewRepository = new ProductViewMysql();
const productFavouriteRepository: ProductFavouriteRepository =
  new ProductFavouriteMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const perPage: number | undefined =
      req.query.per_page == undefined
        ? undefined
        : parseInt(req.query.per_page as string);

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
      page == undefined || perPage == undefined
        ? undefined
        : {
            perPage: perPage,
            currentPage: page,
          };

    const products: ProductModel[] = await productRepository.index(
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

router.get("/:uid/show", async (req: Request, res: Response) => {
  try {
    const product: ProductModel | null = await productRepository.show(
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

router.get("/:customer_uid/view", async (req: Request, res: Response) => {
  try {
    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const perPage: number | undefined =
      req.query.per_page == undefined
        ? undefined
        : parseInt(req.query.per_page as string);

    const paginationOption: PaginationOption | undefined =
      page == undefined || perPage == undefined
        ? undefined
        : {
            perPage: perPage,
            currentPage: page,
          };

    const productViews: ProductViewModel[] = await productViewRepository.index(
      req.params.customer_uid,
      paginationOption
    );

    res.json(productViews);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/:customer_uid/view", async (req: Request, res: Response) => {
  try {
    const productViewModel: ProductViewModel = {
      uid: HelperService.uuid(),
      customer_uid: req.params.customer_uid,
      product_uid: req.body.product_uid,
      created_at: HelperService.sqlDateNow(),
      updated_at: HelperService.sqlDateNow(),
    };

    await productViewRepository.store(productViewModel);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:customer_uid/favourites", async (req: Request, res: Response) => {
  try {
    const page: number | undefined =
      req.query.page == undefined
        ? undefined
        : parseInt(req.query.page as string);

    const perPage: number | undefined =
      req.query.per_page == undefined
        ? undefined
        : parseInt(req.query.per_page as string);

    const paginationOption: PaginationOption | undefined =
      page == undefined || perPage == undefined
        ? undefined
        : {
            perPage: perPage,
            currentPage: page,
          };

    const productFavourites: ProductModel[] =
      await productFavouriteRepository.index(
        req.params.customer_uid,
        paginationOption
      );

    res.json(productFavourites);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.delete(
  "/:customer_uid/favourites",
  async (req: Request, res: Response) => {
    try {
      const productFavouriteModel: ProductFavouriteModel = {
        customer_uid: req.params.customer_uid,
        product_uid: req.body.product_uid,
      };

      await productFavouriteRepository.remove(productFavouriteModel);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
);

export default router;
