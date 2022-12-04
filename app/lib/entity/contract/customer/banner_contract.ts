import { BannerEntity } from "../../model/banner_entity";

abstract class BannerContract {
  abstract index(): Promise<BannerEntity[]>;
}

export default BannerContract;
