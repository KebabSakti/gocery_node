import express, { Request, Response } from "express";
import BannerUsecase from "../../usecase/customer/banner_usecase";
import BannerContract from "../../entity/contract/customer/banner_contract";
import BannerMongo from "../../framework/customer/mongo/banner_mongo";

const router = express.Router();

const bannerRepository: BannerContract = new BannerMongo();
const bannerUsecase: BannerUsecase = new BannerUsecase(bannerRepository);

router.get("/", async (req: Request, res: Response) => {
  const banners = await bannerUsecase.index();

  res.json(banners);
});

export default router;
