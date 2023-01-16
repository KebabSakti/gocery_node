import GetPlaceSuggestionRequest from "../../../entity/customer/get_place_suggestion_request";
import PlaceModel from "../../../entity/customer/place_model";

abstract class PlaceDataContract {
  abstract getPlaceSuggestions(
    request: GetPlaceSuggestionRequest
  ): Promise<PlaceModel[]>;

  abstract getPlaceDetail(placeId: string): Promise<PlaceModel | null>;

  abstract upsertPlaceSuggestion(model: PlaceModel): Promise<void>;
}

export default PlaceDataContract;
