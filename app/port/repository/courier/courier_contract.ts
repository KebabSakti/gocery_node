import CourierModel from "../../../entity/courier/courier_model";

abstract class CourierContract {
  abstract show(id: string): Promise<CourierModel | null>;
}

export default CourierContract;
