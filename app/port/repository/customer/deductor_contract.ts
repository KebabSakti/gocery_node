import BillModel from "../../../entity/customer/bill_model";

abstract class DeductorContract {
  abstract getAllActiveDeductor(): Promise<BillModel[]>;

  abstract getDeductorById(id: string): Promise<BillModel | null>;
}

export default DeductorContract;
