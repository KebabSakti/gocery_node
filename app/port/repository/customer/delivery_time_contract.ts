import DeliveryTimeModel from "../../../entity/customer/delivery_time_model";

abstract class DeliveryTimeContract {
  abstract getAll(): Promise<DeliveryTimeModel[]>;

  abstract getById(id: string): Promise<DeliveryTimeModel | null>;
}

export default DeliveryTimeContract;
