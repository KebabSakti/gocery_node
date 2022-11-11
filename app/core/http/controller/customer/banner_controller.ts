import express, { Request, Response } from "express";
import ErrorHandler from "../../../service/error_handler";
import { ResourceNotFound } from "../../../config/errors";
import BannerModel from "../../../../feature/customer/banner/model/banner_model";
import BannerRepository from "../../../../feature/customer/banner/repository/banner_repository";
import BannerMysql from "../../../../feature/customer/banner/datasource/banner_mysql";

const router = express.Router();
const bannerRepository: BannerRepository = new BannerMysql();

router.get("/", async (req: Request, res: Response) => {
  try {
    const banners: BannerModel[] = await bannerRepository.index();

    if (banners.length == 0) {
      throw new ResourceNotFound("Resource not found");
    }

    res.json(banners);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
