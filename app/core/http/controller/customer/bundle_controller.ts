import express, { Request, Response } from "express";
import BundleMongo from "../../../../feature/customer/bundle/datasource/bundle_mongo";
import BundleRepository from "../../../../feature/customer/bundle/repository/bundle_repository";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const bundleRepository: BundleRepository = new BundleMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    let pagingOption: PagingOption | undefined = undefined;

    if (req.query.page != undefined && req.query.limit != undefined) {
      pagingOption = new PagingOption(
        parseInt(req.query.page as string),
        parseInt(req.query.limit as string)
      );
    }

    const results = await bundleRepository.index(pagingOption);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
