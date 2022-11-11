import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import BundleModel from "../../../../feature/customer/bundle/model/bundle_model";
import BundleRepository from "../../../../feature/customer/bundle/repository/bundle_repository";
import BundleItemRepository from "../../../../feature/customer/bundle/repository/bundle_item_repository";
import BundleMysql from "../../../../feature/customer/bundle/datasource/bundle_mysql";
import BundleItemMysql from "../../../../feature/customer/bundle/datasource/bundle_item_mysql";
import BundleItemModel from "../../../../feature/customer/bundle/model/bundle_item_model";

const router = express.Router();
const bundleRepository: BundleRepository = new BundleMysql();
const bundleItemRepository: BundleItemRepository = new BundleItemMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const bundles: BundleModel[] = await bundleRepository.index();

    if (bundles.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(bundles);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:bundle_uid/items", async (req: Request, res: Response) => {
  try {
    const bundleItems: BundleItemModel[] = await bundleItemRepository.index(
      req.params.bundle_uid
    );

    if (bundleItems.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(bundleItems);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
