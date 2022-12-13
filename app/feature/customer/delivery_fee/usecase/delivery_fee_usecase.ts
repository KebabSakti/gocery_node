import AppConfigContract from "../../app_conf/entity/contract/app_config_contract";
import DeliveryFeeContract from "../entity/contract/delivery_fee_contract";
import DeliveryFeeModel from "../entity/model/delivery_fee_model";
import DeliveryFeeOption from "../entity/model/delivery_fee_option";

class DeliveryFeeUsecase {
  private deliveryFeeService: DeliveryFeeContract;
  private appConfigService: AppConfigContract;

  constructor(
    deliveryFeeService: DeliveryFeeContract,
    appConfigService: AppConfigContract
  ) {
    this.deliveryFeeService = deliveryFeeService;
    this.appConfigService = appConfigService;
  }

  async calculateFee(option: DeliveryFeeOption): Promise<DeliveryFeeModel> {
    const app = await this.appConfigService.show();

    const deliveryFee = app.fee.delivery;

    const deliveryOption = { ...option, fee: deliveryFee };

    return this.deliveryFeeService.calculateFee(deliveryOption);
  }
}

export default DeliveryFeeUsecase;
