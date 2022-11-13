import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import {
  BundleModel,
  BundleItemModel,
  BundleWithItemModel,
} from "../../../../feature/customer/bundle/model/bundle_model";
import {
  BundleRepository,
  BundleItemRepository,
} from "../../../../feature/customer/bundle/repository/bundle_repository";
import {
  BundleMysql,
  BundleItemMysql,
} from "../../../../feature/customer/bundle/datasource/bundle_mysql";
import PaginationOption from "../../../model/pagination_option";

const router = express.Router();
const bundleRepository: BundleRepository = new BundleMysql();
const bundleItemRepository: BundleItemRepository = new BundleItemMysql();

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

    const paginationOption: PaginationOption | undefined =
      page == undefined || perPage == undefined
        ? undefined
        : {
            perPage: 10,
            currentPage: 1,
          };

    const bundles: BundleModel[] = await bundleRepository.index();

    if (bundles.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    const bundleWithItems: BundleWithItemModel[] = [];

    for (const bundle of bundles) {
      const items: BundleItemModel[] = await bundleItemRepository.index(
        bundle.uid!,
        paginationOption
      );

      bundleWithItems.push({
        bundle: bundle,
        bundle_items: items,
      });
    }

    res.json(bundleWithItems);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
