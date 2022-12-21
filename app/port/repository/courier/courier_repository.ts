import CourierModel from "../../../entity/courier/courier_model";

abstract class CourierRepository {
  abstract show(id: string): Promise<CourierModel | null>;
}

export default CourierRepository;
