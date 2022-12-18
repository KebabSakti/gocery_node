import BannerModel from "../../../entity/customer/banner_model";
import BannerOption from "../../../entity/customer/banner_option";

abstract class BannerContract {
  abstract index(option?: BannerOption | undefined): Promise<BannerModel[]>;
}

export default BannerContract;
