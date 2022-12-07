import BannerModel from "../../entity/banner_model";
import BannerOption from "../../entity/banner_option";

abstract class BannerContract {
  abstract index(option?: BannerOption | undefined): Promise<BannerModel[]>;
}

export default BannerContract;
