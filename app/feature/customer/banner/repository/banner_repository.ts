import BannerModel from "../model/banner_model";

abstract class BannerRepository {
  abstract banners(): Promise<BannerModel[]>;
}

export default BannerRepository;
