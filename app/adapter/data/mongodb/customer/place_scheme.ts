import { model, Schema } from "mongoose";
import PlaceModel from "../../../../entity/customer/place_model";

const PlaceScheme = model<PlaceModel>(
  "places",
  new Schema<PlaceModel>({
    placeId: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    created_at: { type: String, default: Date.now() },
    updated_at: { type: String, default: Date.now() },
  })
);

export default PlaceScheme;
