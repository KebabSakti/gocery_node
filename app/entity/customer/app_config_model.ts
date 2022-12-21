import BillModel from "./bill_model";

interface AppConfigModel {
  fee: {
    delivery: number;
  };
  bills: BillModel[];
  deductors: BillModel[];
}

export default AppConfigModel;
