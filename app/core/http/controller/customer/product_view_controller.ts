import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import ProductViewModel from "../../../../feature/customer/product_view/model/product_view_model";
import ProductViewRepository from "../../../../feature/customer/product_view/repository/product_view_repository";
import ProductViewMysql from "../../../../feature/customer/product_view/datasource/product_view_mysql";
import PaginationOption from "../../../model/pagination_option";
import { ResourceNotFound } from "../../../config/errors";

const router = express.Router();
const productViewRepository: ProductViewRepository = new ProductViewMysql();

router.get("/:customer_uid", async (req: Request, res: Response) => {
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

    const views: ProductViewModel[] = await productViewRepository.fetch(
      req.params.customer_uid,
      paginationOption
    );

    res.json(views);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:uid/show", async (req: Request, res: Response) => {
  try {
    const view: ProductViewModel | null = await productViewRepository.show(
      req.params.uid
    );

    if (view == null) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(view);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const productViewModel: ProductViewModel = {
      customer_uid: req.body.customer_uid,
      product_uid: req.body.product_uid,
    };

    await productViewRepository.store(productViewModel);

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
