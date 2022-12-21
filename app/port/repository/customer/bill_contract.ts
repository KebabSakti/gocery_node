import BillModel from "../../../entity/customer/bill_model";

abstract class BillContract {
  abstract getAllActiveBill(): Promise<BillModel[]>;

  abstract getBillById(id: string): Promise<BillModel | null>;
}

export default BillContract;
