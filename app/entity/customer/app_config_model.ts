import BillModel from "./bill_model";

interface AppConfigModel {
  fee: {
    delivery: number;
  };
  origin: {
    placeId: string;
    latLng: string;
  };
  bills: BillModel[];
  deductors: BillModel[];
}

export default AppConfigModel;
