import BannerModel from "../model/banner_model";
import BannerOption from "../model/banner_option";

abstract class BannerContract {
  abstract index(option?: BannerOption | undefined): Promise<BannerModel[]>;
}

export default BannerContract;
