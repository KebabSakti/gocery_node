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
  cities: {
    name: string;
    lat: number;
    lng: number;
    radius: number;
  }[];
}

export default AppConfigModel;
