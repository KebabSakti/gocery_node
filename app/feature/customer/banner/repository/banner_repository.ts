import { BannerModel } from "../model/banner_model";

abstract class BannerRepository {
  abstract index(): Promise<BannerModel[]>;
}

export default BannerRepository;
