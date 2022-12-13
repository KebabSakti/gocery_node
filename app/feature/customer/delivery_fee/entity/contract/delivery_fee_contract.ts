import DeliveryFeeModel from "../model/delivery_fee_model";
import DeliveryFeeOption from "../model/delivery_fee_option";

abstract class DeliveryFeeContract {
  abstract calculateFee(option: DeliveryFeeOption): Promise<DeliveryFeeModel>;
}

export default DeliveryFeeContract;
