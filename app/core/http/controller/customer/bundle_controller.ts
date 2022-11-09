import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import BundleModel from "../../../../feature/customer/bundle/model/bundle_model";
import BundleRepository from "../../../../feature/customer/bundle/repository/bundle_repository";
import BundleMysql from "../../../../feature/customer/bundle/datasource/bundle_mysql";

const router = express.Router();
const bundleRepository: BundleRepository = new BundleMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const bundles: BundleModel[] = await bundleRepository.bundles();

    if (bundles.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(bundles);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:uid", async (req: Request, res: Response) => {
  try {
    const bundle: BundleModel | null = await bundleRepository.bundle(
      req.params.uid
    );

    if (bundle == null) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(bundle);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
