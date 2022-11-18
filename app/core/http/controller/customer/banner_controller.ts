import express, { Request, Response } from "express";
import BannerMongo from "../../../../feature/customer/banner/datasource/banner_mongo";
import BannerModel from "../../../../feature/customer/banner/model/banner_model";
import BannerRepository from "../../../../feature/customer/banner/repository/banner_repository";
import ErrorHandler from "../../../service/error_handler";

const router = express.Router();
const bannerRepository: BannerRepository = new BannerMongo();

router.get("/", async (req: Request, res: Response) => {
  try {
    const banners: BannerModel[] = await bannerRepository.index();

    res.json(banners);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
